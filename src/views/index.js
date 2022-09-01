import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Button, Nav, Navbar, Container} from 'react-bootstrap'
import Logo from '../components/partials/components/logo'

//img
import topImage from '../assets/images/dashboard/04.jpg'

//prism
import '../../node_modules/prismjs/prism';
import '../../node_modules/prismjs/themes/prism-okaidia.css'


const Index = () => {
    const [dataHeader, setdataHeader] = useState([]);
    const fetchDataHeader = async () => {
        try {
            await axios.get('http://localhost:8080/readsettingjson')
            .then(response => {
                setdataHeader(response.data.data[0])
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchDataHeader();
    })
    return (
        <>
         <span className="uisheet screen-darken"></span>
            <div className="header" style= {{background:`url(${topImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", position: "relative",}}>
                <div className="main-img">
                    <div className="container">
                        <h1 className="my-4">
                            <span style={{textShadow:'2px 2px 4px #000000'}}>Gate System</span>
                        </h1>
                        <h4 className="text-white mb-5"  style={{textShadow:'2px 2px 4px #000000'}}>Terminal {dataHeader.terminalName} <b>{dataHeader.headerName}</b>.</h4>
                    </div>
                </div>
                <Container>
                    <Navbar bg="white" expand="lg" className="top-1 rounded">
                        <Container>
                            <Navbar.Brand href="#" className="mx-2 d-flex align-items-center">
                                <Logo color={true} />
                                <h5 className="logo-title mx-3"><b>PELINDO</b></h5>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto mb-2 mb-lg-0 d-flex align-items-start">
                                    {/* <Nav.Link href="https://templates.iqonic.design/hope-ui/documentation/react/build/" target="_blank" className="">Documentation</Nav.Link> */}
                                    {/* <Nav.Link href="https://templates.iqonic.design/hope-ui/documentation/react/build/changelog" target="_blank" className="me-3">Change Log</Nav.Link> */}
                                    <Nav.Link href="/display" className="btn btn-primary text-white me-3">
                                        <svg width="22" height="22" className="me-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule  ="evenodd" clipRule="evenodd"
                                                d="M21.21 7.89924V16.0502C21.21 19.0702 19.32 21.2002 16.3 21.2002H7.65C4.63 21.2002 2.75 19.0702 2.75 16.0502V7.89924C2.75 4.87924 4.64 2.75024 7.65 2.75024H16.3C19.32 2.75024 21.21 4.87924 21.21 7.89924Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path
                                                d="M5.28125 16.4311L6.80925 14.8181C7.34025 14.2551 8.22525 14.2281 8.78925 14.7581C8.80625 14.7751 9.72625 15.7101 9.72625 15.7101C10.2813 16.2751 11.1883 16.2841 11.7533 15.7301C11.7903 15.6941 14.0872 12.9081 14.0872 12.9081C14.6792 12.1891 15.7422 12.0861 16.4622 12.6791C16.5102 12.7191 18.6803 14.9461 18.6803 14.9461"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path fillRule  ="evenodd" clipRule="evenodd"
                                                d="M10.3127 9.13315C10.3127 10.1022 9.52769 10.8872 8.55869 10.8872C7.58969 10.8872 6.80469 10.1022 6.80469 9.13315C6.80469 8.16415 7.58969 7.37915 8.55869 7.37915C9.52769 7.38015 10.3127 8.16415 10.3127 9.13315Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Display
                                    </Nav.Link>
                                    <Nav.Link href="/setting" className="btn btn-danger text-white">
                                        <svg width="22" height="22" className="me-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                        Setting
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </div>
            <div className=" body-class-1 container">

            </div>
            <div id="back-to-top" style={{display: "none"}}>
                <Button size="xs" variant="primary  p-0 position-fixed top"  href="#top">
                    <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 15.5L12 8.5L19 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </Button>
            </div>
        </>
    )
}

export default (Index);
