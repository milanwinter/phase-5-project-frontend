import React, {Component} from 'react' 
import Login from '../components/Login'
import Signup from '../components/Signup'

class Authorization extends Component {


    state = {
        status: false,
        skill: "Beginner"
    }

    toggleLogin = (e) => {
        this.setState(prevState => ({
            status: !prevState.status
        }))
    }

    handleFormChange = (e) => {
      this.setState({
          [e.target.name] : e.target.value
      })
    }

    handleSignup = (e) => {
        console.log("hi")
        let username = this.state.username
        let password = this.state.password
        let skill = this.state.skill
        let info = {username: username, password: password, skill: skill}
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                user: info
            })
        })
        .then(resp => resp.json())
        .then(json => {
           
            if (json.user) {
                this.props.history.push("/home")
                localStorage.setItem("token", json.jwt)
                localStorage.setItem("user",json.user.id)
            } else {
                alert("Whoops something went wrong")
            }
        })
    }

    handleLogin = (e) => {
        let username = this.state.username
        let password = this.state.password
        let info = {username: username, password: password}
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                user: info
            })
        })
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            
            if (json.user) {
                this.props.history.push("/home")
                localStorage.setItem("token", json.jwt)
                localStorage.setItem("user",json.user.id)
            } else {
                alert("Whoops something went wrong")
            }
        })

    }


    checkAuth = () => {
        if (this.state.status) {
            return <Signup handleFormChange={this.handleFormChange} toggleLogin={this.toggleLogin} handleSignup={this.handleSignup} />
        } else {
            return <Login handleFormChange={this.handleFormChange} toggleLogin={this.toggleLogin} handleLogin={this.handleLogin} />
        } 
    }
    







    render() {
        return (
            <div>
                {this.checkAuth()}
            </div>
        )
    }
}

export default Authorization