import React from 'react'
import './login_signup.css'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


export default function Forgetpas() {
    const history = useHistory()
    const [user, setUser] = useState({
        email: "",
        otp: "",
        password: "",
        newpassword: ""
    })


    function ResetPassword() {



        if (validate_input(user) == true) {

            axios.post("http://localhost:8000/api/resetpass", user)
                .then(res => {
                  
                    if (res.data.email) {

                        console.log("Password updated")
                        history.push({
                            pathname: '/login',
                        });
                    }
                    else {

                        console.log("sosmethon errot Password not updated")
                    }

                })
                .catch(err => {
                    console.log(err.data);
                })
        }
        else {
            console.log("invalid input");
        }

    }

    function SendOtp() {

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var IsValid = true;

        if (!user.email.match(mailformat) || user.email == '') {
            document.getElementById('validate_email').innerHTML = "Invalid Email Format"

        }
        else {

            axios.post("http://localhost:8000/api/sendotp", user)
                .then(res => {

                    console.log(res.data);

                    if (res.data.result) {

                        document.getElementById("otp_block").style.display = "block"
                        document.getElementById("reset_email").readOnly = true;

                    }
                    else {
                        document.getElementById("otp_block").style.display = "none"
                    }

                })
                .catch(err => {

                    console.log(err.data);
                })
            document.getElementById('validate_email').innerHTML = ""
        }

    }


    function ValidateOtp() {



        if (user.otp.length < 6 || user.otp == '') {

            document.getElementById('validate_otp').innerHTML = "OTP must be 6 latter"


        }
        else {
            axios.post("http://localhost:8000/api/cmpotp", user)
                .then(res => {
                    console.log(res.data);

                    if (res.data.success === true) {
                        document.getElementById('validate_otp').innerHTML = ""
                        document.getElementById("resetpass").style.display = "block"
                        document.getElementById("reset_otp").readOnly = true;

                    }
                    else {
                        document.getElementById('validate_otp').innerHTML = "OTP not match"
                        document.getElementById("resetpass").style.display = "none"
                        console.log("OTP Wrong")
                    }

                })
                .catch(err => {

                    console.log(err.data);
                })
        }

    }




    function validate_input(user) {

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var IsValid = true;


        if (!user.email.match(mailformat) || user.email == '') {
            document.getElementById('validate_email').innerHTML = "Invalid Email Format"
            IsValid = false
        }
        else {
            document.getElementById('validate_email').innerHTML = ""
        }

        if (user.otp.length < 6 || user.otp == '') {
            document.getElementById('validate_otp').innerHTML = "otp must be at list 6 latter"
            IsValid = false
        }
        else {
            document.getElementById('validate_otp').innerHTML = ""
        }


        if (user.password.length < 6 || user.password == '') {
            document.getElementById('validate_password').innerHTML = "Password must be at list 6 latter"
            IsValid = false
        }
        else {
            document.getElementById('validate_password').innerHTML = ""
        }

        if (user.repassword != user.password || user.repassword == '') {
            document.getElementById('validate_repassword').innerHTML = "Password doesn't match "
            IsValid = false
        }
        else {
            document.getElementById('validate_repassword').innerHTML = ""
        }

        console.log(IsValid)

        return IsValid;

    }

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })

        console.log(user)


    }



    return (
        <div>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />


            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />


            <link rel="stylesheet" type="text/css" href="styles.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className='bg_image'>
                <div classNameName="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Forget Password</h3>
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                    <span><i className="fab fa-twitter-square"></i></span>
                                </div>
                            </div>
                            <div className="card-body">
                                <form >



                                    <div className='validation' id="validate_email"></div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input id="reset_email" type="text" className="form-control" placeholder="Email" required name="email" value={user.email} onChange={handleChange} />

                                    </div>

                                    <div className="form-group">
                                        <input type="button" value="Send OTP" onClick={() => SendOtp()} className="btn float-right login_btn" ></input>
                                    </div>

                                    <div id="otp_block">

                                        <div className='validation' id="validate_otp"> </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                            </div>
                                            <input id="reset_otp" type="number" className="form-control" min="0" placeholder="OTP" requird name="otp" value={user.otp} onChange={handleChange} />
                                        </div>


                                        <div className="form-group">
                                            <input type="button" value="Submit" onClick={() => ValidateOtp()} className="btn float-right login_btn" ></input>
                                        </div>
                                    </div>



                                    <div id="resetpass">

                                        <div className='validation' id="validate_password"></div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" className="form-control" placeholder="New password" requird name="password" value={user.password} onChange={handleChange} />
                                        </div>

                                        <div className='validation' id="validate_repassword"></div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                                            </div>
                                            <input type="password" className="form-control" placeholder="Confirme password" requird name="repassword" value={user.repassword} onChange={handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <input value="Submit" onClick={() => ResetPassword()} className="btn float-right login_btn" ></input>
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
