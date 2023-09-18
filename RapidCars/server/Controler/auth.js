const multer = require('multer');
const User = require('../model/User');
const Car = require('../model/Car');
const Booking = require('../model/Booking')
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
require('dotenv').config();

var nodemailer = require('nodemailer');
var OTP;

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function send_Register_mail(uname, email) {


    var mail = '<h3>Welcome To</h3><h2>Rapid car</h2><h2>' + uname + '</h2>'
    console.log("in send mail")

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rapidcars123@gmail.com',
            pass: process.env.MAIL_PAS
        }
    });

    var mailOptions = {
        from: 'rapidcars123@gmail.com',
        to: email,
        subject: 'Mail from Rapidcar',
        text: 'car is booked for you',
        html: mail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}


exports.sendotp = (req, res) => {
    let { email } = req.body;
    console.log(req.body);
    let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    OTP = generateOTP();
    var mail = '<h3> Rapid car</h3><h2>OTP is</h2><h2>' + OTP + '</h2>'
    console.log("in send otp")

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rapidcars123@gmail.com',
            pass: process.env.MAIL_PAS
        }
    });

    var mailOptions = {
        from: 'rapidcars123@gmail.com',
        to: email,
        subject: 'OTP from Rapidcar',
        text: "",
        html: mail
    };



    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(200).json({
                success: false,

            })
        } else {
            console.log('Email sent: ' + info.response);

            res.status(200).json({
                success: true,
                result: email
            })
        }
    });
}

exports.cmpotp = (req, res) => {

    let { otp } = req.body;
    console.log(req.body);

    let errors = [];
    if (!otp) {
        errors.push({ otp: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    if (OTP === otp) {
        res.status(200).json({
            success: true,
            result: otp
        })
    } else {
        res.status(200).json({
            success: false,

        })
    }
}

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

exports.resetpass = (req, res) => {
    let { email, password, repassword } = req.body;

    console.log(req.body);

    let errors = [];

    if (!email) {
        errors.push({ email: "required" });

    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }

    if (!password) {
        errors.push({ password: "required" });
    }
    if (!repassword) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password != repassword) {
        errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            password = hash;
            User.updateOne(

                { email: email },
                { $set: { "password": password } }
            )
                .then(
                    res.status(200).json({
                        success: true,
                        email: email
                    })
                )
                .catch(err => {
                    res.status(500).json({
                        errors: [{ error: err }]
                    });
                });
        });
    });
}


exports.signup = (req, res, next) => {
    let { uname, email, mobileno, password, repassword } = req.body;

    console.log(req.body);

    let errors = [];
    if (!uname) {
        errors.push({ name: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });

    }
    if (!mobileno) {
        errors.push({ mobile_number: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!repassword) {
        errors.push({
            password_confirmation: "required",
        });
    }
    if (password != repassword) {
        errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    User.findOne({ email: email })
        .then(user => {
             if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            } else {
                const user = new User({
                    name: uname,
                    email: email,
                    mobile_no: mobileno,
                    password: password,
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(response => {
                                send_Register_mail(uname, email)
                                res.status(200).json({
                                    success: true,
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    errors: [{ error: err }]
                                });
                            });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}

exports.signin = (req, res) => {
    console.log("got request");
    let { email, password } = req.body;
    console.log(req.body);
    let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }
    if (!password) {
        errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });


        } else {
            bcrypt.compare(password, user.password).then(isMatch => {

                if (!isMatch) {

                    return res.status(200).json({
                        errors: [{
                            password:
                                "incorrect"
                        }]
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: user
                    });


                }
            }).catch(err => {
                res.status(500).json({
                    erros: err,
                    message: user
                });
            });
        }
    }).catch(err => {
        res.status(500).json({
            erros: err,
            message: user
        });
    });
}

var Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        console.log(" in filename ")
    }
});

var upload = multer({
    storage: Storage
}).single('file');

exports.carregister = (req, res, next) => {
    let { cname, location, carno, cartype, company, seat, cpurchase, cprice, fuel, gear_type, mileage, cimage } = req.body;
    console.log(req.body);
    let errors = [];
    if (!cname) {
        errors.push({ carname: "required" });
    }
    if (!location) {
        errors.push({ location: "required" });
    }

    if (!carno) {
        errors.push({ car_number: "required" });
    }

    if (!cartype) {
        errors.push({ Car_type: "required" });
    }
    if (!company) {
        errors.push({
            Car_Company: "required",
        });
    }
    if (!seat) {
        errors.push({ Car_seats: "required" });
    }
    if (!cpurchase) {
        errors.push({ Car_PurchaseDate: "required" });
    }
    if (!cprice) {
        errors.push({ Car_Price: "required" });
    }
    if (!fuel) {
        errors.push({ fuel: "required" });
    }
    if (!gear_type) {
        errors.push({ Gear_type: "required" });
    }
    if (!mileage) {
        errors.push({ Mileage: "required" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    Car.findOne({ carno: carno })
        .then(car => {
            if (car) {
                console.log(errors)
                return res.status(422).json({ errors: [{ car: "car number already exists" }] });
            } else {
                const car = new Car({
                    cname: cname,
                    location: location,
                    carno: carno,
                    cartype: cartype,
                    company: company,
                    seat: seat,
                    cpurchase: cpurchase,
                    cprice: cprice,
                    fuel: fuel,
                    gear_type: gear_type,
                    mileage: mileage,
                    cimage: req.file.filename,
                    IsBook: false,
                });

                car.save()
                    .then(response => {
                        res.status(200).json({
                            success: true,
                            result: response
                        })
                        console.log(response)
                        console.log("success")
                    })
                    .catch(err => {
                        res.status(500).json({
                            errors: [{ error: err }]
                        });
                    });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}

exports.cardata = async (req, res) => {

    try {
        const cardata = await Car.find()
        console.log("done  ");
        res.json(cardata);
    }
    catch (err) {
        res.json('error' + err)
    }
}

exports.bookingdata = async (req, res) => {

    try {
        let { user_id } = req.body
        console.log(user_id)
        console.log("booking ")
        var bookingdata = await Booking.find({ user_id: user_id })
        var bookingArray = []

        for (var i = 0; i < bookingdata.length; i++) {
            var car = await Car.findOne({ _id: bookingdata[i].car_id })
            var booking = bookingdata[i]
            var bookingdetails = { car, booking }
            bookingArray.push(bookingdetails)
        }
        res.json(bookingArray)
    }
    catch (err) {
        res.json('error' + err)
    }
}


exports.system_bookingdata = async (req, res) => {

    try {
        console.log("booking ")
        var bookingdata = await Booking.find()
        var bookingArray = []

        for (var i = 0; i < bookingdata.length; i++) {
            var car = await Car.findOne({ _id: bookingdata[i].car_id })
            var booking = bookingdata[i]
            var bookingdetails = { car, booking }
            bookingArray.push(bookingdetails)

        }

        res.json(bookingArray)
    }
    catch (err) {
        res.json('error' + err)
    }
}

async function get_email_data(userid, carid) {

    try {

        var cardata = await Car.find({ _id: carid })
        var userdata = await User.find({ _id: userid })
        var data = cardata[0]
        data.email = userdata[0].email
        data.uname = userdata[0].name
        console.log(data)
        return data
    }
    catch (err) {
        res.json('error' + err)
    }
}

async function update_IsBook_true(carid) {

    try {
        console.log("in update" + carid)
        var cardata = await Car.updateOne(

            { _id: carid },
            { $set: { "IsBook": true } }
        )
    }
    catch (err) {
        res.json('error' + err)
    }
}

async function update_IsBook_false(carid) {

    try {
        console.log("in update" + carid)
        var cardata = await Car.updateOne(

            { _id: carid },
            { $set: { "IsBook": false } }
        )
    }
    catch (err) {
        res.json('error' + err)
    }
}

function send_booking_mail(userid, carid, booking) {
    get_email_data(userid, carid).then((car) => {

        var carname = car.company + " " + car.cname
        var date = String(booking.fromdate).slice(0, 24) + " To " + String(booking.todate).slice(0, 24)
        var location = String(booking.fromlocation).toUpperCase() + " To " + String(booking.tolocation).toUpperCase()
        var mail = '<h1 style="color:DodgerBlue;font-family: Lucida Sans Unicode;"> Booking Confirmed </h1><p style="font-family: Lucida Sans Unicode; font-size:150%;  "><b>' + car.uname + '</b> Thanks for booking car  .You will find the booking details and payment details below.</p><p style="font-family: Lucida Sans Unicode; font-size:150%; margin-top:0px; margin-bottom:0px;">Booking confirmed of <b>' + carname + '</b> </p> <p style="font-family: Lucida Sans Unicode; font-size:140%; margin-top:0px; margin-bottom:0px;"><b>' + date + '</b></p> <p style="font-family: Lucida Sans Unicode; font-size:150%; margin-top:0px; margin-bottom:0px;"><b>' + location + '</b></p><p style="font-family: Lucida Sans Unicode; font-size:150%; margin-top:0px; margin-bottom:0px;">Your total amount to be paid is <b>' + booking.BillAmount + '</b></p><p style="font-family: Lucida Sans Unicode; font-size:150%; margin-top:0px; margin-bottom:0px;"> You have booked to <b>to date</b> for this much time (Days:Hours:Minutes) <b>' + booking.Hours + '</b> </p><p style="font-family: Lucida Sans Unicode; font-size:120;">If you have any doubts or problem you contact us via email or phone us directly.</p><p style="font-family: Lucida Sans Unicode; font-size:120%;">email:rapidcars123@gmail.com</p><p style="font-family: Lucida Sans Unicode; font-size:120%;">phone:1231231342</p><p style="font-family: Lucida Sans Unicode; font-size:120%;">If the car is not returned within the time given above additional charges will be applied</p><p style="font-family: Lucida Sans Unicode; font-size:120%;">Thanks again</p><p style="font-family: Lucida Sans Unicode; font-size:120%;">The team of Rapid Cars</p>'
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'rapidcars123@gmail.com',
                pass: process.env.MAIL_PAS
            }
        });

        var mailOptions = {
            from: 'rapidcars123@gmail.com',
            to: car.email,
            subject: 'Mail from Rapidcar',
            text: 'car is booked for you',
            html: mail
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    })
}


exports.booking = (req, res) => {
    let { fromdate, fromlocation, tolocation, todate, carid, userid, billamount, hours } = req.body;

    let errors = [];
    if (!fromlocation) {
        errors.push({ fromlocation: "required" });
    }
    if (!tolocation) {
        errors.push({ tolocation: "required" });
    }
    if (!fromdate) {
        errors.push({ fromdate: "required" });
    }
    if (!todate) {
        errors.push({ todate: "required" });
    }
    if (!carid) {
        errors.push({ car_id: "required" });
    }
    if (!userid) {
        errors.push({ user_id: "required" });
    }
    if (!billamount) {
        errors.push({ user_id: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    Booking.findOne({
        car_id: carid,
        user_id: userid,
        IsRuning: true
    })
        .then(booking => {
            if (booking) {
                return res.status(422).json({ errors: [{ car: "car number already exists" }] });
            } else {

                const booking = new Booking({
                    fromlocation: fromlocation,
                    tolocation: tolocation,
                    fromdate: fromdate,
                    todate: todate,
                    car_id: carid,
                    user_id: userid,
                    car_db: "Car",
                    user_db: "User",
                    IsRuning: true,
                    BillAmount: billamount,
                    Hours: hours,

                });
                booking.save()
                    .then(response => {

                        send_booking_mail(userid, carid, booking)
                        update_IsBook_true(carid)
                        res.status(200).json({
                            success: true,
                            result: response
                        })
                        console.log("success")
                    })
                    .catch(err => {
                        res.status(500).json({
                            errors: [{ error: err }]
                        });
                    });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: 'Something went wrong' }]
            });
        })
}


async function get_booking_data(bookingid) {

    try {
        var bookingdata = await Booking.find({ _id: bookingid })
        return bookingdata[0]
    }
    catch (err) {
        res.json('error' + err)
    }

}

exports.canclebooking = (req, res) => {
    let bookingid = req.params.id;
    let errors = [];

    if (!bookingid) {
        errors.push({ booking_id: "required" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    get_booking_data(bookingid).then((car) => {

        update_IsBook_false(car.car_id)

        Booking.deleteOne({ _id: bookingid })
            .then(response => {

                res.status(200).json({
                    success: true,
                    bookingid: bookingid,
                    result: response
                })

            })
            .catch(err => {
                res.status(500).json({
                    errors: [{ error: err }]
                });
            });
    });




}


exports.removecar = (req, res) => {
    let carid = req.params.id;
    let errors = [];

    if (!carid) {
        errors.push({ car_id: "required" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    Car.deleteOne({ _id: carid })
        .then(response => {

            res.status(200).json({
                success: true,
                carid: carid,
                result: response
            })
            console.log("success")
        })
        .catch(err => {
            res.status(500).json({
                errors: [{ error: err }]
            });
        });

}


exports.BookingComplete = (req, res) => {
    let bookingid = req.params.id;
    let errors = [];

    if (!bookingid) {
        errors.push({ booking_id: "required" });
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    Booking.findOne({ _id: bookingid }).then(
        data => {

            Booking.updateOne({ _id: data._id }, { $set: { "IsRuning": false } })
                .then(response => {

                    Car.updateOne({ _id: data.car_id }, { $set: { "IsBook": false } })
                        .then(response => {
                            res.status(200).json({
                                success: true,
                                bookingid: data.car_id,
                                result: response,
                            })
                            console.log("success")
                        })
                })
        }
    )
        .catch(err => {
            res.status(500).json({
                errors: [{ error: err }]
            });
        });

}

var Storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        console.log(" in filename ")
    }
});

var upload;
exports.upload = multer({
    storage: Storage
}).single('file');
