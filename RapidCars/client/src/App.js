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
import ExportPdfComponent from './Components/ExportPdfComponent';
import BookingCars from './Components/BookingCars';
import AdminNavbar from './Components/AdminNavbar';



function App() {



  const [user, setloginuser] = useState({});

  console.log(user);
  var uname;
  var login;

  var user_login = window.localStorage.getItem('user_login')

  if (!user._id && user_login == "yes") {
    console.log("local")

    setloginuser(JSON.parse(window.localStorage.getItem('user')));
  }



  console.log(user_login);




  console.log(user);
  if (user.name)
    uname = user.name;
  else
    uname = "";

  if (user.name)
    login = "Logout"
  else
    login = "Login"

  console.log("in app.js");

  return (
    <Router>
      <div className="App">


        <Switch>
          <Route exact path='/'>
            <>
              <Navbar setloginuser={setloginuser} uname={uname} login={login} />
              {/*  */}
            </>


          </Route>


          <Route path='/booking' >

            {
              user._id ?
                <>
                  <Navbar setloginuser={setloginuser} uname={uname} login={login} />
                  <Booking user_id={user._id} />
                </>
                :
                <>

                  <Login setloginuser={setloginuser} />
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


          <Route path='/invoice' >

            {
              user._id ?
                <>
                  <Navbar setloginuser={setloginuser} uname={uname} login={login} />
                  <ExportPdfComponent />
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
        <Route path='/signup'>
          <>
            <Signup />
          </>

        </Route>

        <Route path='/cardetails' >

          {
            user.email =="rapidcars123@gmail.com" ?
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
            user.email =="rapidcars123@gmail.com"?
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
            user.email =="rapidcars123@gmail.com" ?
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

        {/* <Login/> */}
        {/* <Signup/> */}


      </div>
    </Router>
  );
}

export default App;
