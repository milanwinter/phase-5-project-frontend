import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Reviews from '../components/Reviews'

class ReviewsPage extends Component {

    state = {
        reviews: [],
        userReviews: []
    }



    componentDidMount() {
        this.fetchReviews()
    }

    fetchReviews = () => {
        fetch('http://localhost:3000/reviews')
        .then(resp => resp.json())
        .then(reviews => {

            let userId = localStorage.getItem("user")
            let userReviews = reviews.filter(review => review.user_id == userId)
            this.setState({
                reviews: reviews,
                userReviews: userReviews
            })
        })
    }

    deleteReview = (id) => {
        fetch(`http://localhost:3000/reviews/${id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(json => {
            let newUserReviews = this.state.userReviews.filter(rev => rev.id != id)
            let reviews = this.state.reviews.filter(rev => rev.id != id)
            this.setState({
                reviews: reviews,
                userReviews: newUserReviews
            })
        })
    }





    render() {

        return(
            <div>
                <Container>
                    <Row>
                        <h1>Reviews</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h2> Your Reviews</h2>
                            {this.state.userReviews.map(review => <Reviews deleteReview={this.deleteReview} review={review} />)}
                        </Col>
                        <Col>
                            <h2> All Reviews </h2>
                            <Button>Sort Button Goes Here</Button>
                               {this.state.reviews.map(review => <Reviews deleteReview={this.deleteReview} review={review} />)} 
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ReviewsPage 