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

- **id** `String` (Required)

- **packed** `String`

  default: `data-packed`

- **size**: `Array`

  default:
  ```
  [
    { columns: 2, gutter: 20 },
    { mq: '768px', columns: 3, gutter: 20 },
    { mq: '1024px', columns: 6, gutter: 20 }
  ]
  ```

- **className** `String`

  default: `''`

- **style** `Object`

  default: `{}`

- **infiniteScroll** `Function`

  default: `() => {}`

- **infiniteScrollLoading** `Boolean`

  default: `false`

- **infiniteScrollDistance** `Int`

  default: `200`

- **infiniteScrollDisabled** `Boolean`

  default: `false`

- **infiniteScrollSpinner** `Element`

  default: `<div>this is a spinner</div>`


## License

MIT
