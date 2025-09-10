import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://192.168.46.5:8000/billing/expenses";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded-3 bg-light">
        <h4 className="text-center fw-bold text-primary mb-3">
          💰 Expense List
        </h4>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {/* Expense List */}
        {expenses.length === 0 ? (
          <p className="text-center text-muted">No expenses recorded.</p>
        ) : (
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {expenses.map((expense, index) => (
              <div
                key={index}
                className="card shadow-sm border-0 rounded-3 d-flex flex-row align-items-center"
                style={{ width: "550px", maxHeight: "120px", overflow: "hidden" }}
              >
                {/* Image Proof */}
                {expense.proofUrl && (
                  <img
                    src={expense.proofUrl}
                    alt="Expense Proof"
                    className="img-fluid rounded-start"
                    style={{
                      width: "120px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}

                <div className="card-body p-3">
                  <h6 className="card-title fw-bold text-primary mb-1">
                    {expense.name}
                  </h6>
                  <p className="text-muted mb-1">
                    <span className="badge bg-secondary">{expense.categorie}</span>
                  </p>
                  <p className="mb-1 text-dark">
                    <strong>₹{expense.amount}</strong> | {expense.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
