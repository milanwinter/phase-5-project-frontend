import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ResortCard from '../components/ResortCard'
import HomeResort from '../components/HomeResort'
import Spinner from 'react-bootstrap/Spinner'

class HomePage extends Component {


    state = {
        weatherSorted: [],
        ratingsSorted: [],
        complete: false
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
                ratingsSorted: ratingsSorted,
                complete: true
            })
        })
    }
    

    handleGoButton = (id) => {
        this.props.history.push(`/resorts/${id}`)
    }


    displayResorts = (resorts) => {
        return (
        resorts.map(elem => {
            return <HomeResort resort={elem.resort} snowfall={Math.round(elem.inches)} average={elem.average} handleGoButton={this.handleGoButton} />
        })
        )
    }

    render() {
        
        return (
            
            <div>
                {this.state.complete ? <Container fluid>
                    <Row className="home-welcome">
                         <h1 id="header"> 
                            Welcome!
                         </h1>
                    </Row>

                    <Row>
                        <Col className="high-snowfall" md={{span: 4, offset: 2}}>
                            <Row>
                              <h4 id="header">    Resorts with highest snowfall(inches) forecast(5 days)</h4>  
                            </Row>
                            
                            {this.displayResorts(this.state.weatherSorted)}
                        </Col>

                        <Col className="high-rating" md={{span: 4, offset: 1}}>
                            <h4 id="header" >Highest Rated Resorts</h4>
                            {this.displayResorts(this.state.ratingsSorted)}
                        </Col>
                        
                    </Row>


                </Container> : <Container > <Row>
                    <h1 id="header"> Our Workers are bringing the information down from the mountain!</h1>
                    </Row>
                    <iframe src="https://giphy.com/embed/EyrbMF75gOLp4XplL5" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/outsidetv-EyrbMF75gOLp4XplL5">via GIPHY</a></p>

                    <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
                    </Container> }
            
               
            </div>
           
        )  
    }
}

export default HomePage