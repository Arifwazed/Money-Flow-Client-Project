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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
        path: 'addTransaction',
        element: <PrivateRoute>
            <AddTransaction></AddTransaction>
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
