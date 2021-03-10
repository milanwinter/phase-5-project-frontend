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
        times : [
            {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
            {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
            {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
            {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
            {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
            {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
            {time: null, base:{ time: null, temp_f:null, freshsnow_in: null, windgst_mph: null, windspd_mph: null, wx_desc: null, wx_icon: null}},
        ],
        description: "",
        temp: "",
        freshsnow: "",
        windgust: "",
        timeObj: {},
        icon: "",
        finished: false,
        inches: 0
    }

    componentDidMount() {
        this.sortProps()
    }



    sortProps = () => {
       let day = Object.keys(this.props.day).toString()
       let data = this.props.day[day]
       let inches = data.reduce((a,b)=> a + b.base.freshsnow_in, 0)
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
           times: [
               first,second,third,fourth,fifth,sixth,seventh
           ],
           description: first.base.wx_desc,
           temp: first.base.temp_f,
           freshsnow: first.base.freshsnow_in,
           windgust: first.base.windgst_mph,
           icon: initialIcon,
           buttons: first,
           finished: true,
           inches: inches
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
            case "PartCloudSleetSnowThunderDay.gif":
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

    getTime = (time) => {
        if (time.time) {
            let num = parseInt(time.time)
            if (num < 12) {
                let amTime = num.toString() + "am"
                return amTime
            } else {
                let pmTime = (num-12).toString() + "pm"
                return pmTime
            }
        } else {
            return null
        }
    }

    getDay = () => {
        let timeArray = this.state.day.split("/")
        let month = timeArray[1]
        let day = timeArray[0]
        if(parseInt(month) < 10) {
            let date = month.slice(1) + "/" + day + "/" + "2020"
            return date
        } else {
            let otherDate = month + "/" + day + "/" + "2020"
            return otherDate
        }
    }

    


    handleChange = (time) => {
        let selection = time
        let choice = {}
        for (const moment in this.state.times) {
            if (this.state.times[moment] == selection) {
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
            buttons: choice
            
        })
      
    }
    
    createButtons = () => {
       
        return (   this.state.times.map(time => {
                return (<Button active={this.state.buttons === time? true: false} onClick={()=> this.handleChange(time)} size='sm'>{this.getTime(time)}</Button> )
            })   
        )
    }
    showStats = () => {
        return (
            <div >
                {/* <Card.Img variant="top" width="10%" height="10%" src={smallsnow} /> */}
                <Figure>
                    <Figure.Image
                        width={100}
                        height={100}
                        alt="resort icon"
                        src={this.state.icon}
                    />
                </Figure>
                <Card.Text>{this.getDay()}</Card.Text>
                <Card.Text>Day snowfall: {Math.round(this.state.inches * 2) / 2} inches</Card.Text>
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
                        {this.state.finished? this.createButtons(): null}
                    </ButtonGroup>
                </ButtonToolbar>
        </div>)
        
        
    }

    render() {

        return (

            <div>
                <Card className="weather-card" >
                    <Card.Body>
                        {this.showStats()}
                    </Card.Body>
                </Card> 
            </div>

        )
    }
}

export default WeatherCard