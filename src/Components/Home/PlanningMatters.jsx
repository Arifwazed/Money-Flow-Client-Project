import React from 'react';

const PlanningMatters = () => {
    return (
        <div className='w-11/12 mx-auto py-5'>
                <h2 className="text-4xl font-semibold mb-4 text-center ">
                    <span className='text-primary-gradient'>Why Financial Planning Matters</span>                    
                </h2>
               <section className="py-5 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Take charge of your money and make it work for you! With Money Flow, you can easily track your income and expenses, set budgets, and reach your savings goals. Planning your finances helps you avoid surprises, reduce debt, and stay prepared for life’s unexpected moments. Start smart, stay confident, and watch your financial goals become reality — all in one simple dashboard.
                </p>
                
                <img
                src="https://i.ibb.co.com/LdMfwVfw/16dbe19cb2701486b69d7bab3fbedbe8.jpg"
                alt="Financial planning"
                className="rounded-xl shadow-md h-70 w-full"
                />
            </section>
        </div>
    );
};

export default PlanningMatters;