import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet,useNavigation } from 'react-router';
import Footer from '../Footer/Footer';
import { Bounce, ToastContainer } from 'react-toastify';
import LoadingSpin from '../Loading/LoadingSpin';

const RootLayout = () => {
    const navigate = useNavigation();
    const loading = navigate.state === 'loading';
    return (
        <div>
            <Navbar></Navbar>
            {
                loading ? <LoadingSpin></LoadingSpin> : <Outlet></Outlet>
            }
            <Footer></Footer>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
};

export default RootLayout;