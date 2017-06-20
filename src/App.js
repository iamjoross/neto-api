import React, { Component } from 'react';
// import Neto from 'neto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // const api = new Neto({ 
    //   uri: 'https://perceptivdigdev.neto.com.au', 
    //   apiKey: 'Ia7IHQHkqQWzr3CyQbzXFlK974rqCCYm' });

    // var order = {
    //   "Customer": [{
    //     "Username": "igorcerjancom20",
    //   }]
    // };

    // console.log(api);

    // api.getCustomer(order, function (err, res) {
    //   if (err) console.log(err);

    //   console.log(res);
    // });

    // const url = 'https://randomuser.me/api';
    const url = 'https://perceptivdigdev.neto.com.au/do/WS/NetoAPI';
    // The data we are going to send in our request
    let data = {
      name: 'Sara'
    }

    var myHeaders = new Headers();
    myHeaders.append('NETOAPI_ACTION', 'GetCustomer');
    myHeaders.append('NETOAPI_KEY', 'Ia7IHQHkqQWzr3CyQbzXFlK974rqCCYm');

    // Create our request constructor with all the parameters we need
    var request = new Request(url, {
      method: 'POST',
      // mode: 'no-cors',
      // body: data,
      headers: new Headers()
    });

    fetch(request)
      .then(function(response) { return response.json(); })
      .then(function(json) { console.log(json) }) 

    // fetch('https://randomuser.me/api')
    //   .then(function(response) { return response.json(); })
    //   .then(function(json) { console.log(json) })
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
