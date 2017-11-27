import React, { Component } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax, Background } from 'react-parallax';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './Style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Body/>
        <Footer/>
      </div>
    );
  }
}

class Header extends Component{
    render(){
        return (
            <div id = 'header'>
                <h1>React Météo</h1>
            </div>
        );
    }
}

class Footer extends Component{
    render(){
        return (
            <div id = 'footer'>
                
            </div>
        );
    }
}
class Body extends Component{
    render(){
        return (
            <div id = 'body'>
                    <div id='body-center'>
                       
                        <h2>Paris</h2>
                        <Parallax
                            offsetYMax={200}
                            offsetYMin={-200}
                            slowerScrollRate
                            tag="figure" >
                            <Section/>
                        </Parallax>
                    </div>
                        
            </div>
        );
    }
}
class Button extends Component{
    constructor(props){
        super(props);
        this.state = { color: "green" }; 
        this.click = this.click.bind(this);
    }
        click(){
            this.setState({
                color : "blue"
            })
        }
        render(){
        return (
            <button onClick={this.click} style={{color : this.state.color}}>Click</button>
        );
    }
}


class Section extends Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            date : []
        };
        const todaysDate = new Date();
        for(var i=0 ; i < 16 ; i++){
            var date = new Date(todaysDate.getTime()+i*1000*60*60*24);
            var dateString = date+"";
            var splitedDate = dateString.split(" ");
            this.state.date[i] = splitedDate[0]+" "+splitedDate[2]+" "+splitedDate[1]+" "+splitedDate[3];
        }
        console.log(this.state);
    }
    componentDidMount (){
      fetch('https://samples.openweathermap.org/data/2.5/forecast/daily?id=6455259&appid=b1b15e88fa797225412429c1c50c122a1')
         .then((response) => response.json())
         .then((responseJson) => {
            console.log(responseJson);
            this.setState({ list: responseJson.list }); 
            console.log(this.state.date);
        })
    }
    render(){
        return (
                this.state.list.map((item, i) => (
                <div key = {i} className="day">
                    <h3>{this.state.date[i]}</h3><br/>
                    <span>Temp min : {item.temp.min}</span><br/>
                    <span>Temp max : {item.temp.max}</span><br/>
                    <span>Pression  : {item.pressure}</span><br/>
                    <span className="description">{item.weather[0].description}</span><br/>
                </div>
                )            
            )
        );
    }
}
export default App;
