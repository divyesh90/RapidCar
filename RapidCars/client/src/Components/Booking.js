import React from "react";
import "./booking.css";
import axios from "axios";
import { useHistory, useState } from "react-router-dom";

export default function Booking(props) {
  const history = useHistory();
  const [cardata, setData] = React.useState(null);
  const [car, setcar] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/cars")
      .then((res) => {
        setData(
          res.data.filter((val) => {
            return val.IsBook === false;
          })
        );

        setcar(
          res.data.filter((val) => {
            return val.IsBook === false;
          })
        );
      })
      .catch((err) => {
        console.log("Someting Went Wrong");
      });
  }, []);

  const [book, setbook] = React.useState({
    todate: "",
    fromdate: "",
    fromlocation: "",
    tolocation: "",
    carid: "",
    userid: props.user_id,
    billamount: "",
    hours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setbook({
      ...book,
      [name]: value,
    });
    sort_data();
  };

  function validate_input(car) {
    var IsValid = true;

    const fromdate = new Date(book.fromdate);
    const todate = new Date(book.todate);
    const diff = todate - fromdate;
    const valid_fromdate = fromdate - new Date();

    if (book.todate == "") {
      document.getElementById("date_error").innerHTML =
        "both date must be require";
      IsValid = false;
    } else if (book.fromdate == "") {
      document.getElementById("date_error").innerHTML =
        "both date must be require";
      IsValid = false;
    } else if (fromdate < new Date()) {
      document.getElementById("date_error").innerHTML =
        "please check from date";
      IsValid = false;
    } else if (diff < 0 || valid_fromdate < 0) {
      document.getElementById("date_error").innerHTML =
        "please check from date";
      IsValid = false;
    } else {
      document.getElementById("date_error").innerHTML = "";
    }

    if (book.fromlocation < 3 || book.fromlocation == "") {
      document.getElementById("location_error").innerHTML =
        " starting location must be requird";
      IsValid = false;
    } else {
      document.getElementById("location_error").innerHTML = "";
    }
    if (book.tolocation < 3 || book.tolocation == "") {
      document.getElementById("location_error").innerHTML =
        "both location must be requird";
      IsValid = false;
    } else {
      document.getElementById("location_error").innerHTML = "";
    }
    return IsValid;
  }

  function booking_car(car_id, carprice) {
    updateAmount(carprice);
    if (validate_input() == true) {
      book.carid = car_id;
      axios
        .post("http://localhost:8000/api/booking", book)
        .then((res) => {
          alert("Congratsyou have successfully booked a car.");
        })
        .catch((err) => {
          alert(" sorry, something wrong");
        });
    }
  }

  if (!car) return null;
  const sort_data = () => {
    var newArray = car;
    var fromlocation = document.getElementById("fromlocation_value").value;
    newArray = car.filter((val) => {
      return val.location
        .toUpperCase()
        .includes(String(fromlocation).toUpperCase());
    });

    var cartype = document.getElementById("select_cartype").value;
    var carseats = document.getElementById("select_carseats").value;
    var cargear = document.getElementById("select_geartype").value;
    var carfuel = document.getElementById("select_carfuel").value;
    var carcompany = document.getElementById("select_carcompany").value;
    var carprice = document.getElementById("select_price").value;

    if (carseats != "ALL") {
      newArray = car.filter(function (el) {
        return el.seat == carseats;
      });
    }
    if (cartype != "ALL") {
      newArray = newArray.filter(function (el) {
        return el.cartype == cartype;
      });
    }
    if (carcompany != "ALL") {
      newArray = newArray.filter(function (el) {
        return el.company == carcompany;
      });
    }
    if (carfuel != "ALL") {
      newArray = newArray.filter(function (el) {
        return el.fuel.toUpperCase() == carfuel;
      });
    }
    if (cargear != "ALL") {
      newArray = newArray.filter(function (el) {
        return el.gear_type.toUpperCase() == cargear;
      });
    }
    if (carprice == "LTOH") {
      newArray.sort((a, b) => (a.cprice > b.cprice ? 1 : -1));
    }
    if (carprice == "HTOL") {
      newArray.sort((a, b) => (a.cprice < b.cprice ? 1 : -1));
    }
    setData(newArray);
  };

  const onChange = (event) => {
    sort_data();
  };

  const updateAmount = (carprice) => {
    if (validate_input() == true) {
      var fromdate = new Date(book.fromdate);
      var todate = new Date(book.todate);
      var fDate =
        fromdate.getDate() +
        "/ " +
        fromdate.getMonth() +
        "/ " +
        fromdate.getFullYear();
      var toDate =
        todate.getDate() + "/" + todate.getMonth() + "/" + todate.getFullYear();
      const diffTime = Math.abs(todate - fromdate);
      const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60) - diffDay * 24);
      const diffminutes =
        diffTime / (1000 * 60) - diffHours * 60 - diffDay * 24 * 60;
      const price = Math.floor(
        diffDay * 24 * carprice +
          diffHours * carprice +
          diffminutes * (carprice / 60)
      );
      book.billamount = price;
      book.hours = diffDay + " : " + diffHours + " : " + diffminutes;
      document.getElementById("price").innerHTML = "₹ " + price;
    }
  };

  function w3_open() {
    document.getElementById("side_container").style.display = "block";
  }
  function w3_close() {
    document.getElementById("side_container").style.display = "none";
  }

  const rendercar = () => {
    var num = 0;

    if (cardata.length == 0) {
      return (
        <div className="cars">
          <div className="car_details">
            <div className="carnotfound">
              <h2> Sorry ! no cars are available for selected choice/s</h2>
            </div>
          </div>
        </div>
      );
    } else {
      return cardata.map((car) => {
        num++;
        var path = "http://localhost:8000/uploads/" + car.cimage;
        var row_id = "row" + car._id;
        return (
          <>
            <div
              className="cars"
              onClick={() => updateAmount(car.cprice)}
              id={row_id}
            >
              <img src={path}></img>
              <div className="car_details">
                <span>
                  {" "}
                  <i class="fas fa-map-marker-alt"> </i> <h3>{car.location}</h3>{" "}
                </span>
                <h2>
                  {car.company} {car.cname}
                </h2>
                <h3>Fuel: {car.fuel}</h3>
                <br></br>
                <h3>Gear: {car.gear_type} </h3>
                <br></br>
                <h3>Mileage: {car.mileage} Km/L</h3>
                <br></br>
                <h3>
                  Seats: {car.seat} {car.cartype}
                </h3>
                <br></br>
                <h3>{car.carno} </h3>
                <br></br>
                <h2>
                  <span>
                    <i class="fas fa-rupee-sign"></i>
                  </span>
                  {car.cprice} /Hours
                </h2>
                <button
                  name="carid"
                  value={car._id}
                  onClick={() => {
                    const confirmBox = window.confirm(
                      "Do you really want to Booking of " +
                        car.company +
                        " " +
                        car.cname +
                        "."
                    );
                    if (confirmBox === true) {
                      booking_car(car._id, car.cprice);
                    }
                  }}
                >
                  {" "}
                  Book Now{" "}
                </button>
              </div>
            </div>
          </>
        );
      });
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div id="booking_main">
        <span id="view-button">
          <a class="icon">
            <i class="fa fa-bars" onClick={() => w3_open()}></i>
          </a>
        </span>
        <div>
          <div className="booking_containar">
            <div className="top_block">
              <div className="date">
                <h4>Date & Time </h4>
                <h5 id="date_error"></h5>
                <span>
                  <i class="far fa-clock"></i>
                </span>
                <input
                  id="fromdate"
                  type="datetime-local"
                  placeholder="start date"
                  required
                  name="fromdate"
                  value={book.fromdate}
                  onChange={handleChange}
                ></input>
                <a>To</a>
                <span>
                  <i class="far fa-clock"></i>
                </span>
                <input
                  type="datetime-local"
                  placeholder="end date"
                  required
                  name="todate"
                  value={book.todate}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="location">
                <h4>Select Your Location</h4>
                <h5 id="location_error"></h5>
                <span>
                  {" "}
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <input
                  id="fromlocation_value"
                  type="text"
                  placeholder="From"
                  required
                  name="fromlocation"
                  value={book.fromlocation.toUpperCase()}
                  onChange={handleChange}
                ></input>

                <a>To</a>
                <span>
                  {" "}
                  <i class="fas fa-map-marker-alt"></i>
                </span>
                <input
                  type="text"
                  placeholder="To"
                  required
                  name="tolocation"
                  value={book.tolocation.toUpperCase()}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="booking_block">
              <div className="car_data">{rendercar()}</div>
            </div>
          </div>
        </div>

        <div className="side_containar" id="side_container">
          <span id="close-button">
            <a class="icon">
              <i class="fa fa-close" onClick={() => w3_close()}></i>
            </a>
          </span>
          <div className="side_block" id="side_block">
            <div className="block">
              <span>
                <i>Company</i>
              </span>
              <select id="select_carcompany" onChange={onChange}>
                <option value="ALL" selected>
                  ALL
                </option>
                <option value="Ford">Ford</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Mahindra">Mahindra</option>
              </select>

              <span>
                <i>Price:</i>
              </span>
              <select id="select_price" onChange={onChange}>
                <option value="ALL" selected>
                  ALL
                </option>
                <option value="LTOH">Low To High</option>
                <option value="HTOL">High To Low</option>
              </select>

              <span>
                <i>AC/NON-AC:</i>
              </span>
              <select id="select_cartype" onChange={onChange}>
                <option value="ALL" selected>
                  ALL
                </option>
                <option value="AC">AC</option>
                <option value="NONAC">NON-AC</option>
              </select>
              <span>
                <i>Seats:</i>
              </span>
              <select id="select_carseats" onChange={onChange}>
                <option value="ALL" selected>
                  ALL
                </option>
                <option value="4">4</option>
                <option value="6">6</option>
              </select>

              <span>
                <i>Fuel:</i>
              </span>
              <select id="select_carfuel" onChange={onChange}>
                <option value="ALL" selected>
                  ALL
                </option>
                <option value="PETROL">PETROL</option>
                <option value="DIESEL">DIESEL</option>
                <option value="CNG">CNG</option>
              </select>

              <span>
                <i>Transmission:</i>
              </span>
              <select id="select_geartype" onChange={onChange}>
                <option value="ALL" selected>
                  ALL
                </option>
                <option value="MANUAL">MANUAL</option>
                <option value="AUTOMATIC">AUTOMATIC</option>
              </select>
            </div>
            <div className="block11">
              <span>
                <i>Bill Amount</i>
              </span>
              <div>
                <h2 id="price">{book.billprice}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
