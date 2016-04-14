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

  static defaultProps = {
    maxCount: 5,
    perPage: 20
  }

  state = {
    count: 0,
    isLoading: false,
    items: Array(20).fill()
  }


  getItems() {
    if (this.state.count >= this.props.maxCount) return
    this.setState(Object.assign(
      {},
      this.state,
      { isLoading: true }
    ), () => {
      setTimeout(() => {
        this.setState(Object.assign(
          {},
          this.state,
          {
            isLoading: false,
            items: this.state.items.concat(
              Array(perPage).fill()
            )
          }
        ))
      })
    })
  }

  render() {
    <MasonryLayout
      id="items"
      infiniteScroll={::this.getItems}
      infiniteScrollLoading={this.state.isLoading} >

      {this.state.items.map((v, i) => <div
        key={i}
        style={{
          width: '236px',
          height: `${i % 2 === 0 ? 4 * 50 : 50 }px`,
          display: 'block',
          background: 'rgba(0,0,0,0.7)'
        }}
        />)}

    </MasonryLayout>
  }
}
```

## API

|       props        |        type       |       default      |     description    |
|--------------------|-------------------|--------------------|--------------------|
|        id          |       string      |        `null`      | required           |
|      packed        |       string      |    `data-packed`   | optional, see [Bricks.js](https://github.com/callmecavs/bricks.js) |
|       size         |       array       |    `[ { columns: 2, gutter: 20 }, { mq: '768px', columns: 3, gutter: 20 }, { mq: '1024px', columns: 6, gutter: 20 } ]` | optional, see [Bricks.js](https://github.com/callmecavs/bricks.js) |
|     className      |       string      |         `''`       | optional, the css classname you want to use |
|       style        |       object      |         `{}`       | optional, the inline style you want to use |
|  infiniteScroll    |      function     |      `() => {}`    | optional, the function that used to load more data |
|  infiniteScrollContainer|  string     |        `window`    | optional, by default, it will listen to the `window`'s `scroll` event. If you want to listen to some `div`'s `scroll` event, please set the container's id to it |
|  infiniteScrollDisabled |  boolean    |       `false`      | optional, if you don't want to trigger `infiniteScroll`, set it to `false` |
|  infiniteScrollLoading  |  boolean    |       `false`      | optional, when you are loading data, please set it to `true`, then the `infiniteScroll` will not trigger |
|  infiniteScrollEnd      |  boolean    |       `false`      | optional, when no more data, please set it to `true`, then the `infiniteScroll` will not trigger |
|  infiniteScrollDistance |  number     |        `200`       | optional, the distance to trigger `infiniteScroll` |
|  infiniteScrollSpinner  |  element    | `<div>this is a loader</div>` | optional, override it if you want to custom the loading spinner |
|  infiniteScrollEndIndicator | element | `<div>no more data</div>`     | optional, override it if you want to custom the no more data indicator |


## License

GPL-3.0 (Because bricks.js use GPL-3.0)
