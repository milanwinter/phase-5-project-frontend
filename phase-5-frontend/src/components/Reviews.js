import React,{Component} from 'react'
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings'

class Reviews extends Component {


    findResort = () => {
        let resorts = {
            1: "Squaw Valley/Alpine",
            2: "Heavenly",
            3: "Mt.Rose",
            4: "Sugar Bowl",
            5: "Lee Canyon",
            6: "Vail",
            7: "Telluride",
            8: "Beaver Creek Village",
            9: "Steamboat Ski Resort",
            10: "Copper Mountain",
            11: "Snowbird",
            12: "Deer Valley Resort",
            13: "Park City Mountain",
            14: "Brighton Resort",
            15: "Solitude Mountain Resort",
            16: "Sundance Resort"
        }
        return resorts[this.props.review.resort_id]
    }

    getDate = () => {
     let initialDate = this.props.review.created_at
     let year = initialDate.slice(0,4)
     let month = initialDate.slice(5,7)
     let day = initialDate.slice(8,10)
     console.log(year,month,day)
     let date = month+ "/" + day + "/" + year
     return date
      
    }


    checkIfUser = () => {
        let userId = localStorage.getItem('user')
        if (this.props.review.user_id == userId && this.props.fromReviewPage) {
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
                {this.props.fromReviewPage ? <h5>{this.findResort()} - {this.getDate()}</h5> : null}
                <h5>{this.props.review.title.toUpperCase()}   {<StarRatings
                    rating={this.props.review.rating}
                    starDimension="15px"
                    starSpacing="5px"
                    starRatedColor="red"
                />}</h5>
                
                <p>{this.props.review.content}</p>
                {this.checkIfUser()}
            </div>
        )
    }
}

export default Reviews