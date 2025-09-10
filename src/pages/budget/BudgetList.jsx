import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap Import

const API_URL = 'http://192.168.46.5:8000/billing/all'; // Adjust base URL if needed

const BudgetList = () => {
    const [budgets, setBudgets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setBudgets(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching budgets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBudgets();
    }, []);

    return (
        <div className="container mt-4">
            <div className="card shadow-lg p-4 rounded-3">
                <h2 className="text-center fw-bold text-primary mb-3">Yearly Budgets</h2>

                {/* Error Message */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Loading Spinner */}
                {loading && (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {/* Budget List Table */}
                {!loading && budgets.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center">
                            <thead className="table-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Total Budget ($)</th>
                                    <th>Available Fund ($)</th>
                                    <th>Funds Spent ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgets.map((budget, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="fw-semibold">{budget.name}</td>
                                        <td>{budget.categorie}</td>
                                        <td>{budget.totalBudget}</td>
                                        <td>{budget.availableFund}</td>
                                        <td>{budget.fundSpent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && <p className="text-center text-muted">No budgets found.</p>
                )}
            </div>
        </div>
    );
};

export default BudgetList;
