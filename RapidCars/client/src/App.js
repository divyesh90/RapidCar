import "./Components/Login";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Booking from "./Components/Booking";
import Register from "./Components/Register";
import MyBooking from "./Components/MyBooking";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import CarsDetails from "./Components/CarsDetails";
import BookingCars from "./Components/BookingCars";
import AdminNavbar from "./Components/AdminNavbar";
import Home from "./Components/Home";
import Forgetpas from "./Components/Forgetpas";

function App() {
  const [user, setloginuser] = useState({});
  var uname;
  var login;
  var user_login = window.localStorage.getItem("user_login");

  if (!user._id && user_login == "yes") {
    setloginuser(JSON.parse(window.localStorage.getItem("user")));
  }

  if (user.name) uname = user.name;
  else uname = "";

  if (user.name) login = "Logout";
  else login = "Login";

  return (
    <Router>
      <div className="App">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
          rel="stylesheet"
        ></link>
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
        <link rel="stylesheet" type="text/css" href="styles.css" />
        <Switch>
          <Route exact path="/">
            <>
              <Navbar setloginuser={setloginuser} uname={uname} login={login} />
              <Home />
            </>
          </Route>
          <Route path="/booking">
            {
              <>
                <Navbar
                  setloginuser={setloginuser}
                  uname={uname}
                  login={login}
                />
                <Booking user_id={user._id} />
              </>
            }
          </Route>
          <Route path="/mybooking">
            {user._id ? (
              <>
                <Navbar
                  setloginuser={setloginuser}
                  uname={uname}
                  login={login}
                />
                <MyBooking user_id={user._id} />
              </>
            ) : (
              <Login setloginuser={setloginuser} />
            )}
          </Route>
          <Route path="/login">
            <>
              <Login setloginuser={setloginuser} />
            </>
          </Route>
          <Route path="/forgetpassword">
            <>
              <Forgetpas />
            </>
          </Route>
          <Route path="/signup">
            <>
              <Signup />
            </>
          </Route>
          <Route path="/cardetails">
            {user.email == "rapidcars123@gmail.com" ? (
              <>
                <AdminNavbar
                  setloginuser={setloginuser}
                  uname={uname}
                  login={login}
                />
                <CarsDetails />
              </>
            ) : (
              <Login setloginuser={setloginuser} />
            )}
          </Route>
          <Route path="/register">
            {user.email == "rapidcars123@gmail.com" ? (
              <>
                <AdminNavbar
                  setloginuser={setloginuser}
                  uname={uname}
                  login={login}
                />
                <Register />
              </>
            ) : (
              <Login setloginuser={setloginuser} />
            )}
          </Route>
          <Route path="/bookingcars">
            {user.email == "rapidcars123@gmail.com" ? (
              <>
                <AdminNavbar
                  setloginuser={setloginuser}
                  uname={uname}
                  login={login}
                />
                <BookingCars />
              </>
            ) : (
              <Login setloginuser={setloginuser} />
            )}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
