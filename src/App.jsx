import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 35,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  isSignedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  state = initialState;

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions;
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(clarifaiFace);

    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displyFaceBox = (box) => {
    this.setState({ box })
    // console.log(box);
  }

  onPictureSubmit = () => {
    if (!this.state.input) return
    this.setState({ imgUrl: this.state.input })
    fetch('https://limitless-mountain-93430.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response) {
          fetch('https://limitless-mountain-93430.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count
                }
              })
              // this.setState(
              //   Object.assign(this.state.user, {
              //     entries: count
              //   }))
            }).catch(err => console.log(err))
        }
        this.displyFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedin: true })
    }
    this.setState({ route })
  }
  render() {
    const { route, box, imgUrl, isSignedin, user } = this.state
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange} />
        {(route === 'home') ?
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognation box={box} imgUrl={imgUrl} />
          </div>
          : (
            route === 'signin' ?
              <Signin
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} />
              :
              <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;