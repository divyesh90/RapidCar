import React from "react";
import "./login_signup.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";


export default function Register() {

  const [car, setcar] = useState({
    cname: "",
    location: "",
    carno: "",
    cartype: "AC",
    company: "",
    seat: "",
    cpurchase: "",
    cprice: "",
    fuel: "PETROL",
    gear_type: "MANUAL",
    mileage: "",
  });

  const history = useHistory();
  const [file, setFile] = useState(null);
  const handlefile = (e) => {
    setFile(e.target.files[0]);
  };
  const register = (e) => {
    e.preventDefault();
    if (validate_input(car) == true) {
      var Cardata = new FormData();
      Cardata.append("file", file);
      for (var key in car) {
        Cardata.append(key, car[key]);
      }

      const config = {
        Headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios.post("http://localhost:8000/api/carregister", Cardata, config)
        .then(res => {
          history.push('/cardetails');
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      console.log("invalid input");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcar({
      ...car,
      [name]: value,
    });
  };



  function validate_input(car) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var carno = /^[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,2}\s[0-9]{4}$/;
    var IsValid = true;

    if (car.cname.length < 3 || car.cname == "") {
      document.getElementById("validate_cname").innerHTML =
        "carname must be at least 3 letter";
      IsValid = false;
    } else {
      document.getElementById("validate_cname").innerHTML = "";
    }
    if (car.location.length < 5 || car.location == "") {
      document.getElementById("validate_location").innerHTML =
        "City name must be at least 3 letter";
      IsValid = false;
    } else {
      document.getElementById("validate_location").innerHTML = "";
    }
    if (car.company.length < 3 || car.company == "") {
      document.getElementById("validate_company").innerHTML =
        "carname must be at least 3 letter";
      IsValid = false;
    } else {
      document.getElementById("validate_company").innerHTML = "";
    }

    if (!car.carno.match(carno) || car.carno == "") {
      document.getElementById("validate_carno").innerHTML =
        "Invalid car number Format GJ 1 A 1234";
      IsValid = false;
    } else {
      document.getElementById("validate_carno").innerHTML = "";
    }

    if (car.seat < 2 || car.seat == "") {
      document.getElementById("validate_seat").innerHTML =
        "No of seats must be at least 4";
      IsValid = false;
    } else {
      document.getElementById("validate_seat").innerHTML = "";
    }
    if (car.cprice < 10 || car.cprice == "") {
      document.getElementById("validate_price").innerHTML =
        "Price should be given and must be greater than 100";
      IsValid = false;
    } else {
      document.getElementById("validate_price").innerHTML = "";
    }

    if (car.mileage > 100 || car.mileage == "") {
      document.getElementById("validate_mileage").innerHTML =
        "Mileage may not be more than 100";
      IsValid = false;
    } else {
      document.getElementById("validate_mileage").innerHTML = "";
    }

    if (car.cpurchase == "") {
      document.getElementById("validate_purchase").innerHTML =
        "Enter Purchase Date";
      IsValid = false;
    } else {
      document.getElementById("validate_purchase").innerHTML = "";
    }

    return IsValid;
  }

  return (
    <div>
      <div classname="background">
        <div className="container">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-header">
                <h3 className="">Car Register</h3>
              </div>
              <div className="card-body">
                <form onSubmit={register}
                  enctype="multipart/form-data">
                  <div className="validation" id="validate_cname"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-car"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Car name"
                      name="cname"
                      required
                      value={car.cname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="validation" id="validate_company"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-building"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Car Company"
                      name="company"
                      value={car.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="validation" id="validate_carno"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-car"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Car number"
                      required
                      name="carno"
                      value={car.carno}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="validation" id="validate_location"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-map-marked"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City location"
                      requird
                      name="location"
                      value={car.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="validation" id="validate_seat"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fa-solid fa-couch"></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="No of Seats to sit"
                      requird
                      name="seat"
                      value={car.seat}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="validation" id="validate_price"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-dollar-sign"></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Fair for ride"
                      requird
                      name="cprice"
                      value={car.cprice}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="bi bi-fan"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      value={car.cartype}
                      name="cartype"
                      placeholder="Car Type"
                      onChange={handleChange}
                    >
                      <option value="NONAC">NON AC</option>
                      <option value="AC">AC</option>
                    </select>
                  </div>


                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="fa-solid fa-gas-pump"></i>

                      </span>
                    </div>
                    <select
                      className="form-control"
                      value={car.fuel}
                      name="fuel"
                      placeholder="Fuel Type"
                      onChange={handleChange}
                    >
                      <option value="PETROL">PETROL</option>
                      <option value="DIESEL">DIESEL</option>
                      <option value="CNG">CNG</option>
                    </select>
                  </div>


                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="bi bi-gear-fill"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      value={car.gear_type}
                      name="gear_type"
                      placeholder="GearType"
                      onChange={handleChange}
                    >
                      <option value="MANUAL">MANUAL</option>
                      <option value="AUTO">AUTO</option>

                    </select>
                  </div>

                  <div className="validation" id="validate_mileage"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="bi bi-speedometer2"></i>
                      </span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Mileage"
                      requird
                      name="mileage"
                      value={car.mileage}
                      onChange={handleChange}
                    />
                  </div>

                  <div div className="validation" id="validate_purchase"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i class="bi bi-calendar-date-fill"></i>
                      </span>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Car Purchase"
                      requird
                      name="cpurchase"
                      value={car.cpurchase}
                      onChange={handleChange}
                    />
                  </div>
                  <div div className="validation" id="validate_image"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-key"></i>
                      </span>
                    </div>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      placeholder="Upload image"
                      value={car.file}
                      onChange={handlefile}

                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      value="Register"
                      placeholder="Submit"
                      className="btn float-right login_btn"
                    >Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
