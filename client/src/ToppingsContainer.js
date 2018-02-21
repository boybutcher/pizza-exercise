import React, { Component } from 'react';

class ToppingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'done',
      toppings: [],
    }
    this.statusChangeHandler = this.statusChangeHandler.bind(this);
    this.fetchToppings = this.fetchToppings.bind(this);
  }

  statusChangeHandler(currentStatus) {
    this.setState({
      status: currentStatus,
    });
  }

  fetchToppings() {
    this.statusChangeHandler('fetching...');
    fetch('http://files.olo.com/pizzas.json').then(response => {
        return response.json();
      }).then(data => {
        this.statusChangeHandler('sorting...');
        console.log('data: ', data);
      })
  }

  componentWillMount() {
    this.fetchToppings();
  }

  render() {
    return (
      <div>
        {this.state.status}
      </div>
    )
  }
}

export default ToppingsContainer;