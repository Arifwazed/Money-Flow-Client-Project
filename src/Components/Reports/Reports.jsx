import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  // Fetch all transactions
  useEffect(() => {
    fetch(`http://localhost:3000/transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  // Filter by month
  const filteredTransactions = selectedMonth
    ? transactions.filter((t) => {
        const month = new Date(t.date).getMonth();
        return month === parseInt(selectedMonth);
      })
    : transactions;

  // Totals
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const netBalance = totalIncome - totalExpense;

  // Pie Chart Data
  const pieData = Object.values(
    filteredTransactions.reduce((acc, curr) => {
      if (!acc[curr.category])
        acc[curr.category] = { name: curr.category, value: 0 };
      acc[curr.category].value += parseFloat(curr.amount);
      return acc;
    }, {})
  );

  // Bar Chart Data (Monthly Income vs Expense)
  const barData = Object.values(
    filteredTransactions.reduce((acc, curr) => {
      const m = new Date(curr.date).toLocaleString("default", { month: "short" });
      if (!acc[m]) acc[m] = { month: m, income: 0, expense: 0 };
      if (curr.type === "Income") acc[m].income += parseFloat(curr.amount);
      if (curr.type === "Expense") acc[m].expense += parseFloat(curr.amount);
      return acc;
    }, {})
  );

  const COLORS = [
    "#4ADE80", "#60A5FA", "#F472B6", "#FBBF24", "#34D399",
    "#F87171", "#A78BFA", "#FB923C", "#22D3EE", "#E879F9",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#E0F8F5] to-[#FFE6FD] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Financial Reports & Insights
        </h1>

        {/* Month Filter */}
        <div className="flex justify-center mb-10">
          <select
            className="select select-bordered w-64 text-gray-800"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/50 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Total Income</h2>
            <p className="text-3xl font-bold text-green-500">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-white/50 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Total Expense</h2>
            <p className="text-3xl font-bold text-red-500">${totalExpense.toFixed(2)}</p>
          </div>
          <div className="bg-white/50 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Net Balance</h2>
            <p className={`text-3xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Pie Chart (Responsive Layout) */}
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Category Breakdown
          </h2>
          {pieData.length > 0 ? (
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Pie Chart */}
              <div className="w-full md:w-2/3 h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-2 md:w-1/3">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    <span className="text-gray-700 font-medium">
                      {item.name} — ${item.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No data for this month.</p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
            Monthly Income vs Expense
          </h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#4ADE80" name="Income" />
                <Bar dataKey="expense" fill="#F87171" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No data to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
