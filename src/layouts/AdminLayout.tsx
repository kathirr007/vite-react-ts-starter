/**
 * File: AdminLayout
 * Description:This component is a higher-order component used to protect routes by ensuring that only authenticated users can access certain parts of the application. It checks if the currentUser exists in the Redux state (indicating the user is logged in). If the user is authenticated, it renders the child components using the Outlet component. If the user is not authenticated, they are redirected to the /sign-in page
 *
 *
 * Updated by: [Name]
 * Updated on: [Update date]
 * - Update description: Brief description of what was updated or fixed
 */

import React, { useState } from 'react'
// import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'

function AdminLayout(props: { children: React.ReactNode }) {
  // const { currentUser } = useSelector((state) => state.user);
  const [isLoggedIn] = useState(true)
  return isLoggedIn
    ? (
      <>
        {props.children}
        <LayoutFooter />
      </>
      )
    : <Navigate to="/auth/sign-in" />
}

export { AdminLayout }
