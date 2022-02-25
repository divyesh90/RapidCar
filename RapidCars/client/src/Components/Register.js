import React from "react";
import "./login_signup.css";
import { useState } from "react";
import axios from "axios";
// import { useHistory } from 'react-router'

export default function Register() {
  // const history= useHistory()
  const [car, setcar] = useState({
    cname: "",
    location: "",
    carno: "",
    cartype: "AC",
    company: "",
    seat: "",
    cpurchase: "",
    cprice: "",
  });


  const [file, setFile] = useState(null);

  const handlefile = (e) => {
    setFile(e.target.files[0]);
  };

  // const [file, setFile] = useState(null);

  // const handlefile = (e) => {
  //   setFile(e.target.files[0]);
  // };
  const register = (e) => {

    e.preventDefault();

    if( validate_input(car) == true)
    {
   
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
  
   
       
        axios.post("http://localhost:8000/api/carregister", Cardata , config)
        .then( res => {
            console.log("valid input  1233")
            //history.push('/login');
            console.log(res.data.result)
        })
        .catch(err => {
           
            console.log(err);
        })
    }
    else
    {
        console.log("invalid input");
    }

}

  // localStorage.setItem('login', 'no')
  // localStorage.removeItem('car')
  //console.log("dsfdsfddgd")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcar({
      ...car,
      [name]: value,
    });
    console.log(car);
  };

  function validate_input(car) {
    console.log("validate");
    // console.log(car)
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
    if (car.cprice < 100 || car.cprice == "") {
      document.getElementById("validate_price").innerHTML =
        "Price should be given and must be greater than 100";
      IsValid = false;
    } else {
      document.getElementById("validate_price").innerHTML = "";
    }
    if (car.cpurchase == "") {
      document.getElementById("validate_purchase").innerHTML =
        "Enter Purchase Date";
      IsValid = false;
    } else {
      document.getElementById("validate_purchase").innerHTML = "";
    }
    // if (car.cimage == "") {
    //   document.getElementById("validate_image").innerHTML =
    //     "Upload Image";
    //   IsValid = false;
    // } else {
    //   document.getElementById("validate_image").innerHTML = "";
    // }
    //console.log(IsValid);
    return IsValid;
  }

  return (
    <div>
      <link
        href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous"
      />

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossorigin="anonymous"
      />

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
                      required
                      name="company"
                      required
                      value={car.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="validation" id="validate_carno"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-badge"></i>
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
                        <i className="fas fa-key"></i>
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
                        <i className="fas fa-key"></i>
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
                  <div div className="validation" id="validate_purchase"></div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas-fa-calendar-day"></i>
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
                      type ="submit"
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