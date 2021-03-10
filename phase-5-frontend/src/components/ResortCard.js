import React, {Component} from 'react' 
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings'

class ResortCard extends Component {
    state = {
        favorite: false,

    }

    componentDidMount() {
        this.fetchFavorites()
        this.fetchRatings()

    }
    
        fetchFavorites = () => {
            let userId = localStorage.getItem("user")
            fetch('http://localhost:3000/favorites')
            .then(resp => resp.json())
            .then(favorites => {
                let userFavorites = favorites.filter(favorite => favorite.user_id == userId)
                let ids = userFavorites.filter(favorite => favorite.resort_id === this.props.resort.id)
                ids.length > 0 ? 
                this.setState({
                    favoriteStatus: true,
                    favoriteId: ids[0].id
    
                }) : 
                this.setState({
                    favoriteStatus: false
                })
    
            })
        }

    fetchRatings = () => {
        fetch('http://localhost:3000/reviews')
        .then(resp => resp.json())
        .then(reviews => {
            let resortReviews = reviews.filter(review => review.resort_id === this.props.resort.id)

            if (resortReviews.length > 0) {
                let average = resortReviews.reduce((accum, review) => accum + review.rating,0)/resortReviews.length
                this.setState({
                    average: average
                })
            } else {
                let average = "No Reviews Yet"
                this.setState({
                    average:average
                })
            }
           
        })
    }

    addToFavorites = () => {
        this.setState({
            favoriteStatus:true,
        })
        this.props.addToFavorites(this.props.resort.id)
    }

    removeFavorite = () => {
        this.props.removeFavorite(this.props.resort.id,this.state.favoriteId)
        this.setState({
            favoriteStatus: false
        })
    }

    render() {
        return(
            <div>
                <Card style={{ width: '20rem'}} className="resort-card">
                    <Card.Img variant="top" className="resort-logo" src={this.props.resort.logo} />
                    <Card.Body>
                        <Card.Title>{this.props.resort.name} </Card.Title>
                        <Card.Text>
                        {isNaN(this.state.average) ? this.state.average :  <StarRatings
                            rating={this.state.average}
                            starDimension="15px"
                            starSpacing="5px"
                            starRatedColor="red"
                        />}
                        </Card.Text>
                         <Card.Text>
                        {this.props.resort.state}
                        </Card.Text>
                    <Button variant="primary" onClick={() => this.props.handleGoButton(this.props.resort.id)}>Check Out This Resort!</Button>
                    {this.state.favoriteStatus? <Button variant="danger" onClick={()=>this.removeFavorite()}>Remove From Favorites</Button> : <Button variant="danger" onClick={()=>this.addToFavorites(this.props.resort.id)}>Add To Favorites!</Button>}
                    </Card.Body>
                </Card>
                <br></br>
            </div>
        )
            
    }
}

export default ResortCard