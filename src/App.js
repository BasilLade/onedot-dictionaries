import React, { Component } from 'react';
import './App.css';

import AddProduct from './AddProduct';
import ProductItem from './ProductItem';
import ColorItem from './ColorItem';

const products = [
  {
    name: 'Apple iPhone 6s',
    color: 'Dark Grey',
    price: 769
  },
  {
    name: 'Samsung Galaxy S8',
    color: 'Black',
    price: 569
  },
  {
    name: 'Huawei P9',
    color: 'Silver',
    price: 272
  }
];

const colors = [
  {
    domain: 'Stonegrey',
    range: 'Dark Grey'
  },
  {
    domain: 'Midnight Black',
    range: 'Black'
  },
  {
    domain: 'Mystic Silver',
    range: 'Silver'
  }
];

localStorage.setItem('products', JSON.stringify(products));
localStorage.setItem('colors', JSON.stringify(colors));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products')),
      colors: JSON.parse(localStorage.getItem('colors'))
    };

    this.onProductAdd = this.onProductAdd.bind(this);
    this.onProductDelete = this.onProductDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount() {
    const products = this.getProducts();
    const colors = this.getColors();

    this.setState({ products, colors});
  }

  getProducts() {
    return this.state.products;
  }

  getColors() {
    return this.state.colors;
  }

  onProductAdd(name, price) {
    const products = this.getProducts();

    products.push({
      name,
      price
    });

    this.setState({ products });
    
  }

  onProductDelete(name) {
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.name !== name;
    })

    this.setState({ products: filteredProducts });
  }

  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();

    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }

      return product;
    });

    this.setState({ products });
  }

  render() {
    return (
      <div className="App">
        <h1> Products Manager </h1>

        <AddProduct
          onProductAdd={this.onProductAdd}
        
        />

        
        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key={product.name}
                {...product}
                colors={colors}
                onProductDelete={this.onProductDelete}
                onProductEditSubmit={this.onProductEditSubmit}
              />
            );
          })
        }
        
        {
          this.state.colors.map(color => {
            return (
              <ColorItem
                key={color.range}
                {...color}
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit}
              />
            );
          })
        }
      </div>
    );
  }
}

export default App;
