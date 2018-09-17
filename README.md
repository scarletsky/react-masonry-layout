React Masonry Layout
====================

Masonry Layout base on [bricks.js](https://github.com/callmecavs/bricks.js) with React.
It comes with infinite scroll feature too !

## Install

```bash
$ npm install react-masonry-layout
```

## Usage

```js
import React from 'react'
import MasonryLayout from 'react-masonry-layout'

class Masonry extends React.Component {

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
```

## API

| props                      | type     | default                                                                                                             | description                                                                                                                                                      |
|----------------------------|----------|---------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                         | string   | `null`                                                                                                              | required                                                                                                                                                         |
| packed                     | string   | `data-packed`                                                                                                       | optional, see [Bricks.js](https://github.com/callmecavs/bricks.js)                                                                                               |
| sizes                      | array    | `[ { columns: 2, gutter: 20 }, { mq: '768px', columns: 3, gutter: 20 }, { mq: '1024px', columns: 6, gutter: 20 } ]` | optional, see [Bricks.js](https://github.com/callmecavs/bricks.js)                                                                                               |
| position                   | boolean  | `false`                                                                                                             | optional, see [Bricks.js](https://github.com/callmecavs/bricks.js)                                                                                               |
| className                  | string   | `''`                                                                                                                | optional, the css classname you want to use                                                                                                                      |
| style                      | object   | `{}`                                                                                                                | optional, the inline style you want to use                                                                                                                       |
| infiniteScroll             | function | `() => {}`                                                                                                          | optional, the function that used to load more data                                                                                                               |
| infiniteScrollContainer    | string   | `window`                                                                                                            | optional, by default, it will listen to the `window`'s `scroll` event. If you want to listen to some `div`'s `scroll` event, please set the container's id to it |
| infiniteScrollDisabled     | boolean  | `false`                                                                                                             | optional, if you don't want to trigger `infiniteScroll`, set it to `false`                                                                                       |
| infiniteScrollLoading      | boolean  | `false`                                                                                                             | optional, when you are loading data, please set it to `true`, then the `infiniteScroll` will not trigger                                                         |
| infiniteScrollEnd          | boolean  | `false`                                                                                                             | optional, when no more data, please set it to `true`, then the `infiniteScroll` will not trigger                                                                 |
| infiniteScrollDistance     | number   | `200`                                                                                                               | optional, the distance to trigger `infiniteScroll`                                                                                                               |
| infiniteScrollSpinner      | element  | `<div>this is a loader</div>`                                                                                       | optional, override it if you want to custom the loading spinner                                                                                                  |
| infiniteScrollEndIndicator | element  | `<div>no more data</div>`                                                                                           | optional, override it if you want to custom the no more data indicator                                                                                           |

- `getBricksInstance` return the instance of `bricks.js`.

```js
class C extends Component {
  onClick() {
    const bricksInstance = this.instance.getBricksInstance();
    // do stuffs
  }
  render = () => <MasonryLayout ref={instance => this.instance = instance}>
}
```

## License

MIT.
