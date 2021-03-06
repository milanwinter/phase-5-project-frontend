import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import WeatherCard from '../components/WeatherCard'
import ReviewForm from '../components/ReviewForm'
import Reviews from '../components/Reviews'
import { CardDeck, CardGroup } from 'react-bootstrap'





class ResortShow extends Component {

    state={
        resort: {},
        reviews: [],
        weather: {},
        week: [],
        weekWeather: [],
        rating: "1"
    }

    componentDidMount() {
        this.checkDate()
        this.weekDates()
        this.fetchResort()
        this.fetchWeather()
    }

    checkDate = () => {
        let tomorrow = new Date();
        let dd = String(tomorrow.getDate()+ 1).padStart(2,'0') 
        let mm = String(tomorrow.getMonth() + 1).padStart(2,'0');
        let yyyy = tomorrow.getFullYear();
        tomorrow = dd + '/' + mm + '/' + yyyy;
        this.setState({
            checkDate: tomorrow
        })
    }

    weekDates = () => {
        let tomorrow = new Date();
        let mm = String(tomorrow.getMonth() + 1).padStart(2,'0');
        let yyyy = tomorrow.getFullYear();
        let week = []
        for (let i = 0; i <= 5; i++) {
            let dd = String(tomorrow.getDate()+ 1+ i).padStart(2,'0')
            let day = dd + '/' + mm + '/' + yyyy;
            week.push(day)
        }
        this.setState({
            week: week
        })

    }

    
    fetchResort = () => {
        fetch(`http://localhost:3000/resorts/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(resort => {
            this.setState({
                resort: resort,
                reviews: resort.reviews
            })
        })
    }

    fetchWeather = () => {
        fetch(`http://localhost:3000/weather/${this.props.match.params.id}`)
        .then(resp => resp.json())
        .then(weather => {
             this.filterWeather(weather.forecast)
        })
    }


    filterWeather = (forecast) => {
        this.state.week.map(day => {
            let info = forecast.filter(weather => weather.date === day)
            this.setState(prevState => {
                return {
                weekWeather: [...prevState.weekWeather, {[day]: info}]
                }
            })
        })
    }

    createCards = () => {
        if (this.state.weekWeather.length > 5) {
             return  this.state.weekWeather.map(day => {
                 return (
                     <CardGroup style={{display: 'flex', flexDirection: 'row'}} on the CardDeck and then put style={{flex: 1}}>
                            {<WeatherCard day={day} />}
                     </CardGroup>
                 )
        })
        }
      
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    


    handleReviewFormSubmit = (e) => {
        e.preventDefault()
       let user_id = localStorage.getItem("user")
       let resort_id = this.props.match.params.id
       let title = this.state.title
       let content = this.state.content
       let rating = parseInt(this.state.rating)
       fetch('http://localhost:3000/reviews', {
           method: "POST",
           headers: {
               'Accept' : "application/json",
               'Content-type': "application/json"

           },
           body: JSON.stringify({
               review: {user_id: user_id, resort_id: resort_id, title: title, content: content, rating: rating}
           })
       })
       .then(resp => resp.json())
       .then(review => {
            document.getElementById("create-review-form").reset();
           this.setState(prevState => ({
               reviews: [...prevState.reviews, review]
           }))
       })
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="Resort Logo"
                                src={this.state.resort.logo}
                            />
                        </Figure>
                        <h1> {this.state.resort.name}</h1>
                        
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <h2>5 Day Forecast</h2>
                            </Row>
                            <Row>
                                   {this.createCards()} 
                            </Row>
                        </Col>
                        <br></br>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                             { this.state.reviews.map(review =>  {return <Reviews review={review} resortId={this.props.match.params.id}/>})}
                        
                        
                        </Col>

                        <Col>
                        
                         <ReviewForm handleChange={this.handleChange} handleSubmit={this.handleReviewFormSubmit} />
                        
                        
                        </Col>
                    </Row>
                                 
                           

                

                </Container>
            </div>

        )
    }
}

export default ResortShow
