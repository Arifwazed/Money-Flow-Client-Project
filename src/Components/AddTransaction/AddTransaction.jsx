import React, { use, useEffect, useState } from 'react';
import bg from '../../assets/4452.jpg'
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import LoadingSpin from '../Loading/LoadingSpin';

const AddTransaction = () => {
    const {user} = use(AuthContext)
    // console.log(user)
    const [typeOption, setTypeOption] = useState("");
    const [categoryOption,setCategoryOption] = useState([]);
    const categories = {
        Income: ["Salary","Freelancing / Side Hustle","Business Profit","Investments","Rental Income" ,"Interest Income", "Refunds / Cashbacks", "Scholarship / Stipend", "Gifts & Rewards"],
        Expense: [
        "Food & Groceries",
        "Rent / Housing",
        "Utilities",
        "Transportation",
        "Education",
        "Health & Fitness",
        "Shopping & Clothing",
        "Entertainment",
        "Travel & Vacation",
        "Insurance & Savings",
        "Personal Care",
        "Pets & Hobbies",
        ]
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = bg;

        img.onload = () => {
            setLoading(false);
        };
    }, []);

    if (loading) {
        return (
            <LoadingSpin></LoadingSpin>
        );
    }
    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setTypeOption(selectedType);
        setCategoryOption(categories[selectedType] || []);
    }

    const handleAddTransaction = (e) =>  {
        e.preventDefault();
        const type = e.target.type.value;
        const category = e.target.category.value;
        const amount = parseInt(e.target.amount.value);
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
        fetch('https://money-flow-server-api.vercel.app/transactions',{
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
                e.target.reset();
                setTypeOption("");
                setCategoryOption([]);
            }
        })

    }
    return (
        <div>
            {/* <div>
                <img src={bg} className='min-h-screen' alt="" />
            </div> */}
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1)), url(${bg})`,
                }}>
                <div className="card w-full max-w-sm md:max-w-lg shadow-2xl bg-white/30 backdrop-blur-md border border-white/20">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center text-primary-gradient">Add Transaction</h1>
                        <form onSubmit={handleAddTransaction}>
                            <fieldset className="fieldset">
                                {/* Type */}
                                <label className="label">Type</label> 
                                <select name="type" defaultValue="" className="select w-full bg-white/50 backdrop-blur-sm border-none" onChange={handleTypeChange}> 
                                    <option value="" disabled>Select a type</option> 
                                    <option value="Income">Income</option> 
                                    <option value="Expense">Expense</option> 
                                </select>
                                {/* Category */}
                                <label className="label">Category</label>
                                <select name="category" defaultValue="" className="select w-full bg-white/50 backdrop-blur-sm border-none"  disabled={!typeOption} required>
                                    <option value="" disabled>{typeOption ? "Select Category" : "Select type first"}</option>
                                    {
                                        categoryOption.map((option,index)=>(
                                            <option key={index}>{option}</option>
                                        ))
                                    }
                                </select>
                                {/* Amount  */}
                                <label className="label">Amount</label>
                                <input 
                                    type="text" 
                                    className="input w-full bg-white/50 backdrop-blur-sm border-none" 
                                    placeholder="Enter amount" 
                                    name="amount" 
                                    required
                                />
                                {/* Description  */}
                                <label className="label">Description</label>
                                <textarea name="description" className="textarea w-full bg-white/50 backdrop-blur-sm border-none" placeholder="Enter Description"></textarea>
                                {/* Date */}
                                <label className="label">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    className="input w-full bg-white/50 backdrop-blur-sm border-none"
                                    required
                                />
                                {/* Email */}
                                <label className="label">User Email</label>
                                <input 
                                    type="email" 
                                    className="input w-full bg-white/50 backdrop-blur-sm border-none" 
                                    placeholder="Email" 
                                    name="email" 
                                    value={user.email}
                                    readOnly
                                />
                                {/* Name */}
                                <label className="label">User Name</label>
                                <input
                                    type="text"
                                    className="input w-full bg-white/50 backdrop-blur-sm border-none"
                                    name="name"
                                    value={user.displayName}
                                    readOnly
                                />
                                <button className="btn btn-primary-custom mt-4 flex items-center justify-center gap-2"><img width="25" height="25" src="https://img.icons8.com/sf-black/64/plus-math.png" alt="plus-math"/>Add Transaction</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AddTransaction;