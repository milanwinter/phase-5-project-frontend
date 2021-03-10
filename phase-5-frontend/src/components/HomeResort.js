import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings'

class HomeResort extends Component {



   

    render() { 

        return (
            <div>
                <Card style={{width: '20rem' }}>
                    <Card.Img variant="top" src={this.props.resort.logo} />
                    <Card.Body>
                        <Card.Title>{this.props.resort.name} </Card.Title>
                        <Card.Text>
                        Snowfall Next 5 days: {this.props.snowfall} inches
                        </Card.Text>
                        <Card.Text>
                          {isNaN(this.props.average) ? this.props.average :  <StarRatings
                            rating={this.props.average}
                            starDimension="15px"
                            starSpacing="5px"
                            starRatedColor="red"
                        />}  
                        </Card.Text>
                        
                        <Button variant="primary" onClick={() => this.props.handleGoButton(this.props.resort.id)}>Check Out This Resort!</Button>
                    </Card.Body>
                </Card>
                <br></br>
            </div>
        )
    }
}

export default HomeResort