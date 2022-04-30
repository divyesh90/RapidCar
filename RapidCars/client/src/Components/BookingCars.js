import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pie } from "react-chartjs-2"
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from 'chart.js';
import './CarsDetails.css'
export default function BookingCars() {

    const history = useHistory();

    const [booking, setbooking] = React.useState(null);
    const [bookingcar, setData] = React.useState(null);



    React.useEffect(() => {

        axios.post("http://localhost:8000/api/systembookingdata")
            .then(res => {
                console.log("valid input  1233")
                console.log(res.data)
                setbooking(res.data)
                setData(res.data);


                console.log(res.data);
            })
            .catch(err => {
                console.log("error")

            })
        console.log('karm patel')


    }, []);



    const booking_history_sort = (isbook) => {
        console.log("in booking" + isbook)

        if (isbook == true) {
            var el = document.getElementById("reserve")
            el.style.color = "white";
            el.style.background = "#299be4";
        }
        else {
            var el = document.getElementById("reserve")
            el.style.color = "#299be4";
            el.style.background = "#f5f5f5";


        }

        if (isbook == false) {
            var el = document.getElementById("unreserve")
            el.style.color = "white";
            el.style.background = "#299be4";



        }
        else {
            var el = document.getElementById("unreserve")
            el.style.color = "#299be4";
            el.style.background = "#f5f5f5";


        }

        if (isbook == "all") {
            setbooking(bookingcar)

            var el = document.getElementById("all")
            el.style.color = "white";
            el.style.background = "#299be4";
        }
        else {

            setbooking(bookingcar.filter((val) => {
                return val.booking.IsRuning === isbook
            }))

            var el = document.getElementById("all")
            el.style.color = "#299be4";
            el.style.background = "#f5f5f5";
        }




    }

    function bookingPieChart() {

       return(
        <PieChart
        data={[
          { title: 'One', value: 10, color: '#E38627',background:"#C13C37"},
          { title: 'Two', value: 15, color: '#C13C37' },
          { title: 'Three', value: 20, color: '#6A2135' },
        ]}
       
      />
       )


        

        console.log("in chart");


    }








    function BookingComplete(carid) {

        axios.put("http://localhost:8000/api/bookingcomplete/" + carid)
            .then(res => {
                console.log("valid input  1233")
                console.log(res.data)
                console.log(bookingcar)
                // setbooking(bookingcar.filter((val) => {
                //     return bookingcar._id != res.data
                // }))


                console.log(bookingcar);
            })
            .catch(err => {
                console.log("hello======")
                console.log(err.data);
            })
        console.log('karm patel')




    }

    if (!bookingcar) return null;

    function rendercar() {

        console.log("dsfsdfdsfds")

        var num = 0;
        console.log(booking)
        booking.sort((a, b) => (new Date(a.booking.todate) < new Date(b.booking.todate) ? 1 : -1))
        booking.sort((a, b) => (a.booking.IsRuning != true ? 1 : -1))

        return booking.map(booking => {

            num++;
            var html
            var path = "http://localhost:8000/uploads/" + booking.car.cimage;
            var row_id = "row" + booking.car._id;
            var fromdate = new Date(booking.booking.fromdate)
            var todate = new Date(booking.booking.todate)
            var fDate = fromdate.getDate() + "/ " + fromdate.getMonth() + "/ " + fromdate.getFullYear()
            var toDate = todate.getDate() + "/" + todate.getMonth() + "/" + todate.getFullYear()

            console.log(booking.booking.IsRuning)

            if (booking.booking.IsRuning == true) {
                var html = <a className="delete" title="Delete" data-toggle="tooltip" onClick={() => BookingComplete(booking.booking._id)}>
                    <i class="fa fa-trash"></i></a>
            }


            return (


                <>

                    <tr>
                        <td>{num}</td>

                        <td><a><img src={path} className="avatar" alt="photo" /> {booking.car.cname}</a></td>
                        <td>{booking.car.company}</td>
                        <td><span className="status text-success"></span>{booking.car.carno}</td>
                        <td><span className="status text-success"></span>{booking.car.cprice}</td>
                        <td><span className="status text-success"></span>{booking.car.location}</td>
                        <td><span className="status text-success"></span>{booking.booking.fromlocation}</td>
                        <td><span className="status text-success"></span>{booking.booking.tolocation}</td>
                        <td><span className="status text-success"></span>{fDate}</td>
                        <td><span className="status text-success"></span>{toDate}</td>
                        <td><span className="status text-success"></span>{booking.booking.BillAmount}</td>
                        <td><span className="status text-success"></span>{booking.booking.Hours}</td>

                        <td>
                            {html}
                        </td>
                    </tr>


                    {/* <tr id={des_id} >
                        <th>Description </th> <td>{user.decription} </td>
                    </tr> */}

                </>
                // <>

                //     <div className='cars' id={row_id} >
                //         <img src={path}></img>
                //         <div className='car_details'>

                //             <span> <i class="fas fa-map-marker-alt"> </i> <h3>{car.location}</h3> </span>
                //             <h2>{car.company} {car.cname}</h2>
                //             <h3>{car.seat} {car.cartype}</h3>
                //             <br></br>
                //             <h3>{car.carno} </h3>
                //             <br></br>
                //             <h3>{car.cpurchase}</h3>
                //             <br></br>
                //             <span> <i class="fas fa-star"></i>  <i class="fas fa-star"></i> <i class="fas fa-star"></i> </span><br></br>
                //             <h2><span><i class="fas fa-rupee-sign"></i></span>{car.cprice}</h2>
                //             <button>  Book Now </button>
                //         </div>
                //     </div>
                // </>

            )






        })


    }



    return (

        <div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
            {/* <div id='mybooking_main'>
                <div className='mybooking_containar'>
                    <div className='mybooking_block'>
                        <div className='booking_car'>
                            <div className='cars' >
                                <img src='./img/download.jpg'></img>
                                <div className='car_details'>

                                    <span> <i class="fas fa-map-marker-alt"> </i> <h3>5 seater seadan</h3> </span>
                                    <h2>maruti suzuki baleno</h2>
                                    <h3>5 seater seadan</h3>
                                    <br></br>
                                    <br></br>
                                    <span> <i class="fas fa-star"></i>  <i class="fas fa-star"></i> <i class="fas fa-star"></i> </span><br></br>
                                    <h2><span><i class="fas fa-rupee-sign"></i></span>500</h2>
                                    <button>  Book Now </button>
                                </div>
                            </div>
                            {rendercar()}
                        </div>
                    </div>
                </div>

            </div> */}


            <div className="p_main">
                <div className="container">
                    <div className="table-responsive">
                    
                    <div id="bookingPie">
                    {bookingPieChart()}
                    </div>
                       

                        <div className="table-wrapper">
                            <div className="table-title">

                                <div className="row">

                                    <div className="row">
                                        <div className="column">
                                            <h2>Car <b>Details</b></h2>
                                        </div>
                                        <div className="column">
                                            <div class="list_button">
                                                <div class="button" > <button id="reserve" onClick={() => booking_history_sort(true)}>Running</button></div>
                                                <div class="button" > <button id="unreserve" onClick={() => booking_history_sort(false)}>History</button></div>
                                                <div class="button" > <button id="all" onClick={() => booking_history_sort("all")}>All Car</button></div>
                                            </div>

                                        </div>


                                    </div>

                                </div>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Car</th>
                                        <th>Company</th>
                                        <th>Car No</th>
                                        <th>Cprice</th>
                                        <th>Location</th>
                                        <th>From </th>
                                        <th>To</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Price</th>
                                        <th>Day:Hrs:Min</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                    <td>1</td>
                                    <td><a href="#"><img src="/examples/images/avatar/1.jpg" className="avatar" alt="Avatar"/> Karm patel</a></td>                      
                                    <td>Admin</td>
                                    <td><span className="status text-success">&bull;</span> Active</td>
                                    <td>
                                        <a href="#" className="settings" title="Settings" data-toggle="tooltip"><i className="material-icons">&#xE8B8;</i></a>
                                        <a href="#" className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE5C9;</i></a>
                                    </td>
                                </tr> */}
                                    {/* {renderTable()} */}


                                    {rendercar()}
                                    




                                </tbody>
                            </table>

                        </div>
                    </div>

                </div >
            </div>
        </div>
    )
}
