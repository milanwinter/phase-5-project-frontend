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
        times : {
        first: {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
        second: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null,  wx_desc: null, wx_icon: null}},
        third: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null, wx_desc: null, wx_icon: null}},
        fourth: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null,  wx_desc: null, wx_icon: null}},
        fifth: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null,  wx_desc: null, wx_icon: null}},
        sixth: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null,  wx_desc: null, wx_icon: null}},
        seventh: {time: null, base: { temp_f:null, freshsnow_in: null, windgst_mph: null,  wx_desc: null, wx_icon: null}},
        },
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
       let first = data[0]
       let second= data[1]
       let third= data[2]
       let fourth= data[3]
       let fifth=data[4]
       let sixth=data[5]
       let seventh=data[6]
       let initialIcon = this.getImage(first.base.wx_icon)
       this.setState({
           day: day,
           times: {
               first: first, second: second, third: third, fourth: fourth, fifth: fifth, sixth:sixth, seventh: seventh
           },
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
        let time = e.target.innerText + ":00"
        let choice = {}
        for (const moment in this.state.times) {
            if (this.state.times[moment].time == time) {
                choice = this.state.times[moment]
            }
        
        }
        console.log(choice)
        let image = this.getImage(choice.base.wx_icon)

        this.setState({
            description: choice.base.wx_desc,
            temp: choice.base.temp_f,
            freshsnow: choice.base.freshsnow_in,
            windgust: choice.base.windgst_mph,
            icon: image,
            
        })
      
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
                        
                        <Button active={this.state.buttons.one} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.times.first.time? this.state.times.first.time.slice(0,2) : null}</Button> 
                        <Button active={this.state.buttons.two} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.times.second.time? this.state.times.second.time.slice(0,2) : null}</Button> 
                        <Button active={this.state.buttons.three} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.times.third.time? this.state.times.third.time.slice(0,2) : null}</Button> 
                        <Button active={this.state.buttons.four} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.times.fourth.time? this.state.times.fourth.time.slice(0,2) : null}</Button>
                        <Button active={this.state.buttons.four} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.times.fifth.time? this.state.times.fifth.time.slice(0,2): null}</Button>
                        <Button active={this.state.buttons.four} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.times.sixth.time? this.state.times.sixth.time.slice(0,2): null}</Button>
                        <Button active={this.state.buttons.four} onClick={(e)=> this.handleChange(e)} size='sm'>{this.state.times.seventh.time? this.state.times.seventh.time.slice(0,2): null} </Button>
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