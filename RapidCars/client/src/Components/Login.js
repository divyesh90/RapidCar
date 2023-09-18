import React from 'react'
import './login_signup.css'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function Login({ setloginuser }) {

    const history = useHistory()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    function login() {
        if (validate_input(user) == true) {
            axios.post("http://localhost:8000/api/signin", user)
                .then(res => {
                    setloginuser(res.data.message);
                    window.localStorage.setItem("user_login", "yes")
                    window.localStorage.setItem("user", JSON.stringify(res.data.message))
                    if (res.data.message.email === "rapidcars123@gmail.com") {

                        history.push({
                            pathname: '/cardetails',
                        });
                    }
                    else {
                        history.push('/')
                    }
                })
                .catch(res => {

                    console.log(res)
                })
        }
        else {
            console.log("invalid input");
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

        if (user.password.length < 6 || user.password == '') {
            document.getElementById('validate_password').innerHTML = "Password must be atleast 6 latter"
            IsValid = false
        }
        else {
            document.getElementById('validate_password').innerHTML = ""
        }
        return IsValid;
    }

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    return (
        <div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className='bg_image'>
                <div classNameName="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign In</h3>
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
                                        <input type="text" className="form-control" placeholder="Email" required name="email" value={user.email} onChange={handleChange} />

                                    </div>


                                    <div className='validation' id="validate_password"> </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="password" requird name="password" value={user.password} onChange={handleChange} />
                                    </div>


                                    <div className="row align-items-center remember">
                                        <input type="checkbox" />Remember Me
                                    </div>
                                    <div className="form-group">
                                        <input type="button" value="Sign In" onClick={() => login()} className="btn float-right login_btn" ></input>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account?<Link to='/signup'>Signup</Link>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a href="/forgetpassword">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

