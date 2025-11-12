import React, { useState } from 'react';
import { Link } from 'react-router';
import "cally"

const AddTransaction = () => {
    const [type, setType] = useState("");
    const handleAddTransaction = () =>  {
        
    }
    return (
        <div>
            
            <div>
                <div className="hero min-h-screen bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5]">
                <div className="card bg-base-100 w-full max-w-sm md:max-w-lg shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center">Add Transaction</h1>
                        <form onSubmit={handleAddTransaction}>
                            <fieldset className="fieldset">
                                {/* Type */}
                                <label className="label">Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className={`select w-full ${
                                    type === "" ? "text-gray-400" : "text-gray-800"
                                    }`}
                                >
                                    <option value="" disabled>
                                    Select a type
                                    </option>
                                    <option value="Income" className="text-gray-800">Income</option>
                                    <option value="Expense" className="text-gray-800">Expense</option>
                                </select>
                                {/* Category */}
                                <label className="label">Category</label>
                                <select defaultValue="Select Category" className="select w-full">
                                    <option disabled={true}>Select Category</option>
                                    <option>Food & Groceries</option>
                                    <option>Rent / Housing</option>
                                    <option>Utilities</option>
                                    <option>Transportation</option>
                                    <option>Education</option>
                                    <option>Health & Fitness</option>
                                    <option>Shopping & Clothing</option>
                                    <option>Entertainment</option>
                                    <option>Travel & Vacation</option>
                                    <option>Insurance & Savings</option>
                                    <option>Personal Care</option>
                                    <option>Pets & Hobbies</option>
                                </select>
                                {/* Amount  */}
                                <label className="label">Amount</label>
                                <input 
                                    type="number" 
                                    className="input w-full" 
                                    placeholder="Enter amount" 
                                    name="amount" 
                                    required
                                />
                                {/* Description  */}
                                <label className="label">Description</label>
                                <textarea className="textarea w-full" placeholder="Enter Description"></textarea>
                                {/* Date */}
                                <label className="label">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="input w-full"
                                />
                                {/* Email */}
                                <label className="label">User Email</label>
                                <input 
                                    type="email" 
                                    className="input w-full" 
                                    placeholder="Email" 
                                    name="email" 
                                    required
                                />
                                {/* Name */}
                                <label className="label">User Name</label>
                                <input
                                    type="text"
                                    className="input w-full"
                                    placeholder="Enter your name"
                                    name="name"
                                    required
                                />
                                <button className="btn btn-primary-custom mt-4"><img width="25" height="25" src="https://img.icons8.com/sf-black/64/plus-math.png" alt="plus-math"/>Add Transaction</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default AddTransaction;