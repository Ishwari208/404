import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = 'http://192.168.46.5:8000/billing/expense';

const categoryOptions = {
    event: ['Rmageddon', 'Hackfusion'],
    club: ['RNXG', 'FSDC', 'SWAG'],
    department: ['CSE', 'IT'],
    mess: ['mess']
};

const ExpenseForm = () => {
    const navigate = useNavigate();
    const [expense, setExpense] = useState({
        categorie: '',
        name: '',
        amount: '',
        reason: '',
        file: null
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };

    const handleFileChange = (e) => {
        setExpense({ ...expense, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const userData = {
            'categorie' : expense.categorie,
            "name" : expense.name,
            "amount" : expense.amount,
            "reason" : expense.reason
        }
        formData.append('expense', JSON.stringify(userData));
        formData.append('file', expense.file);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    "access_token" : localStorage.getItem('access_token')
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert("Successfully uploaded!");
            navigate('/faculty');
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setError(error.message);
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
                <h4 className="text-center text-primary fw-bold">💰 Add Expense</h4>

                {error && <div className="alert alert-danger text-center">{error}</div>}
                {message && <div className="alert alert-success text-center">{message}</div>}

                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                        <label className="form-label fw-semibold">Category</label>
                        <select className="form-select" name="categorie" value={expense.categorie} onChange={handleChange} required>
                            <option value="">Select a category</option>
                            {Object.keys(categoryOptions).map((cat, index) => (
                                <option key={index} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Name</label>
                        <select className="form-select" name="name" value={expense.name} onChange={handleChange} required disabled={!expense.categorie}>
                            <option value="">Select a name</option>
                            {expense.categorie && categoryOptions[expense.categorie].map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Amount (₹)</label>
                        <input type="number" className="form-control" name="amount" value={expense.amount} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Reason</label>
                        <input type="text" className="form-control" name="reason" value={expense.reason} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <label className="form-label fw-semibold">Upload Proof</label>
                        <input type="file" className="form-control" name="file" onChange={handleFileChange} required />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary btn-lg w-100">Submit Expense</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseForm;
