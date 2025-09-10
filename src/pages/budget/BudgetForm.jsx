import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap Import

const API_URL = 'http://192.168.46.5:8000/billing/add'; // Adjust base URL if needed

const categoryOptions = {
    event: ['Rmageddon', 'Hackfusion'],
    club: ['RNXG', 'FSDC', 'SWAG'],
    department: ['CSE', 'IT'],
    mess: ['mess']
};













const BudgetForm = () => {
    const navigate = useNavigate();
    const [budget, setBudget] = useState({
        categorie: '',
        name: '',
        totalBudget: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setBudget({ ...budget, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'access_token': localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...budget, totalBudget: parseInt(budget.totalBudget) })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert("Budget added");
            navigate('/faculty');
            const data = await response.json();
            console.log('Budget added:', data);
        } catch (error) {
            setError(error.message);
            console.error('Error adding budget:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6">
                <div className="card shadow-lg p-4 rounded-3">
                    <h2 className="text-center fw-bold text-dark mb-3">Budget Allocation</h2>

                    {/* Error Message */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        {/* Category */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold text-dark">Category</label>
                            <select name="categorie" value={budget.categorie} onChange={handleChange} required className="form-select">
                                <option value="">Select a category</option>
                                <option value="event">Event</option>
                                <option value="club">Club</option>
                                <option value="department">Department</option>
                                <option value="mess">Mess</option>
                            </select>
                        </div>

                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold text-dark">Name</label>
                            <select name="name" value={budget.name} onChange={handleChange} required disabled={!budget.categorie} className="form-select">
                                <option value="">Select a name</option>
                                {budget.categorie && categoryOptions[budget.categorie].map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Total Budget */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold text-dark">Total Budget</label>
                            <input type="number" name="totalBudget" value={budget.totalBudget} onChange={handleChange} required className="form-control" placeholder="Enter budget amount" />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary w-100">
                            Submit Budget
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BudgetForm;