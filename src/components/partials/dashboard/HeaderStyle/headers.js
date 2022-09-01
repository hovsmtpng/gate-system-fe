import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HeaderHorizontalNav from '../HeaderStyle/headers-horizontal-nav'
import { Navbar,Container,Nav,Dropdown,} from 'react-bootstrap'
import CustomToggle from '../../../dropdowns'

//img
import avatars1 from '../../../../assets/images/avatars/01.png'

// logo
import Logo from '../../components/logo'
// mobile-offcanvas
import MobildeOffcanvas from '../../components/mobile-offcanvas'

const Headers = () => {
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
            <Navbar expand="lg" variant="light" className="nav iq-navbar">
                <Container fluid className="navbar-inner">
                       <MobildeOffcanvas/>
                        <Nav.Link href="/" className="logo-center navbar-brand col-md-3 col-lg-3">
                            <Logo color={true} />
                            <h4 className="logo-title"><b>Pelindo</b></h4>
                        </Nav.Link>
                        <Navbar.Toggle aria-controls="navbarSupportedContent">
                            <span className="navbar-toggler-icon">
                                <span className="navbar-toggler-bar bar1 mt-2"></span>
                                <span className="navbar-toggler-bar bar2"></span>
                                <span className="navbar-toggler-bar bar3"></span>
                            </span>
                        </Navbar.Toggle>
                        <Navbar.Collapse  id="navbarSupportedContent" className="col-md-auto">
                            <Nav as="ul" className=" ms-auto mb-2 mb-lg-0 align-items-center">
                                <Dropdown as="li" className="nav-item">
                                    <Dropdown.Toggle as={CustomToggle} variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={avatars1} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"/>
                                        <div className="caption ms-3 d-none d-md-block ">
                                            <h6 className="mb-0 caption-title">{dataHeader.headerName}</h6>
                                            <p className="mb-0 caption-sub-title">{dataHeader.gateName === "GIN" ? "GATE IN" : "GATE OUT"}</p>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu  className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-profile">Profile</Dropdown.Item>
                                        <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-privacy-setting">Privacy Setting</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/auth/sign-in">Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="navbar dual-horizontal mx-md-auto">
                <HeaderHorizontalNav />
            </div>
        </>
    )
}

export default Headers
