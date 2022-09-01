import React from 'react'


//router
// import { Switch, Route } from 'react-router'
import {Routes,Route} from "react-router-dom";
//layoutpages
import Index from '../views/index'
import Display from '../layouts/dashboard/display'
import PrintCMS from '../layouts/dashboard/printCMS'
import TestPrintCMS from '../layouts/dashboard/testPrintCMS'
import PrintEIR from '../layouts/dashboard/printEIR'
import Setting from '../layouts/dashboard/setting'
import Default from '../layouts/dashboard/default'
import Horizontal from '../layouts/dashboard/horizontal'
import Boxed from '../layouts/dashboard/boxed'
import DualHorizontal from '../layouts/dashboard/dual-horizontal'
import DualCompact from '../layouts/dashboard/dual-compact'
import BoxedFancy from "../layouts/dashboard/boxed-fancy"
import Simple from '../layouts/dashboard/simple'

const IndexRouters = () => {
    return (
        <>
            {/* <BrowserRouter> */}
                <Routes>
                    <Route exact path="/" element={<Index/>}></Route>
                    <Route exact path="/Display" element={<Display/>}></Route>
                    <Route exact path="/PrintCMS" element={<PrintCMS/>}></Route>
                    <Route exact path="/TestPrintCMS" element={<TestPrintCMS/>}></Route>
                    <Route exact path="/PrintEIR" element={<PrintEIR/>}></Route>
                    <Route exact path="/Setting" element={<Setting/>}></Route>
                    <Route exact path="/dashboard" element={<Default/>}></Route>
                    <Route exact path="/boxed" element={<Boxed/>}></Route>
                    <Route exact path="/horizontal" element={<Horizontal/>}></Route>
                    <Route exact path="/dual-horizontal" element={<DualHorizontal/>}></Route>
                    <Route exact path="/dual-compact" element={<DualCompact/>} ></Route>
                    <Route exact path="/boxedFancy" element={<BoxedFancy/>} ></Route>
                    <Route exact path="/auth" element={<Simple/>}></Route>
                    <Route exact path="/errors" element={<Simple/>}></Route>
                </Routes>
            {/* </BrowserRouter> */}
        </>
    )
}

export default IndexRouters
