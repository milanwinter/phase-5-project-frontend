import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

function Signup(props) {


    return (
        <div className="login-container">
            <Container className="block-example border border-dark" >
                <Form>
                    <Form.Label>Sign Up!</Form.Label>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control  name="username" placeholder="Enter Username" onChange={(e) => props.handleFormChange(e)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => props.handleFormChange(e)} />
                    </Form.Group>
                    

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Skill Level</Form.Label>
                        <Form.Control name="skill" as="select" onChange={(e) => props.handleFormChange(e)}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" onClick={(e) => props.handleSignup(e)}>
                    Submit
                    </Button>
                    <p></p>
                    
                    <Button variant="success" onClick={(e) => props.toggleLogin(e)} > Sign Up!</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Signup