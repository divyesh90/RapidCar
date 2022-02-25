// import { render } from '@testing-library/react';
// import React from 'react'
// import ReactToPrint from 'react-to-print';
import MyBooking from './MyBooking'
import './ExportPdfComponent.css'
import React from "react";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
const doc = new jsPDF();
const Invoice = <h1>fgfdgdf</h1>;



export default function ExportPdfComponent() {
    //     render(){
    //         return (
    //           <div>

    //              <h1>Export HTMl Table in PDF File</h1> 

    //             < MyBooking ref={(response) => (this.componentRef = response)} />

    //             <ReactToPrint
    //               content={() =><h1>helloo</h1>}
    //               trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
    //             />
    //           </div>
    //         );
    // }

    const save = () => {
        doc.html(ReactDOMServer.renderToStaticMarkup(Invoice), {
            callback: () => {
                doc.save("myDocument.pdf");
            }
        });


    }

    return (
        <div>

            
            {Invoice}
            <button onClick={save}>save</button>
        </div>
    );


}
