import React from 'react'
import { Nav, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-body">
            <div className="right-panel">
                <Row>
                    <Col>
                        <Nav.Link href="/" className='mb-0 p-0'>Home</Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="/setting" className='mb-0 p-0'>Setting</Nav.Link>
                    </Col>
                </Row>
                </div>
                <div className="right-panel">
                    <Row>
                        <Col>
                            <Nav.Link href="https://ilcs.co.id/" className='mb-0 p-0'>ILCS</Nav.Link>
                        </Col>
                        <Col>
                        <Nav.Link href="https://pelindo.co.id/" className='mb-0 p-0'>Pelindo</Nav.Link>
                        </Col>
                    </Row>
                </div>
            </div>
        </footer>
    )
}

export default Footer
