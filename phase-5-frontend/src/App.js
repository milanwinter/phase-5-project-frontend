import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MenuBar from './components/MenuBar'
import Authorization from './containers/Authorization'


class App extends Component {


  componentDidMount() {
  }

  handleUserInfo = (info) => {
    this.setState({
      userId: info
    })
  }
  


  render() {
    return (
      
      <Router>
        <div  >
          <MenuBar />
          <div>
          <Route exact path='/' render={routerProps => <Authorization {...routerProps} />} />
          </div>
        </div>
      </Router>
    );
  }



}

export default App;
