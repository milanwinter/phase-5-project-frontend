import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// icons

import sunny from '../icons/sunny2.png'
import snow from '../icons/snow.png'
import smallsnow from '../icons/smallsnow.png'
import blizzard from '../icons/blizzard.png'
import cloudy from '../icons/cloudy.png'
import foggy from '../icons/foggy.png'
import lightning from '../icons/lightning.png'
import rainy from '../icons/rainy.png'
import sleet from '../icons/sleet.png'



import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import FigureImage from 'react-bootstrap/FigureImage'
import Figure from 'react-bootstrap/Figure'



class WeatherCard extends Component {

    state = {
        day: "",
        first: {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
        second: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null,  wx_desc: null, wx_icon: null}},
        third: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null, wx_desc: null, wx_icon: null}},
        fourth: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null,  wx_desc: null, wx_icon: null}},
        description: "",
        temp: "",
        freshsnow: "",
        windgust: "",
        buttons: {one: true, two: false, three: false, four: false},
        icon: ""
    }

    componentDidMount() {
        this.sortProps()
    }



    sortProps = () => {
        console.log("in sort props")
        console.log(this.props.day)
       let day = Object.keys(this.props.day).toString()
       let data = this.props.day[day]
       console.log(data[2])
       let first = data[2]
       let second= data[3]
       let third= data[4]
       let fourth= data[5]
       let initialIcon = this.getImage(first.base.wx_icon)
       this.setState({
           day: day,
           first: first,
           second: second,
           third: third,
           fourth: fourth,
           description: first.base.wx_desc,
           temp: first.base.temp_f,
           freshsnow: first.base.freshsnow_in,
           windgust: first.base.windgst_mph,
           icon: initialIcon
       })

    }

    // linking icon description to weather image here //

    getImage = (icon) => {
        switch (icon) {
            case "Clear.gif":
            case "Sunny.gif":
               return sunny
            break;
            case "Blizzard.gif":
            case "HeavySnow.gif":
            case "HeavySnowSwrsDay.gif":
            case "HeavySnowSwrsNight.gif":
                return blizzard
                break;
            case "CloudRainThunder.gif":
            case "FreezingRain.gif":
            case "HeavyRain.gif":
            case "HeavyRainSwrsDay.gif":
            case "HeavyRainSwrsNight.gif":
            case "IsoRainSwrsDay.gif":
            case "IsoRainSwrsNight.gif":
            case "ModRain.gif":
            case "ModRainSwrsDay.gif":
            case "OccLightRain.gif":
            case "PartCloudRainThunderDay.gif":
            case "PartCloudRainThunderNight.gif":
            case "FreezingDrizzle.gif":
                return rainy
                break;
            case "CloudSleetSnowThunder.gif":
            case "HeavySleet.gif":
            case "HeavySleetSwrsDay.gif":
            case "HeavySleetSwrsNight.gif":
            case "IsoSleetSwrsDay.gif":
            case "IsoSleetSwrsNight.gif":
            case "ModSleet.gif":
            case "ModSleetSwrsDay.gif":
            case "ModSleetSwrsNight.gif":
            case "OccLightSleet.gif":
            case "PartCloudSleetSnowThunderNight.gif":
             return sleet
             break;
            case "Cloudy.gif":
            case "Overcast.gif":
            case "PartlyCloudyDay.gif":
            case "PartlyCloudyNight.gif":
                return cloudy
                break;
            case "Fog.gif":
            case "FreezingFog.gif":
            case "Mist.gif":
                return foggy
                break;
            case "IsoSnowSwrsDay.gif":
            case "IsoSnowSwrsNight.gif":
            case "ModSnow.gif":
            case "ModSnowSwrsDay.gif":
            case "ModSnowSwrsNight.gif":
            case "OccLightSnow.gif":
                return snow
                break;
            default:
                break;
        }
    }

    


    handleChange = (e) => {
        switch (e.target.innerText) {
            case this.state.first.time:
                let firstImage = this.getImage(this.state.first.base.wx_icon)
                this.setState({
                    description: this.state.first.base.wx_desc,
                    temp: this.state.first.base.temp_f,
                    freshsnow: this.state.first.base.freshsnow_in,
                    windgust: this.state.first.base.windgst_mph,
                    buttons: {one: true, two: false, three: false, four: false},
                    icon: firstImage
                })
                break;
            case this.state.second.time:
                let secondImage = this.getImage(this.state.second.base.wx_icon)
                this.setState({
                    description: this.state.second.base.wx_desc,
                    temp: this.state.second.base.temp_f,
                    freshsnow: this.state.second.base.freshsnow_in,
                    windgust: this.state.second.base.windgst_mph,
                    buttons: {one: false, two: true, three: false, four: false},
                    icon: secondImage
                })
                break;
            case this.state.third.time:
                let thirdImage = this.getImage(this.state.third.base.wx_icon)
                this.setState({
                    description: this.state.third.base.wx_desc,
                    temp: this.state.third.base.temp_f,
                    freshsnow: this.state.third.base.freshsnow_in,
                    windgust: this.state.third.base.windgst_mph,
                    buttons: {one: false, two: false, three: true, four: false},
                    icon: thirdImage
                })
                break;

            case  this.state.fourth.time:
                let fourthImage = this.getImage(this.state.fourth.base.wx_icon)
                this.setState({
                    description: this.state.fourth.base.wx_desc,
                    temp: this.state.fourth.base.temp_f,
                    freshsnow: this.state.fourth.base.freshsnow_in,
                    windgust: this.state.fourth.base.windgst_mph,
                    buttons: {one: false, two: false, three: false, four: true},
                    icon: fourthImage
                })
                break;
            default:
                break;
        }
    }

    showStats = () => {
        return (
            <div>
                {/* <Card.Img variant="top" width="10%" height="10%" src={smallsnow} /> */}
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="resort icon"
                        src={this.state.icon}
                    />
                </Figure>
                <Card.Text>{this.state.day}</Card.Text>
                <Card.Text>
                    {this.state.description}
                </Card.Text>
                <Card.Text>
                    Temp(F): {this.state.temp}
                </Card.Text>
                <Card.Text>
                    Snow (inches) : {this.state.freshsnow}
                </Card.Text>
                <Card.Text>
                    Wind Gusts : {this.state.windgust} mph
                </Card.Text>
                <br></br>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-2" aria-label="First group">
                        <Button active={this.state.buttons.one} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.first.time}</Button> 
                        <Button active={this.state.buttons.two} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.second.time}</Button> 
                        <Button active={this.state.buttons.three} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.third.time}</Button> 
                        <Button active={this.state.buttons.four} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.fourth.time}</Button>
                    </ButtonGroup>
                </ButtonToolbar>
        </div>)
        
        
    }

    render() {

        return (

            <div>
                <Card style={{width:"120%", height:"100%"}}>
                    <Card.Body>
                        {this.showStats()}
                    </Card.Body>
                </Card> 
            </div>

        )
    }
}

export default WeatherCard