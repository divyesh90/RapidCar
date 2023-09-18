import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
export default function AdminNavbar( props ) {
const history = useHistory()

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function redirect() {
    var auth = document.getElementById('logout').innerHTML;
    document.getElementById("remove-button").innerHTML = "";
    if(auth == "Login")
        history.push('/login');
    else{
      window.localStorage.setItem('user_login', 'No');
      window.localStorage.removeItem('user');
      props.setloginuser({});
      history.push('/');
    }
  }

  return (
    <div>
      <div class="topnav" id="myTopnav">
        <img src="./rapido-final-logo.png" class="logo" />
        <a> </a>
        <a> </a>
        <Link to="/register">Register car</Link>
        <Link to="/cardetails">Cars</Link>
        <Link to="/bookingcars">Booked car</Link>
        <Link id='logout' onClick={() => redirect()} >{props.login}</Link>
        <span><a class="icon" onClick={() => myFunction()}>
          < i class="fa fa-bars" id='remove-button'></i>
        </a></span>
        <span><a href="#a"><i class="fas fa-user"></i>{props.uname}</a></span>
      </div>
    </div>
  )
}
