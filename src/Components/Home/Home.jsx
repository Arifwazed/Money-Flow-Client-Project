import React from 'react';
import Banner from './Banner';
import PlanningMatters from './PlanningMatters';
import BudgetTips from './BudgetTips';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <BudgetTips></BudgetTips>
            <PlanningMatters></PlanningMatters>
        </div>
    );
};

export default Home;