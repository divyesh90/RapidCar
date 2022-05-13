import React from 'react'
import './login_signup.css'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
// import { useHistory } from 'react-router'

export default function Signup() {


        const history= useHistory()
        const [ user , setUser] = useState({
            uname: "",
            email: "",
            mobileno: "",
            password: "",
            repassword: ""
        
        })
        
    
        function register() {
    
            if( validate_input(user) == true)
            {

                axios.post("http://localhost:8000/api/signup", user)
                .then( res => {
                    console.log("valid input  1233")
                    history.push('/login');
                    console.log(res.data.result.email)
                })
                .catch(err => {
                   
                    const confirmBox = window.alert("Unsuccesful signup try again!")
                })
            }
            else
            {
                console.log("invalid input");
            }
    
        }
    
        // localStorage.setItem('login', 'no')
        // localStorage.removeItem('user')
        //console.log("dsfdsfddgd")
    
    
        const handleChange= e=> {
            const { name , value} = e.target
            setUser({
                ...user,
                [name]: value
            })
            
        }
       

         function  validate_input (user) {
            console.log("validate")
           // console.log(user)
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var phoneno = /^\d{10}$/;
            var IsValid = true;
          
            
           if(user.uname.length < 3 || user.uname ==''){
                document.getElementById('validate_uname').innerHTML="Username must be at list 3 letter"
                IsValid=false
           }
            else{

                document.getElementById('validate_uname').innerHTML=""
            }

            if( !user.email.match(mailformat)  || user.email == ''){
                document.getElementById('validate_email').innerHTML="Invalid Email Format"
                IsValid=false
            }
            else{
                document.getElementById('validate_email').innerHTML=""
            }

            if( !user.mobileno.match(phoneno)  || user.mobileno == ''){
                document.getElementById('validate_phoneno').innerHTML="Invalid mobile number Format"
                IsValid=false
            }
            else{
                document.getElementById('validate_phoneno').innerHTML=""
            }

            if( user.password.length < 6 || user.password == ''){
                document.getElementById('validate_password').innerHTML="Password must be at list 6 latter"
                IsValid=false
            }
            else{
                document.getElementById('validate_password').innerHTML=""
            }

            if( user.repassword != user.password || user.repassword == ''){
                document.getElementById('validate_repassword').innerHTML="Password doesn't match "
                IsValid=false
            }
            else{
                document.getElementById('validate_repassword').innerHTML=""
            }

            //console.log(IsValid);
            return IsValid;
            


        }


    
    return (
        <div>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />

            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />




            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3 className=''>Sign Up
                                <div className="d-flex justify-content-end social_icon">
                                    <span><i className="fab fa-facebook-square"></i></span>
                                    <span><i className="fab fa-google-plus-square"></i></span>
                                    <span><i className="fab fa-twitter-square"></i></span>
                                </div>
                            </h3>

                        </div>
                        <div className="card-body">

                            <form>
                            <div className='validation' id="validate_uname"></div>
                                <div className="input-group form-group">

                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                   <input type="text" className="form-control" placeholder="Username" name="uname" value={user.uname} onChange={handleChange}/> 
                                    
                                </div>
                                <div className='validation' id="validate_email"></div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                    </div>
                        
                                    <input type="email" className="form-control" placeholder="Email" required name="email"  
                                      value={user.email} onChange={handleChange} />

                                </div>

                                <div className='validation' id="validate_phoneno"></div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-mobile-alt"></i></span>
                                    </div>
                                    <input  type="tel"  pattern="[0-9]{10}" className="form-control" placeholder="Mobile" required name="mobileno" value={user.mobileno} onChange={handleChange}/>


                                </div>
                                <div className='validation' id="validate_password"></div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password"  requird name="password" value={user.password} onChange={handleChange}/>
                                </div>

                                <div className='validation' id="validate_repassword"></div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" className="form-control" placeholder="password"  requird  name="repassword" value={user.repassword} onChange={handleChange}/>
                                </div>

                                <div className="form-group">
                                    <input  type="button" value="Register" onClick={ () => register()} className="btn float-right login_btn"  />
                                </div>


                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Do have an account?<Link to='/login'> Login </Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="/forgetpassword">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
