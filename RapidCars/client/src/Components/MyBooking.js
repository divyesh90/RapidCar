import React from 'react'
import './mybooking.css'
import axios from 'axios';


import { useHistory } from 'react-router-dom';

import { useState } from 'react/cjs/react.production.min';
// import image from './../../public/img/download.jpg';

export default function Booking(props) {

   const history = useHistory();
  
    const [mybooking, setData] = React.useState(null);
    var TotalPrice = 0;

    React.useEffect(() => {
        var user_id = props.user_id
        //console.log(user_id)
        axios.post("http://localhost:8000/api/bookingdata" , {user_id})
            .then(res => {
                console.log("valid input  1233")
                setData( res.data.filter( (val) => {
                    return val.booking.IsRuning == true
                } ) )

                console.log(res.data);
            })
            .catch(err => {
                console.log("hello======")
                console.log(err.data);
            })


    }, []);


    
    
    function cancle_booking (bookingid) {
       
        
        axios.delete('http://localhost:8000/api/canclebooking/' + bookingid)
                .then( res => {
                    console.log("valid input  1233")
                   
                    setData( mybooking.filter( (val) => {
                        return val.booking._id != res.data.bookingid
                    } ) )
                })
                .catch(err => {
                    console.log("errororr r sd f")
                    // console.log(res.data);
                })
    }
   

   
    
   if (!mybooking) return null;

   
   

    const renderBill = () => {

        if (TotalPrice != 0){

            return (
                <>
                <h1 id="total_bill">Total Bill:₹{TotalPrice}</h1> 
                </>
            )

        }
        else
        {
            return (
                <>
                <h1 id="total_bill">please select car</h1> 
                </>
            )

        }

    }
 


    


    const rendercar = () => {
        var num = 0;

        return mybooking.map(mybooking => {

            num++;

            var path = "http://localhost:8000/uploads/" + mybooking.car.cimage;
            var row_id = "row" + mybooking.car._id;
            var fromdate = new Date(mybooking.booking.fromdate)
           
            var todate = new Date(mybooking.booking.todate)
            var fDate = fromdate.getDate() + "/ " + fromdate.getMonth() + "/ " + fromdate.getFullYear()
            var toDate = todate.getDate() +  "/" + todate.getMonth() + "/" + todate.getFullYear()
            var todate = new Date(mybooking.booking.todate)

           

            const diffTime = Math.abs(todate - fromdate);
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60 )); 
            const diffminutes =  diffTime / (1000 * 60  ) - diffHours * 60 ; 
            console.log(diffTime / (1000 * 60  ))
            const price  = Math.floor(diffHours * mybooking.car.cprice + diffminutes * (mybooking.car.cprice / 60)) ;
            TotalPrice = TotalPrice + price;
            return (
                <>

                    <div className='cars' id={row_id} >
                        <img src={path}></img>
                        <div className='car_details'>

                            <span> <i class="fas fa-map-marker-alt"> </i> <h3>{ mybooking.car.location}</h3> </span>
                            <h2>{ mybooking.car.company} { mybooking.car.cname}</h2>   
                            <h3>{mybooking.car.seat} { mybooking.car.cartype}</h3>
                            <br></br>
                            <h3>{ mybooking.car.carno} </h3>
                            <br></br>
                            <br></br>
                            <span> <i class="fas fa-star"></i>  <i class="fas fa-star"></i> <i class="fas fa-star"></i> </span><br></br>
                            <h2><span><i class="fas fa-rupee-sign"></i></span>{ mybooking.car.cprice}/Hour</h2>

                            <h2>{ fDate} To  {toDate}</h2>
                            <h2>{ mybooking.booking.fromlocation.toUpperCase()} To { mybooking.booking.tolocation.toUpperCase()}</h2>
                            <h2>Booking(D:H:M) - {mybooking.booking.Hours} </h2>
                            <h2>Price : {price}</h2>
                            <button  name="carid" value={mybooking.car._id}  onClick = { () =>{
                                
                                const confirmBox = window.confirm(
                                    "Do you really want to cancle booking of this Car?"
                                  )
                                 if (confirmBox === true) {
                                    cancle_booking(mybooking.booking._id)
                                  }
                            } }   >   Cancle Booking </button>
                        </div>
                    </div>
                </>

               
            )
        })
    }

   

   


    return (
        <div>
            <div id='mybooking_main' >
               
                <div>

                    <div className='mybooking_containar'>

                       

                        <div className='mybooking_block'>
                        
                            <div className='booking_car'>
                                <div className='car' >
                                    {/* <img src='./img/download.jpg'></img>
                                    <div className='car_details'>

                                        <span> <i class="fas fa-map-marker-alt"> </i> <h3>5 seater seadan</h3> </span>
                                        <h2>maruti suzuki baleno</h2>
                                        <h3>5 seater seadan</h3>
                                        <br></br>
                                        <br></br>
                                        <span> <i class="fas fa-star"></i>  <i class="fas fa-star"></i> <i class="fas fa-star"></i> </span><br></br>
                                        <h2><span><i class="fas fa-rupee-sign"></i></span>500</h2>
                                        <button>  Book Now </button>
                                    </div> */}
                                </div>
                                {rendercar()}

                            </div>
                            {renderBill()}
                           
                        </div>
                        
                    </div>

                </div>


            </div>
        </div>

    )
}
