import './Components/Login'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { useState } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Booking from './Components/Booking';
import Register from './Components/Register';
import MyBooking from './Components/MyBooking';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";

import CarsDetails from './Components/CarsDetails';
import BookingCars from './Components/BookingCars';
import AdminNavbar from './Components/AdminNavbar';
import Home from "./Components/Home";
import Forgetpas from './Components/Forgetpas';



function App() {
  const [user, setloginuser] = useState({});
  var uname;
  var login;
  var user_login = window.localStorage.getItem('user_login')

  if (!user._id && user_login == "yes") {
    setloginuser(JSON.parse(window.localStorage.getItem('user')));
  }

  if (user.name)
    uname = user.name;
  else
    uname = "";

  if (user.name)
    login = "Logout"
  else
    login = "Login"

  return (
    <Router>
      <div className="App">


        <Switch>
          <Route exact path='/'>
            <>
              <Navbar setloginuser={setloginuser} uname={uname} login={login} />
              <Home />
            </>


          </Route>
          <Route path='/booking' >

            {

              <>
                <Navbar setloginuser={setloginuser} uname={uname} login={login} />
                <Booking user_id={user._id} />
              </>
            }

          </Route>
          <Route path='/mybooking' >
            {
              user._id ?
                <>
                  <Navbar setloginuser={setloginuser} uname={uname} login={login} />
                  <MyBooking user_id={user._id} />
                </>
                :
                <Login setloginuser={setloginuser} />
            }
          </Route>
          <Route path='/login'>
            <>
              <Login setloginuser={setloginuser} />
            </>

          </Route>
          <Route path='/forgetpassword'>
            <>
              <Forgetpas />
            </>

          </Route>
          <Route path='/signup'>
            <>
              <Signup />
            </>

          </Route>
          <Route path='/cardetails' >

            {
              user.email == "rapidcars123@gmail.com" ?
                <>
                  <AdminNavbar setloginuser={setloginuser} uname={uname} login={login} />
                  <CarsDetails />
                </>
                :
                <Login setloginuser={setloginuser} />
            }
          </Route>
          <Route path='/register'>
            {
              user.email == "rapidcars123@gmail.com" ?
                <>
                  <AdminNavbar setloginuser={setloginuser} uname={uname} login={login} />
                  <Register />
                </>
                :
                <Login setloginuser={setloginuser} />

            }
          </Route>
          <Route path='/bookingcars' >

            {
              user.email == "rapidcars123@gmail.com" ?
                <>
                  <AdminNavbar setloginuser={setloginuser} uname={uname} login={login} />
                  <BookingCars />
                </>
                :
                <Login setloginuser={setloginuser} />

            }

          </Route>
          <Redirect to="/" />
        </Switch>

      </div>
    </Router>
  );
}
export default App;
