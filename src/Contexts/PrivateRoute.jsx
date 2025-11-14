import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpin from '../Components/Loading/LoadingSpin';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const location = useLocation();

    if(loading){
        return <LoadingSpin></LoadingSpin>;
    }
    if(user){
        return children
    }
    return <Navigate state={location?.pathname} to="/login" replace></Navigate>
};

export default PrivateRoute;