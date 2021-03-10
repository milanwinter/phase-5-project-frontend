import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

function Login (props) {



    return(
        <div className="login-container">
            <Container className="login" >
                <Row>
                     <Form>
                    <h2 id="header" >Login</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control  name="username" placeholder="Enter Username" onChange={(e) => props.handleFormChange(e)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => props.handleFormChange(e)} />
                    </Form.Group>

                    <Button variant="primary" onClick={(e) => props.handleLogin(e)}>
                    Submit
                    </Button>
                    <p></p>
                    
                    <Button variant="success" onClick={(e) => props.toggleLogin(e)} > Sign Up!</Button>
                    </Form> 
                </Row>
                  
            </Container>
        </div>
    )
}

export default Login