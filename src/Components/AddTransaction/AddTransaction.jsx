import React, { use, useState } from 'react';
import { Link } from 'react-router';
import "cally"
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const AddTransaction = () => {
    const {user} = use(AuthContext)
    // console.log(user)
    const [type, setType] = useState("");

    const handleAddTransaction = (e) =>  {
        e.preventDefault();
        const type = e.target.type.value;
        const category = e.target.category.value;
        const amount = e.target.amount.value;
        const description = e.target.description.value;
        const date = e.target.date.value;
        const email = user.email;
        const name = user.displayName;
        console.log({type: type,category: category,amount: amount,description: description,date: date,name: name,email: email})
        const newTransaction = {
            type: type,
            category: category,
            amount: amount,
            description: description,
            date: date,
            name: user.displayName,
            email: user.email,
        }
        fetch('http://localhost:3000/transactions',{
            method: "POST",
            headers:  {'content-type' : 'application/json'},
            body: JSON.stringify(newTransaction)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Your Transaction has been added.",
                    showConfirmButton: false,
                    timer: 1500
                });
                
            }
        })

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
                                {/* <label className="label">Type</label> */}
                                {/* <select
                                    name="type"
                                    // value={type}
                                    // onChange={(e) => setType(e.target.value)}
                                    // className={`select w-full ${
                                    // type === "" ? "text-gray-400" : "text-gray-800"
                                    // }`}
                                >
                                    <option value="" disabled>
                                    Select a type
                                    </option>
                                    <option value="Income" className="text-gray-800">Income</option>
                                    <option value="Expense" className="text-gray-800">Expense</option>
                                </select> */}
                                <label className="label">Type</label> 
                                <select defaultValue="Select a type" className="select w-full" name="type"> 
                                    <option disabled={true}>Select a type</option> 
                                    <option >Income</option> 
                                    <option >Expense</option> 
                                </select>
                                {/* Category */}
                                <label className="label">Category</label>
                                <select defaultValue="Select Category" className="select w-full" name="category">
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
                                    type="text" 
                                    className="input w-full" 
                                    placeholder="Enter amount" 
                                    name="amount" 
                                    required
                                />
                                {/* Description  */}
                                <label className="label">Description</label>
                                <textarea name="description" className="textarea w-full" placeholder="Enter Description"></textarea>
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
                                    value={user.email}
                                    readOnly
                                />
                                {/* Name */}
                                <label className="label">User Name</label>
                                <input
                                    type="text"
                                    className="input w-full"
                                    name="name"
                                    value={user.displayName}
                                    readOnly
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