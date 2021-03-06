import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import UpdateForm from './UpdateForm'


class Profile extends Component {
    
    state = {
        profile: {},
        form: false,
        user: "",
        skillLevel: ""
    }


    componentDidMount() {
        this.fetchprofile()
    }


    fetchprofile = () => {
        let id = localStorage.getItem("user")
        let token = localStorage.getItem("token")
        fetch("http://localhost:3000/profile",  {
            method: "GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(profile => {
            this.setState({
                profile: profile,
                user: profile.username,
                skillLevel: profile.skill
            })
        })
    }

    showForm = () => {
         this.setState(prevState => {
             return {
                 form: !prevState.form
             }
         })
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
      }


    handleSubmit = () => {
        let username = this.state.username
        let id = localStorage.getItem("user")
        let token = localStorage.getItem("token")
        let password = this.state.password
        let skill = this.state.skill
        let info = {username: username, password: password, skill: skill}
        fetch("http://localhost:3000/users/" + id, {
            method: "PATCH",
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                user: info
            })
        })
        .then(resp => resp.json())
        .then(user => {
            console.log(user)
            this.setState({
                user: user.user.username,
                skillLevel : user.user.skill
            })
        })
    }


    render() {
        return (
            <Container>
                <Row>
                    <h1> Profile Page</h1>
                </Row>
             
             <Row>
                 <Col>
                    <div>
                        <h2> Your Information:</h2>

                        <Col style={{background: "white"}}>
                            <h2> Username : {this.state.user}</h2>
                            <h3> Skill Level: {this.state.skillLevel} </h3>
                            <Button onClick={() => this.showForm()}> Update Information/Change Password</Button>
                        </Col>

                        <Col>
                        <br></br>
                        {this.state.form? <UpdateForm profile={this.state.profile} handleFormChange={this.handleFormChange} handleSubmit={this.handleSubmit} /> : null}
                        
                        </Col>
                        

                    </div>
                 </Col>
            </Row>  
            </Container>
            
        )
    }



}

export default Profile