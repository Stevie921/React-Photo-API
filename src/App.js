import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
     <Images/>
    );
  }
}

class Images extends Component {
  constructor(props){
    super(props);

    this.state = {
      key: "563492ad6f917000010000015feb941e6d50488d842a016b838a0ba1",
      value: "city"
    }

   this.handleChange = this.handleChange.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.useAPI = this.useAPI.bind(this);
}

   //API CALL
   useAPI(){
    let gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    fetch("https://api.pexels.com/v1/search?query=" + this.state.value + "&per_page=16&page=1",{
      method: "get",
      headers: new Headers({
        "Authorization": this.state.key
      }),
     }).then(res => res.json())
       .then(
        (result) => {
          for(let i = 0; i < result.photos.length; i++){
           //CREATE ELEMENTS
           let container = document.createElement("div");
           let image = document.createElement("img");
           let info = document.createElement("div");
           //ADD CLASSES AND SOURCES
           container.classList.add("container");
           info.classList.add("info");
           image.src = result.photos[i].src.landscape;
           info.innerHTML = "source of photo";
           //APPEND ELEMENTS
           gallery.appendChild(container);
           container.appendChild(image);
           info.innerHTML = "Source: " + result.photos[i].photographer + "<br><a href=" + result.photos[i].url + " target='_blank'>Photo Link</a>";
           container.appendChild(info);
           }
         },
         (error) => {
          console.log(error);
        }
      )
   }


  componentDidMount(){
     this.useAPI();
    }
   
   //SET STATE VALUE TO USER INPUT AND RUN API CALL IF ENTER IS PRESSED
   handleChange(e){
      this.setState({
        value: e.target.value
      });
      if(e.key === "Enter"){
        this.useAPI();
      }
    }

    //RUN API CALL IF SEARCH BUTTON IS CLICKED
    handleClick(){
      this.useAPI();
    }

   render(){
      return(
        <div className="image-container">
          <h1>Search Pexels Images</h1>
         <input type="text" placeholder="search for images" defaultValue={this.state.value} onKeyUp={this.handleChange}/>
         <button onClick={this.handleClick}>Search</button>
         <h2>Image Gallery</h2>
         <div className="gallery"></div>
        </div>
        )
     }
}

export default App;


