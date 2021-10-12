import React from 'react'
import axios from 'axios'
import Footer from './footer'
import Wallpaper from './Wallpaper'
import QuickSerch from './QuickSerch'


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }
    }

    componentDidMount(){
        sessionStorage.clear();

        axios({
            url:'https://guarded-cliffs-31948.herokuapp.com/location',
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
        })
        .then(response =>{
            this.setState({locations:response.data.locations})
        })
        .catch( err => console.log(err))

        axios({
            url:'https://guarded-cliffs-31948.herokuapp.com/mealtype',
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
        })
        .then(response =>{
            this.setState({mealtypes:response.data.mealtypes})
        })
        .catch( err => console.log(err))
    }

    render(){
        const {locations,mealtypes  }= this.state
        return(
            <div>
                <Wallpaper locationData={locations}/>
                <QuickSerch mealtypeData={mealtypes}/>
            </div>
        )
    }
}
export default Home;