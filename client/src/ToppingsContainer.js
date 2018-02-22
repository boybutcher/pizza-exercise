import React, { Component } from 'react';
import ComboItem from './ComboItem.js';

class ToppingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      toppings: [],
    }
    this.trackToppings = this.trackToppings.bind(this);
    this.sortByCount = this.sortByCount.bind(this);
    this.fetchToppings = this.fetchToppings.bind(this);
  }

  trackToppings(arr) {
    let toppingTracker = {};
    arr.forEach(pizzaObj => {
      const comboName = pizzaObj.toppings.sort().join(', ');
      toppingTracker[comboName] ? toppingTracker[comboName]++ : toppingTracker[comboName] = 1;
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
      toppingsArr.push(toppingObj);
    }
    return toppingsArr;
  }

  sortByCount(arr) {
    return arr.sort((a, b) => {
      return a.count - b.count;
    }).slice(-20).reverse();
  }

  async fetchToppings() {
    const data = await fetch('http://files.olo.com/pizzas.json')
      .then(response => response.json())
      .catch(error => 
        console.error('error: ', error)
      );
    const talliedObj =  this.trackToppings(data);
    const unsortedToppingsArr = this.splinterToppingsToObjs(talliedObj);
    const sortedToppingsArr = this.sortByCount(unsortedToppingsArr);
    this.setState({
      toppings: sortedToppingsArr,
      isLoaded: true,
    })
  }

  componentWillMount() {
    this.fetchToppings();
  }

  render() {
    const {
      isLoaded, 
      toppings,
    } = this.state;

    const table = (
      <table className='toppings-container'>
        <thead>
          <tr>
            <th>#</th>
            <th>toppings combination </th>
            <th>count</th>
          </tr>
        </thead>
        <tbody>
          {toppings.map((pizzaObj, index) => {
            return <ComboItem index={index + 1} comboObj={pizzaObj} key={index}/>
          })}
        </tbody>
      </table>
    );

    return (
      <div className='topping-container'>
        { isLoaded ? table : <div>fetching...</div>  }
      </div>
    )
  }
}

export default ToppingsContainer;
