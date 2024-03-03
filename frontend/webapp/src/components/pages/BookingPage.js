import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Data } from '../data/data';

export default function BookingPage() {
    let {id} = useParams();
    console.log(id);    
    return (
        <div>
        <h1>Booking Page</h1>
        <h1>{id}</h1>
        <h2> {Data[id].facility}</h2>
        </div>
    );
}