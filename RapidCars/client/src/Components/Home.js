import React from 'react'
import { useHistory } from 'react-router-dom'
import './home.css'
export default function Home() {

    const history = useHistory();
    return (
        <div className='home_main'>
            <link
                href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                rel="stylesheet"
                id="bootstrap-css"
            />
            <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
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
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"></link>
           

            <section id="hero" className="d-flex align-items-center">
                <div className="container" data-aos="zoom-out" data-aos-delay="100">
                    <h1>Welcome to <span>Rapid Cars</span></h1>
                    <h2>Easy Book and Comfortable Ride</h2>
                    <div className="d-flex">
                        <a  class="btn-get-started scrollto" onClick={ ()=>history.push('/booking')}>Get Started</a>
                    </div>
                </div>
            </section>

            <section id="featured-services" className="featured-services">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>How we work</h2>
                        {/* <h3>Find Out More <span>About Us</span></h3> */}
                        {/* <p>Below we have shown the small .</p> */}
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                                <div className="icon"><i class="bi bi-search"></i></div>
                                <h4 className="title"><a href="">Find your car</a></h4>
                                <p className="description">Search the car which you want for booking and select book button</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
                                <div className="icon"><i class="bi bi-box-arrow-in-right"></i></div>
                                <h4 className="title"><a href="">Enter your route</a></h4>
                                <p className="description">Enter your starting and ending location with journey time and then you can book the car</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                                <div className="icon"><i class='fas fa-car'></i></div>
                                <h4 className="title"><a href=""> Get your car</a></h4>
                                <p className="description">After booking get the car from our store for the ride.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
                                <div className="icon"><i class="bi bi-geo-alt"></i></div>
                                <h4 className="title"><a href="">Return car</a></h4>
                                <p className="description">Return the car after your journey is over after your specified time.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>


            <section id="about" className="about section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                        <h2>About</h2>
                        <h3>Find Out More <span>About Us</span></h3>
                        <p>Rapid car is simple car rental website.You can easily book the car of your choice.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                            <img src="./../img/about.jpg" className="img-fluid" alt="" />
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="100">
                            <h3>Most people like to self drive go and discover new places or visit their relatives</h3>
                            <p className="font-italic">
                                With Rapid Cars you can book a car of your choice and travel to your destination within the date chosen by you.
                                Our cars are well managed and giving better mileage so to give our customers better satisfaction.
                            </p>
                            <ul>
                                <li>
                                    <i className="bx bx-store-alt"></i>
                                    <div>
                                        <h5>Car booking done easily</h5>
                                        <p>Booking will be done within couple minutes in our website and after done a confirmation mail is send to the customer.</p>
                                    </div>
                                </li>
                                {/* <li>
                                <i className="bx bx-images"></i>
                                <div>
                                    <h5>Magnam soluta odio exercitationem reprehenderi</h5>
                                    <p>Quo totam dolorum at pariatur aut distinctio dolorum laudantium illo direna pasata redi</p>
                                </div>
                            </li> */}
                            </ul>
                            <p>
                                Rapid Cars Always give more choices the customers and we always do
                                updation in our policies and website according to our customers wishes and satisfaction.
                                We will do our best.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="counts" className="counts">
                <div className="container" data-aos="fade-up">

                    <div className="row">

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-emoji-smile"></i>
                                {/* <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter"></span> */}
                                <span>500</span>
                                <p>Happy Clients</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                            <div className="count-box">
                                <i class='fas fa-car'></i>
                                <span> 100</span>
                                <p>Total Working Cars</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                                <i className="bi bi-headset"></i>
                                {/* <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter"></span> */}
                                <span>24X7</span>
                                <p>Hours Of Support</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                                <i class="bi bi-people"></i>
                                {/* <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span> */}
                                <span>20</span>
                                <p>Hard Workers</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <section id="services" className="services">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                        <h2>Services</h2>
                        <h3>Check our <span>Service</span></h3>
                        <p>We provide you services mentioned below and many more</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                            <div className="icon-box">
                                <div className="icon"><i class="bi bi-geo-alt-fill"></i></div>
                                <h4><a href="">Easy Booking</a></h4>
                                <p>Your boooking are done in one click after choosing your choice car.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
                            <div className="icon-box">
                                <div className="icon"> <i class='fas fa-car'></i></div>
                                <h4><a href="">Good Condition Cars</a></h4>
                                <p>Car are serviced time to time and giving good mileage.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="300">
                            <div className="icon-box">
                                <div className="icon"><i class="bi bi-tag-fill"></i></div>
                                <h4><a href="">Best Offers</a></h4>
                                <p>We give you better offer and more choices to our customers. </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="100">
                            <div className="icon-box">
                                <div className="icon"><i class='fas fa-users'></i></div>
                                <h4><a href="">Friendly Staff</a></h4>
                                <p>Our staff are hardworking and good natured ready to solve problem any time.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="200">
                            <div className="icon-box">
                                <div className="icon"><i class="bi bi-phone-fill"></i></div>
                                <h4><a href=""></a>Mobile Ready</h4>
                                <p>Our website can run o mobile as well as PC so you can book from mobile too.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="300">
                            <div className="icon-box">
                                <div className="icon"><i class="bi bi-x-circle-fill"></i></div>
                                <h4><a href="">Easy Cancellation</a></h4>
                                <p>You can cancel booking within 48 hr of booking but after that charged will be applied.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>


            {/* <section id="faq" className="faq section-bg">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>F.A.Q</h2>
          <h3>Frequently Asked <span>Questions</span></h3>
          <p>These are the common questions asked by the customers joined with our website.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-10">
            <ul className="faq-list">

              <li>
                <div data-bs-toggle="collapse" className="collapsed question" href="#faq1">How old do I need to be to rent a Car from Rapid Cars? <i className="bi bi-chevron-down icon-show"></i><i className="bi bi-chevron-up icon-close"></i></div>
                <div id="faq1" className="collapse" data-bs-parent=".faq-list">
                  <p>
                  You can rent an car from Rapid Cars if you are 18 years or above
                  </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq2" class="collapsed question">Do I need to pick up the car from Rapid Cars rental office? <i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i></div>
                <div id="faq2" class="collapse" data-bs-parent=".faq-list">
                  <p>
                    All the cars are picked up from the nearby rapid cars store and the booking charges should be given there only.
                    Rapid Cars holds the right to cancel the booking in such case.
                  </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq3" class="collapsed question"> I need to drop off the car at a different location, can I do that? <i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i></div>
                <div id="faq3" class="collapse" data-bs-parent=".faq-list">
                  <p>
                  No. The car should be dilvered back to the place where it was picked up from.
                  </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq4" class="collapsed question">What if I return the car late? <i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i></div>
                <div id="faq4" class="collapse" data-bs-parent=".faq-list">
                  <p>
                   Additional charges will be applied according to the time it was late and the car taken. 
                  </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq5" class="collapsed question">What fuel types are available in Rapid cars?<i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i></div>
                <div id="faq5" class="collapse" data-bs-parent=".faq-list">
                  <p>
                    Rapid cars provide diesel and petrol fuel type cars which gives better mileage.
                  </p>
                </div>
              </li>

              <li>
                <div data-bs-toggle="collapse" href="#faq6" class="collapsed question">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i></div>
                <div id="faq6" className="collapse" data-bs-parent=".faq-list">
                  <p>
                    Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Nibh tellus molestie nunc non blandit massa enim nec.
                  </p>
                </div>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </section> */}

            <section id="contact" class="contact">
                <div class="container" data-aos="fade-up">

                    <div class="section-title">
                        <h2>Contact</h2>
                        <h3><span>Contact Us</span></h3>
                        <p>You can contact us via mail or call. Our email address and other contact information are mentioned below.</p>
                    </div>

                    <div class="row" data-aos="fade-up" data-aos-delay="100">
                        <div class="col-lg-6">
                            <div class="info-box mb-4">
                                <i class="bi bi-geo-alt-fill"></i>
                                <h3>Our Address</h3>
                                <p>A108 Near GEB, Naroda,Ahmedabad,330081 Gujrat  </p>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="info-box  mb-4">
                                <i class="bi bi-envelope-fill"></i>
                                <h3>Email Us</h3>
                                <p>rapidcars123@gmail.com</p>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="info-box  mb-4">
                                <i class="bi bi-telephone-fill"></i>
                                <h3>Call Us</h3>
                                <p>+91 9999888899</p>
                            </div>
                        </div>

                    </div>



                </div>
            </section>
            <footer id="footer">



                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                       
                            <div class="col-lg-3 col-md-6 footer-contact">
                                <h3>Rapid Cars<span>.</span></h3>
                                <p>A108 Near GEB <br></br>Naroda, Ahmedabad <br></br>330081 Gujrat, India<br /><br /><strong>Phone:</strong> +1 9999 8888 99<br /><strong>Email:</strong> rapidcar123@.com<br /></p>
                            </div>

                            <div class="col-lg-3 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Car Booking</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Booking History</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Car Management</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">Booking Cancellation</a></li>
                                    <li><i className="bx bx-chevron-right"></i> <a href="#">New Car Entry</a></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Social Networks</h4>
                                <p>Cras fermentum odio eu feugiat lide par naso tierra videa magna derita valies</p>
                                <div className="social-links mt-3">
                                    <a href="#" className="twitter"><i class="bi bi-twitter"></i></a>
                                    <a href="#" className="facebook"><i class="bi bi-facebook"></i></a>
                                    <a href="#" className="instagram"><i class="bi bi-instagram"></i></a>
                                    <a href="#" className="google-plus"><i class="bi bi-skype"></i></a>
                                    <a href="#" className="linkedin"><i class="bi bi-linkedin"></i></a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </div>








    )
}
