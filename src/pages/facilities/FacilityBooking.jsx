import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FacilityBooking() {
    const [facilities, setFacilities] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [bookings, setBookings] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await fetch("http://192.168.46.5:8000/facility/all");
            const data = await response.json();
            setFacilities(data);
        } catch (error) {
            console.error("Error fetching facilities:", error);
        }
    };

    const fetchBookings = async () => {
        if (!selectedDate) return;
        try {
            const response = await fetch("http://192.168.46.5:8000/facility/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ date: selectedDate }),
            });
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const bookFacility = async () => {
        if (!selectedFacility || !selectedDate || !fromTime || !toTime) {
            alert("Please fill in all fields.");
            return;
        }
        
        try {
            const dataSending = {
                "facility": selectedFacility,
                "date": selectedDate,
                "fromTime" : fromTime,
                "toTime" : toTime,
            };
            console.log(dataSending);
            const response = await fetch("http://192.168.46.5:8000/facility/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access_token" : "eyJhbGciOiJIUzI1NiIsImtpZCI6IjBYeXpjSm1ZYTVmRVhBSTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3BtcGxvZXZ4c3FlbHZ3bXJ3aGZwLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5ZGE1OTg1OS1mMjdlLTQ4MjMtODljNC1kMmNlMmQ5OTFmYzciLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQwMjg1NjYwLCJpYXQiOjE3NDAyODIwNjAsImVtYWlsIjoieWFzaGRldmVsb3BlcjIyNkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoieWFzaGRldmVsb3BlcjIyNkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI5ZGE1OTg1OS1mMjdlLTQ4MjMtODljNC1kMmNlMmQ5OTFmYzcifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc0MDI4MjA2MH1dLCJzZXNzaW9uX2lkIjoiYWUwMjk2NDEtOTgxYi00ZGJjLTk4OGMtN2M0ZjNlMjdlN2E5IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.S0Q036L1JfO1KtoxR3kU234DWoBI66UT_PVSxJ6cqQc"
                },
                body: JSON.stringify(dataSending),
            });
            
            if (!response.ok) {
                throw new Error("Slot is already booked or an error occurred.");
            }
            
            alert("Facility booked successfully!");
            fetchBookings();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mt d-flex col">
            <h1 className="text-center mb-4">Facility Booking</h1>
            
            <div className="mb-3">
                <label className="form-label">Select Date:</label>
                <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    onBlur={fetchBookings}
                />
            </div>
            
            <h2>Available Facilities</h2>
            <ul className="list-group mb-4">
                {facilities.map((facility) => (
                    <li key={facility.id} className="list-group-item">
                        {facility.facilitiy}
                    </li>
                ))}
            </ul>

            <h2>Booked Slots on {selectedDate || "(Select a date)"}</h2>
            <ul className="list-group mb-4">
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <li key={index} className="list-group-item">
                            {booking.facility} - {booking.fromTime} to {booking.toTime}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No bookings found</li>
                )}
            </ul>

            <h2>Book a Facility</h2>
            <div className="mb-3">
                <label className="form-label">Select Facility:</label>
                <select
                    className="form-select"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                >
                    <option value="">Select a facility</option>
                    {facilities.map((facility) => (
                        <option key={facility.id} value={facility.facilitiy}>{facility.facilitiy}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">From Time:</label>
                <input
                    type="time"
                    className="form-control"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">To Time:</label>
                <input
                    type="time"
                    className="form-control"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={bookFacility}>Book Facility</button>
        </div>
    );
}