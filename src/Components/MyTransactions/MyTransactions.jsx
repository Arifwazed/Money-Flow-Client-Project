import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const MyTransactions = () => {
    const { user } = use(AuthContext);
    const [MyTransactions, setMyTransactions] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const bidModalRef = useRef(null);
    const navigate = useNavigate();
    const [typeOption, setTypeOption] = useState("");
    const [categoryOption, setCategoryOption] = useState([]);
    const [sort,setSort] = useState('Sort By Date')

    const categories = {
        Income: [
            "Salary",
            "Freelancing / Side Hustle",
            "Business Profit",
            "Investments",
            "Rental Income",
            "Interest Income",
            "Refunds / Cashbacks",
            "Scholarship / Stipend",
            "Gifts & Rewards"
        ],
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

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setTypeOption(selectedType);
        setCategoryOption(categories[selectedType] || []);
    };

    useEffect(() => {
        if (user?.email) {
            fetch(`https://money-flow-server-api.vercel.app/transactions?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log("my transaction: ", data);
                    setMyTransactions(data);
                });
        }
    }, [user]);

    const handleBidModalOpen = (id) => {
        fetch(`https://money-flow-server-api.vercel.app/transactions/${id}`)
            .then(res => res.json())
            .then(data => {
                setCategoryOption(categories[data.type]);
                setSelectedData(data);
                // console.log("my selected transaction: ", data);
            });
            bidModalRef.current.showModal();
        };
        console.log("my selected categoryOption: ", categoryOption);
        console.log("my selected selectedData: ", selectedData);

    const handleUpdateTransaction = (e, id) => {
        e.preventDefault();
        const type = e.target.type.value;
        const category = e.target.category.value;
        const amount = parseInt(e.target.amount.value);
        const description = e.target.description.value;
        const date = e.target.date.value;

        const newTransaction = {
            type,
            category,
            amount,
            description,
            date,
        };

        console.log("update data: ", newTransaction);

        fetch(`https://money-flow-server-api.vercel.app/transactions/${id}`, {
            method: "PATCH",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newTransaction)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: "Your Transaction has been updated.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    bidModalRef.current.close();
                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                }
            });
    };

    const handleRemoveTransaction = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://money-flow-server-api.vercel.app/transactions/${id}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(data => {
                        console.log("after delete transaction:", data);
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Transaction has been deleted.",
                                icon: "success"
                            });
                            const remainingTransaction = MyTransactions.filter(bid => bid._id !== id);
                            setMyTransactions(remainingTransaction);
                        }
                    });
            }
        });
    };

    useEffect(()=>{
        
        let sorted = [...MyTransactions];

        if(sort === 'Sort By Date'){
            sorted.sort((a,b) => b.date.localeCompare(a.date));
        }
        else{
            sorted.sort((a,b) => Number(b.amount) - Number(a.amount));
            // setMyTransactions(newSort)
        }
        setMyTransactions(sorted)
    },[sort]);

    const handleSort = (type) =>{
        if(type === 'date'){
            setSort('Sort By Date')
        }
        else{
            setSort('Sort By Amount')
        }
    }


    return (
        <div>
            <div className='bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc] dark:bg-none min-h-screen'>
                <div className='w-11/12 mx-auto py-10 md:py-15 text-center'>
                    <h1 className='text-4xl font-bold text-center mb-8 '>
                        <span className='text-primary-gradient'>My Transactions:</span> <span className='text-gray-700 dark:text-[#2D5DA9]'>{MyTransactions.length}</span>
                    </h1>

                    <div className='flex justify-end '>
                        <div className="dropdown dropdown-bottom dropdown-end mb-5 ">
                            <div tabIndex={0} role="button" className="btn m-1 font-semibold btn-login border-none shadow-none">{sort} <img width="18" height="18" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/expand-arrow.png" alt="expand-arrow" className='mt-1'/></div>
                            <ul tabIndex="-1" className="dropdown-content menu font-semibold btn-login rounded-box z-1 w-52 p-2 shadow-sm">
                                <li onClick={()=>handleSort('date')}><a>Sort By Date</a></li>
                                <li onClick={()=>handleSort('amount')}><a>Sort By Amount</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="overflow-x-auto border border-[#2D5DA9] rounded-lg dark:text-gray-300">
                        <table className="table">
                            <thead>
                                <tr className='font-bold text-black dark:text-white'>
                                    <th>SL No</th>
                                    <th>
                                        <div className='flex gap-2'>
                                            <img width="23" height="23" src="https://img.icons8.com/fluency/48/document-in-folder--v1.png" alt="document-in-folder--v1"/>Type
                                        </div>
                                    </th>
                                    <th>
                                        <div className='flex gap-2'>
                                            <img width="23" height="23" src="https://img.icons8.com/nolan/64/sorting-answers.png" alt="sorting-answers"/>Category
                                        </div>
                                    </th>
                                    <th>
                                        <div className='flex gap-2'>
                                            <img width="23" height="23" src="https://img.icons8.com/doodle/48/money.png" alt="money"/>Amount
                                        </div>
                                    </th>       
                                    <th >
                                        <div className='flex gap-2'>
                                            <img width="23" height="23" src="https://img.icons8.com/color/48/pay-date.png" alt="pay-date"/>Date
                                        </div>
                                    </th>
                                    <th className='text-center' colSpan={3}>
                                        <div className='flex gap-2 justify-center'>
                                            <img width="23" height="23" src="https://img.icons8.com/nolan/64/apple-settings.png" alt="apple-settings"/>Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {MyTransactions.map((transaction, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{transaction.type}</td>
                                        <td>{transaction.category}</td>
                                        <td>$ {transaction.amount}</td>
                                        <td>{transaction.date}</td>
                                        <th>
                                            <button
                                                onClick={() => handleBidModalOpen(transaction._id)}
                                                className="btn btn-accent btn-sm"
                                            >
                                                Update Transaction
                                            </button>
                                        </th>
                                        <th>
                                            <button
                                                onClick={() => handleRemoveTransaction(transaction._id)}
                                                className="btn  btn-secondary btn-sm"
                                            >
                                                Remove Transaction
                                            </button>
                                        </th>
                                        <th>
                                            <Link
                                                to={`/transaction/${transaction._id}`}
                                                className="btn btn-info btn-sm"
                                            >
                                                View Details
                                            </Link>
                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Modify Transaction Record</h3>
                    <p className="py-3 text-gray-600 dark:text-gray-400">Ensure all details are accurate before saving your changes.</p>
                    <form onSubmit={(e) => handleUpdateTransaction(e, selectedData._id)}>
                        <fieldset className="fieldset">
                            <label className="label">Type</label>
                            <select
                                name="type"
                                // defaultValue={selectedData.type}
                                value={typeOption || selectedData.type || ""}
                                className="select w-full"
                                onChange={handleTypeChange}
                            >
                                <option value="" disabled>Select a type</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>

                            <label className="label">Category</label>
                            <select
                                name="category"
                                // defaultValue={selectedData.category}
                                value={selectedData.category || ""}
                                className="select w-full"
                                onChange={(e) =>
                                    setSelectedData({ ...selectedData, category: e.target.value })
                                }
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {categoryOption.map((option, index) => (
                                    <option key={index}>{option}</option>
                                ))}
                            </select>

                            <label className="label">Amount</label>
                            <input
                                type="text"
                                defaultValue={selectedData.amount}
                                className="input w-full"
                                placeholder="Enter amount"
                                name="amount"
                                required
                            />

                            <label className="label">Description</label>
                            <textarea
                                name="description"
                                defaultValue={selectedData.description}
                                className="textarea w-full"
                                placeholder="Enter Description"
                            />

                            <label className="label">Date</label>
                            <input
                                type="date"
                                defaultValue={selectedData.date}
                                name="date"
                                className="input w-full"
                                required
                            />

                            <button className="btn btn-info mt-4">Update Transaction</button>
                        </fieldset>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyTransactions;
