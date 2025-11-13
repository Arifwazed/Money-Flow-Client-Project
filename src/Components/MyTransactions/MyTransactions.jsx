import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const MyTransactions = () => {
    const {user} = use(AuthContext);
    const [MyTransactions,setMyTransactions] = useState([])

    useEffect(()=>{
        if(user?.email){
            fetch(`http://localhost:3000/transactions?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log("my bid: ",data)
                setMyTransactions(data)
            })
        }
    },[user])
    return (
        <div>
            <div className='bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5] min-h-screen'>
            <div className='w-11/12 mx-auto py-10 md:py-15 text-center'>
            <h1 className='text-4xl font-bold text-center mb-8'>My Transactions: <span className='text-primary-gradient'>{MyTransactions.length}</span></h1>
            {/* <hr className='border-gray-400'/> */}
            <div className="overflow-x-auto border border-gray-300 rounded-lg">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            {/* <th>Status</th> */}
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            MyTransactions.map((transaction,index) => 
                                <tr key={index}>
                                    <th> {index+1}</th>
                                    <td>
                                     {transaction.type}
                                    <br />
                                    {/* <span className="badge badge-ghost badge-sm">{location}</span> */}
                                    {/* <span className="badge badge-ghost badge-sm">{}</span> */}
                                    </td>
                                    <td>
                                        {/* <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                    src={ user?.photoURL ? user.photoURL : "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                                                    alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{transaction.buyer_name}</div>
                                                <div className="text-sm opacity-50">{transaction.buyer_email}</div>
                                            </div>
                                        </div> */}
                                        {transaction.category}
                                    </td>
                                    <td>$ {transaction.amount}</td>
                                    <td>{transaction.date}</td>
                                    {/* <th>
                                        {transaction.status === 'pending' ? <div className="badge badge-warning font-semibold">{transaction.status}</div> : <div className="badge badge-success font-semibold">{transaction.status}</div>}
                                    </th> */}
                                    <th>
                                        <button 
                                        // onClick={() => {handleRemoveBit(bid._id)}} 
                                        className="btn btn-outline btn-accent btn-sm">Update Transaction</button>
                                    </th>
                                    <th>
                                        <button 
                                        // onClick={() => {handleRemoveBit(bid._id)}} 
                                        className="btn btn-outline btn-secondary btn-sm">Remove Transaction</button>
                                    </th>
                                    <th>
                                        <button 
                                        // onClick={() => {handleRemoveBit(bid._id)}} 
                                        className="btn btn-outline btn-info btn-sm">View Details</button>
                                    </th>
                                </tr>
                            )
                        }
                        
                        </tbody>
                        {/* foot */}
                        
                    </table>
            </div>
            </div>
        </div>
        </div>
    );
};

export default MyTransactions;