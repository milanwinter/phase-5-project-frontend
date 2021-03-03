import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
class HomePage extends Component {



    componentDidMount() {
        this.fetchweather()
    }

    fetchweather = () => {
        fetch("http://localhost:3000/weather")
        .then(resp => resp.json())
        .then(weatherData => {
            console.log(weatherData)
        })
    }

    render() {
        return (
            <div>
                <Container>
                     <h1> Home Page</h1>
                </Container>
            </div>
           
        )
    }
}

export default HomePage