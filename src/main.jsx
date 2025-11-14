import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Components/Layout/RootLayout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AuthProvider from './Contexts/AuthProvider';
import AddTransaction from './Components/AddTransaction/AddTransaction';
import PrivateRoute from './Contexts/PrivateRoute';
import Register from './Components/Register/Register';
import MyTransactions from './Components/MyTransactions/MyTransactions';
import TransactionDetails from './Components/TransactionDetails/TransactionDetails';
import Reports from './Components/Reports/Reports';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import ErrorPage from './Components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'addTransaction',
        element: <PrivateRoute>
            <AddTransaction></AddTransaction>
        </PrivateRoute>
      },
      {
        path: 'my-transactions',
        element: <PrivateRoute>
            <MyTransactions></MyTransactions>
        </PrivateRoute>
      },
      {
        path: '/reports',
        element: <PrivateRoute>
            <Reports></Reports>
        </PrivateRoute>
      },
      {
        path: '/transaction/:id',
        loader: ({params}) => fetch(`https://money-flow-server-api.vercel.app/transactions/${params.id}`),
        element: <PrivateRoute>
          <TransactionDetails></TransactionDetails> 
        </PrivateRoute>
      },
      {
        path: 'updateProfile',
        element: <PrivateRoute>
          <UpdateProfile></UpdateProfile> 
        </PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <RouterProvider router={router} />
  </AuthProvider>,
)
