
import React from 'react'
import './sidebar.css'
export default function Sidebar() {

    function sidebar_open() {
        document.getElementById("booking_main").style.marginLeft = "25%";
        document.getElementById("mySidebar").style.width = "25%";
        document.getElementById("mySidebar").style.display = "block";
    }

    function sidebar_close() {
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("openNav").style.display = "inline-block";
    }

    return (
        <div>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
            <button id='openSidebar' onClick={() => sidebar_open()}><i class="fa fa-bars"></i></button>
                <div className='sidebar'   id='mySidebar'>
                <h1>helo</h1>
                <h1>helo </h1>
                <h1>helo </h1>
                <h1>helo </h1>
           </div>
        </div>
    )
}
