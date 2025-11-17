import React, { use } from 'react';
import Banner from './Banner';
import PlanningMatters from './PlanningMatters';
import BudgetTips from './BudgetTips';
import { AuthContext } from '../../Contexts/AuthContext';
import Overview from './Overview';

const Home = () => {
    const {user} = use(AuthContext);
    console.log("from Home:",user);
    return (
        // <div className='bg-linear-to-br from-[#e9d6ff] to-[#6eb6ff]'>
        // <div className='bg-linear-to-br from-[#80bff0] to-[#f1f9ff]'>
        <div className='bg-linear-to-br from-[#f1f9ff] to-[#a7d7fc] dark:bg-none'>
            <Banner></Banner>
            <Overview></Overview>
            <BudgetTips></BudgetTips>
            <PlanningMatters></PlanningMatters>
        </div>
    );
};

export default Home;