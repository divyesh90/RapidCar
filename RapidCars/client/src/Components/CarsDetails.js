import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./CarsDetails.css";
export default function CarsDetails() {
  const history = useHistory();
  const [cardetails, setData] = React.useState(null);
  const [cars, setcar] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/cars")
      .then((res) => {
        setcar(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);

  if (!cardetails) return null;
  const booking_car_sort = (isbook) => {
    console.log("in booking" + isbook);
    if (isbook == true) {
      var el = document.getElementById("reserve");
      el.style.color = "white";
      el.style.background = "#299be4";
    } else {
      var el = document.getElementById("reserve");
      el.style.color = "#299be4";
      el.style.background = "#f5f5f5";
    }
    if (isbook == false) {
      var el = document.getElementById("unreserve");
      el.style.color = "white";
      el.style.background = "#299be4";
    } else {
      var el = document.getElementById("unreserve");
      el.style.color = "#299be4";
      el.style.background = "#f5f5f5";
    }
    if (isbook == "all") {
      setcar(cardetails);
      var el = document.getElementById("all");
      el.style.color = "white";
      el.style.background = "#299be4";
    } else {
      setcar(
        cardetails.filter((val) => {
          return val.IsBook === isbook;
        })
      );
      var el = document.getElementById("all");
      el.style.color = "#299be4";
      el.style.background = "#f5f5f5";
    }
  };

  function RemoveCar(carid) {
    axios
      .delete("http://localhost:8000/api/removecar/" + carid)
      .then((res) => {
        setcar(
          cardetails.filter((val) => {
            return val._id != res.data.carid;
          })
        );
      })
      .catch((err) => {
        console.log("Something Went Wrong");
      });
  }
  function rendercar() {
    var num = 0;
    return cars.map((car) => {
      num++;
      var path = "http://localhost:8000/uploads/" + car.cimage;
      var row_id = "row" + car._id;
      var pdate = new Date(car.cpurchase);
      var PurchaseDate =
        pdate.getDate() + "/" + pdate.getMonth() + "/" + pdate.getFullYear();

      if (car.IsBook == false) {
        var html = (
          <a
            className="delete"
            title="Delete"
            data-toggle="tooltip"
            onClick={() => {
              const confirmBox = window.confirm(
                "Do you really want to Remove!  " + car.cname
              );
              if (confirmBox === true) {
                RemoveCar(car._id);
              }
            }}
          >
            <i class="fa fa-trash"></i>
          </a>
        );
      }

      return (
        <>
          <tr>
            <td>{num}</td>
            <td>
              <a>
                <img src={path} className="avatar" alt="photo" /> {car.cname}
              </a>
            </td>
            <td>{car.company}</td>
            <td>
              <span className="status text-success"></span>
              {car.carno}
            </td>
            <td>
              <span className="status text-success"></span>
              {car.cprice}
            </td>
            <td>
              <span className="status text-success"></span>
              {car.location}
            </td>
            <td>
              <span className="status text-success"></span>
              {PurchaseDate}
            </td>
            <td>
              <span className="status text-success"></span>
              {car.seat}
            </td>
            <td>
              <span className="status text-success"></span>
              {car.cartype}
            </td>
            <td>
              <span className="status text-success"></span>
              {car.fuel}
            </td>
            <td>
              <span className="status text-success"></span>
              {car.gear_type}
            </td>
            <td>
              <span className="status text-success"></span>
              {car.mileage}
            </td>
          </tr>
        </>
      );
    });
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="p_main">
        <div className="container">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="column">
                    <h2>
                      Car <b>Details</b>
                    </h2>
                  </div>
                  <div className="column">
                    <div class="list_button">
                      <div class="button">
                        {" "}
                        <button
                          id="reserve"
                          onClick={() => booking_car_sort(true)}
                        >
                          Reserved
                        </button>
                      </div>
                      <div class="button">
                        {" "}
                        <button
                          id="unreserve"
                          onClick={() => booking_car_sort(false)}
                        >
                          Unreserved
                        </button>
                      </div>
                      <div class="button">
                        {" "}
                        <button
                          id="all"
                          onClick={() => booking_car_sort("all")}
                        >
                          All Car
                        </button>
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
                    <th>Purchase Date</th>
                    <th>Seater</th>
                    <th>Car_Type</th>
                    <th>Car_Fuel</th>
                    <th>Car_Gear</th>
                    <th>Mileage</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{rendercar()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
