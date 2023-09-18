import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import './CarsDetails.css'
export default function BookingCars() {

    const history = useHistory();
    const [booking, setbooking] = React.useState(null);
    const [bookingcar, setData] = React.useState(null);

    React.useEffect(() => {

        axios.post("http://localhost:8000/api/systembookingdata")
            .then(res => {
                setbooking(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log("Something went wrong");
            })
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

    function BookingComplete(carid) {
        axios.put("http://localhost:8000/api/bookingcomplete/" + carid)
            .then(res => {
                console.log(res.data)
                console.log(bookingcar)
            })
            .catch(err => {
                console.log(err.data);
            })
    }

    if (!bookingcar) return null;
    function rendercar() {
        var num = 0;
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
                </>
            )
        })
    }
    return (
        <div>
            <div className="p_main">
                <div className="container">
                    <div className="table-responsive">
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