import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Reviews from '../components/Reviews'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

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

    sortReviews = (e) => {
        switch (e.target.name) {
            case "highest":
                let highestRated = this.state.reviews.sort((a,b) => a.rating > b.rating ? -1 : 1)
                this.setState({
                    ratings: highestRated
                })
                break;
            case "lowest":
                let lowestRated = this.state.reviews.sort((a,b) => a.rating > b.rating? 1 : -1)
                this.setState({
                    ratings: lowestRated
                })
            default:
                break;
        }
    }



    render() {

        return(
            <div>
                <Container>
                    <Row>
                        <h1 id="header">Reviews</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h2 id="header" > Your Reviews</h2>
                            {this.state.userReviews.map(review => <Reviews fromReviewPage={true} deleteReview={this.deleteReview} review={review} />)}
                            
                        </Col>
                        <Col>
                            <h2 id="header"> All Reviews </h2>
                            <DropdownButton id="dropdown-basic-button" title="Sort By" >
                                <Dropdown.Item onClick={(e) => this.sortReviews(e)} name="highest">Highest Rated</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.sortReviews(e)} name="lowest">Lowest Rated</Dropdown.Item>
                            </DropdownButton>
                               {this.state.reviews.map(review => <Reviews fromReviewPage={true} deleteReview={this.deleteReview} review={review} />)} 
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ReviewsPage 