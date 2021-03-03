import React,{Component} from 'react'
import Button from 'react-bootstrap/Button'

class Reviews extends Component {



    checkIfUser = () => {
        let userId = localStorage.getItem('user')
        if (this.props.review.user_id == userId) {
            return (
                <Button onClick={()=> this.props.deleteReview(this.props.review.id)}> Delete this Review </Button>
            )
        } else {
            return null
        }
    }

    render() {
        return(
            <div className="reviews">
                <h5>Review Title {this.props.review.title}</h5>
                <h5>Review Rating {this.props.review.rating}</h5>
                <p>{this.props.review.content}</p>
                {this.checkIfUser()}
            </div>
        )
    }
}

export default Reviews