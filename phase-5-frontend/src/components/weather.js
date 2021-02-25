import React, {Component} from 'react'

export default class Weather extends Component {

    componentDidMount() {
        fetch("http://localhost:3000/weather")
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
        })
    }


    render() {
        return (
            <div> hello</div>
        )
    }
}