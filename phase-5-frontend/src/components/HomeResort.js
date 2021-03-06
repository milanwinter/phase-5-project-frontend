import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


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
                            Average Rating: {this.props.average}
                        </Card.Text>
                        <Button variant="primary" onClick={() => this.props.handleGoButton(this.props.resort.id)}>Check Out This Resort!</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default HomeResort