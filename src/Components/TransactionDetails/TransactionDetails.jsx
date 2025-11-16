import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";

const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = React.useContext(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const [categorySummary, setCategorySummary] = useState({ total: 0, count: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch single transaction
    fetch(`https://money-flow-server-api.vercel.app/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => setTransaction(data));

    // Fetch all transactions for category summary
    if (user?.email) {
      fetch(`https://money-flow-server-api.vercel.app/transactions?email=${user.email}`)
        .then((res) => res.json())
        .then((allData) => {
          const categoryTransactions = allData.filter(
            (t) => t.category === transaction?.category
          );
          const total = categoryTransactions.reduce(
            (sum, t) => sum + parseFloat(t.amount),
            0
          );
          setCategorySummary({ total, count: categoryTransactions.length });
        });
    }
  }, [id, transaction?.category, user]);

  if (!transaction) return <p className="text-center mt-10">Loading...</p>;

  // Format date
  const formattedDate = new Date(transaction.date).toLocaleDateString();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc] dark:bg-none flex items-center justify-center p-4">
      <div className="bg-white/60 dark:bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc] backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-700">
          Transaction Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Transaction ID:</span>
              <span className="text-gray-800">{transaction._id}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Type:</span>
              <span className="text-gray-800">{transaction.type}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Category:</span>
              <span className="text-gray-800">{transaction.category}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Amount:</span>
              <span className="text-gray-800">${transaction.amount}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Date:</span>
              <span className="text-gray-800">{formattedDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">User Name:</span>
              <span className="text-gray-800">{transaction.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-800">{transaction.email}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="bg-purple-300 p-4 rounded-xl">
              <h2 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><img width="35" height="35" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-text-file-martial-arts-flaticons-lineal-color-flat-icons.png" alt="external-text-file-martial-arts-flaticons-lineal-color-flat-icons"/>Category Summary</h2>
              <p className="dark:text-gray-600">
                <span className="font-semibold">{categorySummary.count}</span>{" "}
                transaction(s) in this category
              </p>
              <p className="dark:text-gray-700">
                Total Amount:{" "}
                <span className="font-semibold">${categorySummary.total.toFixed(2)}</span>
              </p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl">
              <h2 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                <img width="35" height="35" src="https://img.icons8.com/external-others-iconmarket/64/external-notes-essential-others-iconmarket-4.png" alt="external-notes-essential-others-iconmarket-4"/>
                Description / Notes</h2>
              <p className="text-gray-800">{transaction.description || "No notes provided."}</p>
            </div>
          </div>
        </div>

        <button
          className="mt-8 btn btn-primary w-full"
          onClick={() => navigate(-1)}
        >
          Back to Transactions
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
