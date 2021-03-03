import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import ResortCard from '../components/ResortCard'
import Row from 'react-bootstrap/Row'
class Favorites extends Component { 

    state = {
        resortIds : {},
        resorts: [],
        userFavorites: []
    }


    componentDidMount() {
        this.fetchFavorites()
    }

    fetchFavorites = () => {
        let userId = localStorage.getItem("user")
        fetch('http://localhost:3000/favorites')
        .then(resp => resp.json())
        .then(favorites => {
            let userFavorites = favorites.filter(favorite => favorite.user_id == userId)
            let resortIds = []
            userFavorites.forEach(favorite=> {
                resortIds.push(favorite.resort_id)
            });
            this.setState({
                resortIds: resortIds,
                userFavorites: userFavorites
            })
            this.fetchResorts()

        })
    }
    
    fetchResorts = () => {
        fetch('http://localhost:3000/resorts')
        .then(resp => resp.json())
        .then(resortsData => {
            let ids = this.state.resortIds
            let resorts = resortsData.filter(resort => ids.includes(resort.id))
            this.setState({
                resorts: resorts
            })
        
        })
    }


    handleGoButton = (id) => {
        this.props.history.push(`/resorts/${id}`)
    }

    removeFavorite = (id) => {
        let favoriteId = this.state.userFavorites.filter(fav => fav.resort_id == id)[0].id
        fetch(`http://localhost:3000/favorites/${favoriteId}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(json => {
            let newResorts = this.state.resorts.filter(resort => resort.id != id)
            this.setState({
                resorts: newResorts
            })
        })
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <h1 >Favorites!</h1>
                    </Row>
                    <Row>

                    { this.state.resorts.map(resort => {
                         return <ResortCard handleGoButton={this.handleGoButton} resort={resort}  removeFavorite={this.removeFavorite} fromFavorites={true} />
                    })} 
                    </Row>

                  
                </Container>
               
            </div>
            
        )
    }
}

export default Favorites