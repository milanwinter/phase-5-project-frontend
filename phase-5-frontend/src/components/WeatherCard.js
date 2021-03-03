import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import sunny from '../icons/sunny2.png'

class WeatherCard extends Component {

    state = {
        day: "",
        fiveAm: {base: {temp_f:null,feelslike_f: null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null}},
        eightAm: {base: {temp_f:null,feelslike_f: null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null}},
        elevenAm: {base: {temp_f:null,feelslike_f: null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null}},
        fivePm: {base: {temp_f:null,feelslike_f: null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null}}
    }

    componentDidMount() {
        this.sortProps()
    }

    sortProps = () => {
        console.log("in sort props")
        console.log(this.props.day)
       let day = Object.keys(this.props.day).toString()
       let data = this.props.day[day]
       let fiveAm = data.filter(day => day.time === "04:00")[0]
       let eightAm = data.filter(day => day.time === "07:00")[0]
       let elevenAm = data.filter(day => day.time === "13:00")[0]
       let fivePm = data.filter(day => day.time === "16:00")[0]
       this.setState({
           day: day,
           fiveAm: fiveAm,
           eightAm: eightAm,
           elevenAm: elevenAm,
           fivePm: fivePm
       })

    }


    checkForIcon = () => {

    }

    showStats = () => {
        return (
            <div>
                <Card.Img variant="top" src={sunny} />
                <Card.Text>
                    {this.state.elevenAm.base.wx_desc}
                </Card.Text>
                <Card.Text>
                    Temperature(F): {this.state.elevenAm.base.temp_f}
                </Card.Text>
                <Card.Text> 
                    Temp(feels like): {this.state.elevenAm.base.feelslike_f}
                </Card.Text>
                <Card.Text>
                    Snow (inches) : {this.state.elevenAm.base.freshsnow_in}
                </Card.Text>
                <Card.Text>
                    Wind Gusts : {this.state.elevenAm.base.windgst_mph}
                </Card.Text>
                <Card.Text>
                    Wind Speeds : {this.state.elevenAm.base.windspd_mph}
                </Card.Text>
        </div>)
        
        // return this.state.elevenAm.base.temp_f
        
    }

    render() {

        return (

            <div>
                <Card style={{width:"100%", height:"100%"}}>
                {this.checkForIcon()}
                    <Card.Body>
                        <Card.Title>{this.state.day} </Card.Title>
                        {this.showStats()}
                    </Card.Body>
                </Card> 
            </div>

        )
    }
}

export default WeatherCard