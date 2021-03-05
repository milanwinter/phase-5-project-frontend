import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ResortCard from '../components/ResortCard'

class Resorts extends Component {

    state = {
        calNevResorts: [],
        colResorts: [],
        utahResorts: []
    }


    componentDidMount() {
        this.fetchResorts()
    }

    fetchResorts = () => {
        fetch("http://localhost:3000/resorts")
        .then(resp => resp.json())
        .then(resorts => {
           let calNevResorts = resorts.filter(resort => resort.state === "California" || resort.state === "Nevada")
           let colResorts = resorts.filter(resort => resort.state === "Colorado")
           let utahResorts = resorts.filter(resort => resort.state === "Utah")
 
           this.setState({
               calNevResorts: calNevResorts,
               colResorts: colResorts,
               utahResorts : utahResorts
           })
        })
    }

    // Card buttons //

    handleGoButton = (id) => {
        this.props.history.push(`/resorts/${id}`)
    }

    addToFavorites = (id) => {
        let userId = localStorage.getItem("user")
        let resortId = id

        fetch("http://localhost:3000/favorites",{
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                favorite: {user_id: userId, resort_id: resortId}
            })

        })
        .then(resp => resp.json())
        .then(favorite => {
            if (favorite.errors) {
                alert("Already in your favorites")
            }
        })
    }


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>California/Nevada</h1>
                            {this.state.calNevResorts.map(resort => <ResortCard resort={resort} addToFavorites={this.addToFavorites} handleGoButton={this.handleGoButton}/>)}
                        </Col>
                        <Col>
                            <h1> Colorado </h1>
                            {this.state.colResorts.map(resort => <ResortCard resort={resort} addToFavorites={this.addToFavorites}  handleGoButton={this.handleGoButton}/>)}
                        </Col>
                        <Col>
                            <h1>Utah/Wyoming</h1>
                            {this.state.utahResorts.map(resort => <ResortCard resort={resort} addToFavorites={this.addToFavorites} handleGoButton={this.handleGoButton} />)}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Resorts