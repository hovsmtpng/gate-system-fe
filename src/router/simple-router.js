import React from 'react'
// import {Switch,Route} from 'react-router-dom'
import {BrowserRouter,Routes,Route} from "react-router-dom";

// auth
import ConfirmMail from '../views/dashboard/auth/confirm-mail'
import LockScreen from '../views/dashboard/auth/lock-screen'
import Recoverpw from '../views/dashboard/auth/recoverpw'
import SignIn from '../views/dashboard/auth/sign-in'
import SignUp from '../views/dashboard/auth/sign-up'
// errors
import Error404 from '../views/dashboard/errors/error404'
import Error500 from '../views/dashboard/errors/error500'
import Maintenance from '../views/dashboard/errors/maintenance'

const SimpleRouter = () => {
    return (
            <>
            <BrowserRouter>
                <Routes>
                    {/* auth */}
                    <Route exact path="/auth/confirm-mail" element={<ConfirmMail/>}/>
                    <Route exact path="/auth/lock-screen"  element={<LockScreen/>}/>
                    <Route exact path="/auth/recoverpw"    element={<Recoverpw/>}/>
                    <Route exact path="/auth/sign-in"      element={<SignIn/>}/>
                    <Route exact path="/auth/sign-up"      element={<SignUp/>}/>  
                    {/* error */}
                    <Route exact path="/errors/error404"   element={<Error404/>}/>  
                    <Route exact path="/errors/error500"  element={<Error500/>}/>
                    <Route exact path="/errors/maintenance" element={<Maintenance/>}/>
                </Routes>
            </BrowserRouter>
            </>
    )
}

export default SimpleRouter
