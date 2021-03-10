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
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import FormModal from '../components/FormModal'

// importing trail map images //
import sugarbowlmap from '../trail-maps/sugarbowlmap.jpg'
import squawvalley from '../trail-maps/squawvalley.jpg'
import Heavenlymap from '../trail-maps/Heavenlymap.jpg'
import mtrose from '../trail-maps/mtrose.jpg'
import leecanyonmap from '../trail-maps/leecanyonmap.jpg'
import vailmap from '../trail-maps/vailmap.jpg'
import telluridemap from '../trail-maps/telluridemap.jpg'
import beavercreekmap from '../trail-maps/beavercreekmap.jpg'
import steamboatmap from '../trail-maps/steamboatmap.jpg'
import coppermap from '../trail-maps/coppermap.jpg'
import snowbirdmap from '../trail-maps/snowbirdmap.jpg'
import deermap from '../trail-maps/deermap.jpg'
import parkcitymap from '../trail-maps/parkcitymap.jpg'
import brightonmap from '../trail-maps/brightonmap.jpg'
import solitudemap from '../trail-maps/solitudemap.jpg'
import sundancemap from '../trail-maps/sundancemap.jpg'
import jacksonholemap from '../trail-maps/jacksonholemap.jpg'





class ResortShow extends Component {

    state={
        resort: {},
        reviews: [],
        weather: {},
        week: [],
        weekWeather: [],
        rating: "",
        formRating: 0,
        form: false,
        errors: null,
        map: null
    }

    componentDidMount() {
        this.checkDate()
        this.weekDates()
        this.fetchResort()
        this.fetchWeather()
        this.fetchFavorites()
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
            let image = this.getMap(resort.id)
            this.setState({
                resort: resort,
                reviews: resort.reviews,
                map: image
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

    getMap = (id) => {
        let maps = {
            1: squawvalley,
            2: Heavenlymap,
            3: mtrose,
            4: sugarbowlmap,
            5: leecanyonmap,
            6: vailmap,
            7: telluridemap,
            8: beavercreekmap,
            9: steamboatmap,
            10: coppermap,
            11: snowbirdmap,
            12: deermap,
            13: parkcitymap,
            14: brightonmap,
            15: solitudemap,
            16: sundancemap

        }
        return maps[id]
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


    fetchFavorites = () => {
        let userId = localStorage.getItem("user")
        fetch('http://localhost:3000/favorites')
        .then(resp => resp.json())
        .then(favorites => {
            let userFavorites = favorites.filter(favorite => favorite.user_id == userId)
            let resortIds = []
            let favorite = userFavorites.filter(favorite => favorite.resort_id === this.state.resort.id)
            favorite.length > 0 ? 
            this.setState({
                favorite: true
            }) : 
            this.setState({
                favorite: false
            })

        })
    }


    createCards = () => {
        if (this.state.weekWeather.length > 5) {
             return  this.state.weekWeather.slice(0,5).map(day => {
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
       let rating = parseInt(this.state.formRating)
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
       .then(response => {
           this.handleResponse(response)
       })
    }

    handleResponse = (response) => {
        if (response.errors) {
            alert("Whoops something went wrong")
            console.log(response.errors)
            this.setState({
                errors: response.errors
            })
        } else {
            console.log(response)
            document.getElementById("create-review-form").reset();
            this.setState(prevState => ({
                reviews: [...prevState.reviews,response],
                form:false
            }))
        }

    }
    
    changeRating = (rating) => {
        this.setState({
            formRating: rating
        })
    }

    showForm = () => {
        this.setState({
            form: true
        })
    }

    hideForm = () => {
        this.setState({
            form: false
        })
    }

    biggerImage = () => {
        console.log("Hi")
        window.open(this.state.map,"_blank")
    }

    openwebsite = () => {
        console.log(this.state.resort.website)
        window.open(this.state.resort.website,"_blank")
    }

    
    render() {
        return (
            <div>
                <Container fluid>
                    <Row className="resort-show-header">
                        <Col md={{span:4, offset: 4}}>
                            <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="Resort Logo"
                                src={this.state.resort.logo}
                            />
                        </Figure>
                        <h1 id="header"> {this.state.resort.name}</h1>
                         <Button size="sm" onClick={() => this.openwebsite()}> Check out their website!</Button>
                        </Col>

                        <Col md={{span:2, offset: 1}}>
                           
                        </Col>
                    
                       
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <h2 id="header">5 Day Forecast</h2>
                            </Row>
                            <Row>
                                   {this.createCards()} 
                            </Row>
                        </Col>
                        <br></br>
                    </Row>
                    <br></br>
                    <Row>
                        <Col className="resort-reviews" md={{span: 4, offset: 2}}>
                            <h3 id="header"> Reviews</h3>
                             { this.state.reviews.length > 0? this.state.reviews.map(review =>  {return <Reviews review={review} resortId={this.props.match.params.id} />}) : <h4>No Reviews for this resort yet</h4>} 
                                <br></br>
                                <Button onClick={this.showForm}> Review this Resort! </Button>
                            {this.state.form? <FormModal errors={this.state.errors} changeRating={this.changeRating} handleChange={this.handleChange} rating = {this.state.formRating} handleSubmit={this.handleReviewFormSubmit} resort={this.state.resort.name} hideForm={this.hideForm} /> : null}
                        </Col>

                        <Col md={{span: 3, offset: 2}}>
                            <h3 id="header">Trail Map</h3>
                        <Image className="map-image" onClick={() => this.biggerImage()} src={this.state.map} thumbnail
                        />
                        
                        </Col>
                    </Row>
                                 
                           

                

                </Container>
            </div>

        )
    }
}

export default ResortShow
