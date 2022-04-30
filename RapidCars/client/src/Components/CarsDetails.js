import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './CarsDetails.css'
export default function CarsDetails() {

    const history = useHistory();
    const [cardetails, setData] = React.useState(null);
    const [cars, setcar] = React.useState(null);
    React.useEffect(() => {

        axios.get("http://localhost:8000/api/cars")
            .then(res => {
                console.log("valid input  1233")
                setcar(res.data);
                setData(res.data);
               
                console.log(res.data);
            })
            .catch(err => {
                console.log("hello======")
                console.log(err.data);
            })
        console.log('karm patel')


    }, []);


    if (!cardetails) return null;
    // axios.get("http://localhost:8000/api/cars")
    //         .then(res => {
    //             console.log("valid input  1233")
    //             setData(res.data);
    //             setcar(res.data);

    //             console.log(res.data);
    //         })
    //         .catch(err => {
    //             console.log("hello======")
    //             console.log(err.data);
    //         })
    //         console.log('karm patel')



const  booking_car_sort = (isbook) =>{
    console.log("in booking"+isbook )

    if( isbook == true){
       var el = document.getElementById("reserve")
       el.style.color = "white";
       el.style. background = "#299be4";
    }
    else{
        var el = document.getElementById("reserve")
         el.style.color = "#299be4";
         el.style. background = "#f5f5f5";
        

    }


    if( isbook == false){
        var el = document.getElementById("unreserve")
        el.style.color = "white";
        el.style. background = "#299be4";
     }
     else{
        var el = document.getElementById("unreserve")
         el.style.color = "#299be4";
         el.style. background = "#f5f5f5";
        

    }
 
    if( isbook == "all"){
        setcar(cardetails)

        var el = document.getElementById("all")
        el.style.color = "white";
        el.style. background = "#299be4";
    }
    else{

        setcar( cardetails.filter( (val) => {
            return val.IsBook === isbook
        } ) )

        var el = document.getElementById("all")
         el.style.color = "#299be4";
         el.style. background = "#f5f5f5";
    }

   


}


    function RemoveCar(carid ) {


        axios.delete('http://localhost:8000/api/removecar/' + carid)
            .then(res => {


                console.log(res.data.carid)
                setcar( cardetails.filter( (val) => {
                    return val._id != res.data.carid
                } ) )
            })
            .catch(err => {
                console.log("error delete")
                // console.log(res.data);
            })
    }




    function rendercar() {

        var num = 0;
        console.log(cardetails)
        return cars.map(car => {

            num++;

            var path = "http://localhost:8000/uploads/" + car.cimage;
            var row_id = "row" + car._id;
            var pdate = new Date(car.cpurchase)
            var PurchaseDate = pdate.getDate() + "/" + pdate.getMonth() + "/" + pdate.getFullYear()

            if (car.IsBook == false) {
                var html = <a className="delete" title="Delete" data-toggle="tooltip" onClick={() => {

                    const confirmBox = window.confirm(
                        "Do you really want to Remove!  " + car.cname
                    )
                    if (confirmBox === true) {
                        RemoveCar(car._id )
                    }
                   }
                    }><i class="fa fa-trash"></i></a>
            }
           
            return (

                
                <>
                
                    <tr>
                        <td>{num}</td>

                        <td><a><img src={path} className="avatar" alt="photo" /> {car.cname}</a></td>
                        <td>{car.company}</td>
                        <td><span className="status text-success"></span>{car.carno}</td>
                        <td><span className="status text-success"></span>{car.cprice}</td>
                        <td><span className="status text-success"></span>{car.location}</td>
                        <td><span className="status text-success"></span>{PurchaseDate}</td>
                        <td><span className="status text-success"></span>{car.seat}</td>
                        <td><span className="status text-success"></span>{car.cartype}</td>
                        <td><span className="status text-success"></span>{car.fuel}</td>
                        <td><span className="status text-success"></span>{car.gear_type}</td>
                        <td><span className="status text-success"></span>{car.mileage}</td>
                        

                        {/* <td>
                            <a className="settings" title="Description" onClick={() => hidedescription(user._id)} ><i className="material-icons">&#xe873;</i></a>

                        </td> */}
                        {/* <td>{html}</td> */}
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
            


            <div className="p_main">
                <div className="container">
                  
                    <div className="table-responsive">
                        <div className="table-wrapper">
                            <div className="table-title">
            
                                <div className="row">
                                    <div className="column">
                                        <h2>Car <b>Details</b></h2>
                                    </div>
                                    <div className="column">
                                        <div class="list_button">
                                            <div class="button" > <button id="reserve" onClick={() => booking_car_sort(true)}>Reserved</button></div>
                                            <div class="button" > <button id="unreserve" onClick={() => booking_car_sort(false)}>Unreserved</button></div>
                                            <div class="button" > <button id="all" onClick={() => booking_car_sort("all")}>All Car</button></div>
                                        </div>
                                       
                                    </div>

                                    
                                </div>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr >
                                        <th>No</th>
                                        <th>Car</th>
                                        <th>Company</th>
                                        <th>Car No</th>
                                        <th>Cprice</th>
                                        <th>Location</th>
                                        <th>Purchase Date</th>
                                        <th>Seater</th>
                                        <th>Car_Type</th>
                                        <th>Car_Fuel</th>
                                        <th>Car_Gear</th>
                                        <th>Mileage</th>
                                        <th>Delete</th>
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
