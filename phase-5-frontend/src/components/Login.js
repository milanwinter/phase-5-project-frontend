import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function Login(props) {



    return(
        <div classname="login-container">
            <Container className="block-example border border-dark" >
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control  name="username" placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" oonClick={(e) => this.props.handleLoginSubmit(e)}nClick>
                    Submit
                    </Button>
                    <p></p>
                    
                    <Button variant="success" onClick={(e) => this.props.toggleLogin(e)} > Sign Up!</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login