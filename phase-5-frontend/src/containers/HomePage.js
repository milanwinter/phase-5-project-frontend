import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ResortCard from '../components/ResortCard'
import HomeResort from '../components/HomeResort'
class HomePage extends Component {


    state = {
        weatherSorted: [],
        ratingsSorted: []
    }
    componentDidMount() {
        this.fetchweather()
    }

    fetchweather = () => {
        fetch("http://localhost:3000/weather")
        .then(resp => resp.json())
        .then(weatherData => {
            console.log(weatherData)
          let sorted =  weatherData.sort((a,b) => a.inches > b.inches ? -1: 1)
          let ratingsFilter = weatherData.filter(item => item.average !="no reviews")
          let ratingsSorted = ratingsFilter.sort((a,b) => a.average > b.average ? -1 : 1)

            this.setState({
                weatherSorted: sorted.slice(0,5),
                ratingsSorted: ratingsSorted
            })
        })
    }
    


    displayResorts = (resorts) => {
        return (
        resorts.map(elem => {
            return <HomeResort resort={elem.resort} snowfall={Math.round(elem.inches)} average={elem.average} />
        })
        )
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                         <h1> Home Page</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h4> Resorts with highest snowfall(inches) forecast(5 days)</h4>
                            {this.displayResorts(this.state.weatherSorted)}
                        </Col>

                        <Col>
                            <h4>Highest Rated Resorts</h4>
                            {this.displayResorts(this.state.ratingsSorted)}
                        </Col>
                        
                    </Row>
                </Container>
            </div>
           
        )
    }
}

export default HomePage