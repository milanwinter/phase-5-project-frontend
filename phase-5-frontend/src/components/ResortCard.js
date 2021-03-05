import React, {Component} from 'react' 
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class ResortCard extends Component {


    render() {
        return(
            <div>
                <Card style={{ width: '20rem'}}>
                    <Card.Img variant="top" src={this.props.resort.logo} />
                    <Card.Body>
                        <Card.Title>{this.props.resort.name} </Card.Title>
                         <Card.Text>
                        {this.props.resort.state}
                        </Card.Text>
                    <Button variant="primary" onClick={() => this.props.handleGoButton(this.props.resort.id)}>Check Out This Resort!</Button>
                    {this.props.fromFavorites? <Button variant="danger" onClick={()=>this.props.removeFavorite(this.props.resort.id)}>Remove From Favorites</Button> : <Button variant="danger" onClick={()=>this.props.addToFavorites(this.props.resort.id)}>Add To Favorites!</Button>}
                    </Card.Body>
                </Card>
            </div>
        )
            
    }
}

export default ResortCard