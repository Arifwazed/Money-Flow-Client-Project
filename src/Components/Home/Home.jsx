import React, { use } from 'react';
import Banner from './Banner';
import PlanningMatters from './PlanningMatters';
import BudgetTips from './BudgetTips';
import { AuthContext } from '../../Contexts/AuthContext';

const Home = () => {
    const {user} = use(AuthContext);
    console.log("from Home:",user);
    return (
        <div>
            <Banner></Banner>
            <BudgetTips></BudgetTips>
            <PlanningMatters></PlanningMatters>
        </div>
    );
};

export default Home;