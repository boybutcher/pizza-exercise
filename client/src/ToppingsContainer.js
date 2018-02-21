import React, { Component } from 'react';

class ToppingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'done',
      toppings: [],
    }
    this.statusChangeHandler = this.statusChangeHandler.bind(this);
    this.trackToppings = this.trackToppings.bind(this);
    this.fetchToppings = this.fetchToppings.bind(this);
  }

  statusChangeHandler(currentStatus) {
    this.setState({
      status: currentStatus,
    });
  }

  trackToppings(arr) {
    let toppingTracker = {};
    arr.forEach(pizzaObj => {
      const toppingsArr = pizzaObj.toppings;
      toppingsArr.forEach(topping => {
        if (toppingTracker[topping]) {
          toppingTracker[topping]++;
        } else {
          toppingTracker[topping] = 1;
        }
      })
    })
    return toppingTracker;
  }

  splinterToppingsToObjs(obj) {
    let toppingsArr = [];
    for (let topping in obj) {
      let toppingObj = {
        topping: topping,
        count: obj[topping],
      }
      if (toppingsArr.length === 0) {
        toppingsArr.push(toppingObj);
      } else {
        for (let i = 0; i < toppingsArr.length; i++) {
          let currentItemCount = toppingsArr[i].count;
          if (toppingObj.count > currentItemCount) {
            toppingsArr.splice(i, 0, toppingObj);
          }
        }
      }
    }
    return toppingsArr;
  }

  fetchToppings() {
    this.statusChangeHandler('fetching...');
    fetch('http://files.olo.com/pizzas.json').then(response => {
        return response.json();
      }).then(data => {
        this.statusChangeHandler('tallying...');
        return this.trackToppings(data);
      }).then(talliedObj => {
        this.statusChangeHandler('parsing...');
        return this.splinterToppingsToObjs(talliedObj);
      }).then(unsortedToppingsArr => {
        this.statusChangeHandler('sorting...');
        console.log('unsortedToppingsArr: ', unsortedToppingsArr);
      }).catch(error => {
        this.statusChangeHandler('something went wrong!');
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