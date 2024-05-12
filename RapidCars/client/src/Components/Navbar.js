import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Navbar(props) {
  const history = useHistory();

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function redirect() {
    var auth = document.getElementById("logout").innerHTML;
    console.log(auth);
    document.getElementById("remove-button").innerHTML = "";
    if (auth == "Login") history.push("/login");
    else {
      window.localStorage.setItem("user_login", "No");
      window.localStorage.removeItem("user");
      props.setloginuser({});
      history.push("/");
    }
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossorigin="anonymous"
      />
      <div class="topnav" id="myTopnav">
        <img src="./rapido-final-logo.png" class="logo" />
        <a></a>
        <a className="active" onClick={() => history.push("/")}>
          Home
        </a>
        <a className="active" onClick={() => history.push("/booking")}>
          Booking
        </a>
        <a className="active" onClick={() => history.push("/mybooking")}>
          My Booking
        </a>
        <a className="active" id="logout" onClick={() => redirect()}>
          {props.login}
        </a>
        <span>
          <a class="icon" onClick={() => myFunction()}>
            <i class="fa fa-bars" id="remove-button"></i>
          </a>
        </span>
        <span>
          <a href="#a">
            <i class="fas fa-user"></i>
            {props.uname}
          </a>
        </span>
      </div>
    </div>
  );
}
