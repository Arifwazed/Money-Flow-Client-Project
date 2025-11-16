import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const Overview = () => {
    const { user } = use(AuthContext);
    const [transactions, setTransactions] = useState([]);
    // Fetch all transactions
      useEffect(() => {
        fetch(`https://money-flow-server-api.vercel.app/transactions`)
          .then((res) => res.json())
          .then((data) => setTransactions(data));
      }, []);
      console.log("from overview:",transactions)
      let totalIncome = 0;
      let totalExpense = 0;
      transactions.forEach( t => {
        const amount = Number(t.amount);
        if(t.type === "Income"){
            totalIncome = totalIncome + amount; 
        }
        else if(t.type === "Expense"){
            totalExpense = totalExpense  + amount;
        }
      })
      let netBalance = totalIncome - totalExpense;

    return (
        <div>
            <div className='w-11/12 mx-auto  py-5 md:p-10'>
                <h2 className="text-4xl font-semibold text-center">
                    <span className='text-primary-gradient'>
                        Financial Overview
                    </span>
                </h2>
                <p className='text-xl font-semibold text-gray-500 dark:text-gray-300 mt-2 text-center mb-6'>Track where your money comes from—and where it goes.</p>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc] dark:bg-none   border border-white/10  dark:border-white/70 p-6 rounded-2xl text-center shadow-md">
                    <div className="flex items-center gap-3 justify-center">
                    <h2 className="text-xl font-semibold text-gray-600 dark:text-white mb-2">Total Income </h2>
                    <img width="22" height="25" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/40C057/external-arrow-up-increase-and-decrease-tanah-basah-glyph-tanah-basah.png" alt="external-arrow-up-increase-and-decrease-tanah-basah-glyph-tanah-basah"/>
                    </div>
                    <p className="text-3xl font-bold text-green-500">${user ? totalIncome.toFixed(2) : 0}</p>
                </div>
                <div className="bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc] dark:bg-none   border border-white/10  dark:border-white/70 p-6 rounded-2xl text-center shadow-md">
                    <div className="flex items-center gap-3 justify-center">
                    <h2 className="text-xl font-semibold text-gray-600 dark:text-white mb-2">Total Expense</h2>
                    <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/FA5252/thick-arrow-pointing-down.png" alt="thick-arrow-pointing-down"/>

                    </div>
                    <p className="text-3xl font-bold text-red-500">${user ? totalExpense.toFixed(2): 0}</p>
                </div>
                <div className="bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc] dark:bg-none   border border-white/10  dark:border-white/70 p-6 rounded-2xl text-center shadow-md">
                    <div className="flex items-center gap-3 justify-center">
                    <h2 className="text-xl font-semibold text-gray-600 dark:text-white mb-2">Net Balance</h2>
                    <img width="28" height="28" src="https://img.icons8.com/external-others-iconmarket/64/external-arrow-arrows-line-others-iconmarket-39.png" alt="external-arrow-arrows-line-others-iconmarket-39"/>
                    </div>
                    <p className={`text-3xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                    ${user ? netBalance.toFixed(2): 0}
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;