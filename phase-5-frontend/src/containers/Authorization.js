import React, {Component} from 'react' 
import Login from '../components/Login'
import Signup from '../components/Signup'

class Authorization extends Component {


    state = {
        status: false
    }

    toggleLogin = (e) => {
        this.setState(prevState => ({
            status: !prevState.status
        }))
    }

    handleSignup = (e) => {



    }

    handleLogin = (e) => {

        

    }


    checkAuth = () => {
        if (this.state.status) {
            return <Signup toggleLogin={this.toggleLogin} handleSignup={this.handleSignup} />
        } else {
            
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