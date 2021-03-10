import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import StarRatings from 'react-star-ratings'


class ReviewForm extends Component {


    render() {

        return (
            <Container>
                <Form id="create-review-form">
                    <Form.Label>Review {this.props.resort}! </Form.Label>
                    <Form.Group controlId="formtitle">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title"  placeholder="Title Your Review" onChange={(e) => this.props.handleChange(e)}/>
                        {this.props.errors ? <div className='errorMsg'>{this.props.errors.title}</div> : null}
                    
                    </Form.Group>
                    
                    <Form.Group>
                    <StarRatings
                        rating={this.props.rating}
                        starRatedColor="red"
                        starHoverColor="red"
                        changeRating={(rating) => this.props.changeRating(rating)}
                        numberOfStars={5}
                        name='rating'
                     />
                     {this.props.errors? <div className='errorMsg'>{this.props.errors.rating}</div> : null}
                    </Form.Group>

                    <Form.Group controlId="formcontent">
                      <Form.Label> Review:</Form.Label>
                      <Form.Control name="content" as="textarea" rows={5} onChange={(e) => this.props.handleChange(e)}/>
                    </Form.Group>
                    {this.props.errors? <div className='errorMsg'>{this.props.errors.content}</div>: null}
                    <Button variant="primary"  onClick={(e)=>this.props.handleSubmit(e)}>
                            Submit
                    </Button>
                </Form>
            
            </Container>
        )
    }

}

export default ReviewForm