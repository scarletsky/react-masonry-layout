import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Bricks from 'bricks.js'
import InfiniteScroll from './InfiniteScroll'

@InfiniteScroll
class MasonryLayout extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    packed: PropTypes.string,
    sizes: PropTypes.array,
    position: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  }

  static defaultProps = {
    style: {},
    className: '',
    packed: 'data-packed',
    position: false,
    sizes: [
      { columns: 2, gutter: 20 },
      { mq: '768px', columns: 3, gutter: 20 },
      { mq: '1024px', columns: 6, gutter: 20 }
    ]
  }

  componentDidMount() {
    const instance = Bricks({
      container: `#${this.props.id}`,
      packed: this.props.packed,
      sizes: this.props.sizes,
      position: this.props.position
    });

    instance.resize(true)

    if (this.props.children.length > 0) {
      instance.pack()
    }

    this.bricksInstance = instance;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children.length === 0 && this.props.children.length === 0)
      return

    if (prevProps.children.length === 0 && this.props.children.length > 0) {
      return this.bricksInstance.pack()
    }

    if (prevProps.children.length !== this.props.children.length) {
      return this.bricksInstance.update()
    }
  }

  componentWillUnmount() {
    this.bricksInstance.resize(false)
  }

  getBricksInstance() {
    return this.bricksInstance;
  }

  render() {
    const { id, className, style, children } = this.props;
    return (
      <div
        id={id}
        className={className}
        style={style}
        >
        {children}
      </div>
    );
  }
}

export default MasonryLayout;
