import React, { Component } from 'react';
import MasonryLayout from 'react-masonry-layout';
import './App.css';

class App extends Component {

  state = {
    perPage: 10,
    items: Array(20).fill()
  }

  loadItems = () => {
      this.setState({
        items: this.state.items.concat(Array(this.state.perPage).fill())
      });
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Welcome to React Masonry Layout</h1>
        </header>

        <MasonryLayout
          id="masonry-layout"
          infiniteScroll={this.loadItems}>

          {this.state.items.map((v, i) => {
            let height = i % 2 === 0 ? 200 : 100;
            return (
              <div
                key={i}
                style={{
                  width: '100px',
                  height: `${height}px`,
                  lineHeight: `${height}px`,
                  color: 'white',
                  fontSize: '32px',
                  display: 'block',
                  background: 'rgba(0,0,0,0.7)'
                }}>
                {i}
              </div>
            )}
          )}

        </MasonryLayout>
      </div>
    );
  }
}

export default App;
