import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'



function UpdateForm({profile,handleFormChange,handleSubmit,hideForm}) {
    return (
        <div>
           <Form style={{background: 'lightgrey'}}>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                      <Form.Label column sm="2">
                          Username
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control name="username" placeholder={profile.username} onChange={(e) => handleFormChange(e)}/>
                      </Col>
                                
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Skill Level</Form.Label>
                        <Form.Control name="skill" as="select" onChange={(e) => handleFormChange(e)}>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </Form.Control>
                    </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                   <Form.Label column sm="2">
                         Password
                    </Form.Label>
                      <Col sm="10">
                        <Form.Control name="password" type="password" placeholder="Password" onChange={(e) => handleFormChange(e)}/>
                      </Col>
                </Form.Group>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    Submit
                  </Button>
                  <Button variant="danger" onClick={() => hideForm()}> Cancel</Button>
            </Form>
     </div>
    )
}

export default UpdateForm