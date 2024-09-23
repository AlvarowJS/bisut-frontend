// ** Router imports
import { lazy, useEffect, useState } from 'react'

// ** Router imports
import { useRoutes, Navigate, Outlet } from "react-router-dom";

// ** GetRoutes
import { getRoutes } from "./routes";

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";
import Error from "../views/Error";

// ** Utils

import NotAuthorized from '../views/authentication/NotAuthorized';
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** Components
const Login = lazy(() => import('../views/authentication/Login'))

const Router = () => {
  // const [token, setToken] = useState()
  // useEffect(() => {
  //   const getToken = localStorage.getItem("token")
  //   setToken(getToken)
    
  // }, [])

  
  // ** Hooks
  const { layout } = useLayout();

  const allRoutes = getRoutes(layout);

  
  const getHomeRoute = () => {
    // console.log(token, "hola")
    // return '/login'
    // const user = getkey()
    // if(user != null){
    //   return '/home'
    // }
    // else{
    //   return '/login'
    // }
    const token = localStorage.getItem("accessToken")
    if(token){
      return '/home'
    }else{
      return '/login'
    }


    // if (user != null) {
    //   console.log('if route ')
    //   return getHomeRouteForLoggedInUser("normal")
    // } else {
    //   console.log('else route ')
    //   return '/login'
    // }
 
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
      // element: <Navigate replace to='/login' />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },  
    ...allRoutes
  ]);

  return routes;
};

export default Router;
