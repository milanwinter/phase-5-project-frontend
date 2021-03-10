import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MenuBar from './components/MenuBar'
import Authorization from './containers/Authorization'
import HomePage from './containers/HomePage'
import Resorts from './containers/Resorts'
import ResortShow from './containers/ResortShow'
import Favorites from './containers/Favorites'
import ReviewPage from './containers/ReviewsPage'
import Profile from './components/Profile'
import Footer from './components/Footer'

class App extends Component {


  componentDidMount() {
  }


  


  render() {
    return (
      
      <Router>
        <div className="app" >
          <MenuBar />
          <div>
            <Route exact path='/home' render={routerProps => <HomePage {...routerProps} />} />
            <Route exact path='/' render={routerProps => <Authorization {...routerProps} />} />
            <Route exact path='/resorts' render={routerProps => <Resorts {...routerProps} />} />
            <Route exact path='/favorites' render={routerProps => <Favorites {...routerProps} />}/>
            <Route exact path='/reviews' render={routerProps => <ReviewPage {...routerProps} />} />
            <Route exact path='/profile' render={routerProps => <Profile {...routerProps} />} />
            <Route path='/resorts/:id' render={routerProps => <ResortShow {...routerProps} /> }/>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }



}

export default App;
