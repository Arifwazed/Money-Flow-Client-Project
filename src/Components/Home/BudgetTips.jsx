import React from 'react';

const BudgetTips = () => {
    return (
        <div className='w-11/12 mx-auto border'>
            <h2 className="text-4xl font-semibold text-gray-800  text-center">Budget Tips</h2>
            <p className='text-center mb-4'>Turn your paycheck into progress with easy, practical money habits</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex items-center gap-5 border border-blue-400 rounded-xl shadow-sm p-4'>
                <img width="86" height="86" src="https://img.icons8.com/3d-fluency/86/money-transfer.png" alt="money-transfer"/>
                <div>
                    <h1 className='text-xl font-semibold'>Know Where Your Money Goes</h1>
                    <p>Keep track of every expense — from your morning coffee to monthly bills. Small purchases often go unnoticed, but they can add up quickly. By monitoring your spending, you’ll see where you can cut back and where your money truly matters.</p>
                </div>
                </div>
                <div className='flex items-center gap-5 border border-blue-400 rounded-xl shadow-sm p-4'>
                    <img width="94" height="94" src="https://img.icons8.com/nolan/64/installment-plan.png" alt="installment-plan"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Set a Realistic Monthly Budget</h1>
                        <p>A good budget isn’t about restriction — it’s about clarity. Decide how much to allocate for essentials like rent, food, and utilities, then set aside a portion for savings and personal enjoyment. The goal is balance, not perfection.</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 border border-blue-400 rounded-xl shadow-sm p-4'>
                    <img width="94" height="94" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-Save-Money-economy-nawicon-outline-color-nawicon.png" alt="external-Save-Money-economy-nawicon-outline-color-nawicon"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Save First, Spend Later</h1>
                        <p>Treat savings as a non-negotiable expense. Move a part of your income to savings right after payday — even a small amount each month can grow into something meaningful over time. Paying yourself first builds security and peace of mind.</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 border border-blue-400 rounded-xl shadow-sm p-4'>
                    <img width="94" height="94" src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/external-review-customer-review-xnimrodx-lineal-color-xnimrodx-4.png" alt="external-review-customer-review-xnimrodx-lineal-color-xnimrodx-4"/>
                    <div>
                        <h1 className='text-xl font-semibold'>Review and Adjust Regularly</h1>
                        <p>Your lifestyle and priorities change — your budget should too. At the end of each month, reflect on what worked and what didn’t. Adjust your plan, refine your goals, and stay flexible. Consistency and awareness are the real secrets to financial success..</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetTips;