import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
class ReviewForm extends Component {


    render() {

        return (
            <Container>
                <Form id="create-review-form">
                    <Form.Label>Review This Resort! </Form.Label>
                    <Form.Group controlId="formtitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title"  placeholder="Title Your Review" onChange={(e) => this.props.handleChange(e)}/>
                    
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Rating out of 10 </Form.Label>
                            <Form.Control name="rating" as="select" onChange={(e) => this.props.handleChange(e)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            </Form.Control>
 
                    </Form.Group>
        
                    <Form.Group controlId="formcontent">
                      <Form.Label> Review</Form.Label>
                      <Form.Control name="content" as="textarea" rows={5} onChange={(e) => this.props.handleChange(e)}/>
                    </Form.Group>
                    <Button variant="primary"  onClick={(e)=>this.props.handleSubmit(e)}>
                            Submit
                    </Button>
                </Form>
            
            </Container>
        )
    }

}

export default ReviewForm