import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default (ComposedComponent) => class I extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    infiniteScroll: PropTypes.func,
    infiniteScrollContainer: PropTypes.string,
    infiniteScrollLoading: PropTypes.bool,
    infiniteScrollEnd: PropTypes.bool,
    infiniteScrollEdge: PropTypes.oneOf(['top', 'bottom']),
    infiniteScrollDistance: PropTypes.number,
    infiniteScrollDisabled: PropTypes.bool,
    infiniteScrollSpinner: PropTypes.element,
    infiniteScrollEndIndicator: PropTypes.element
  }

  static defaultProps = {
    infiniteScroll: () => {},
    infiniteScrollContainer: 'window',
    infiniteScrollLoading: false,
    infiniteScrollEnd: false,
    infiniteScrollEdge: 'bottom',
    infiniteScrollDistance: 200,
    infiniteScrollDisabled: false,
    infiniteScrollSpinner: <div>this is a loader</div>,
    infiniteScrollEndIndicator: <div>no more data</div>
  }

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    if (!this.props.infiniteScrollDisabled) {

      const { infiniteScrollContainer } = this.props

      if (infiniteScrollContainer === 'window') {
        window.addEventListener('scroll', this.handleScroll)
      } else {
        document
          .getElementById(infiniteScrollContainer)
          .addEventListener('mousewheel', this.handleScroll)
      }

    }
  }

  componentWillUnmount() {
    if (!this.props.infiniteScrollDisabled) {

      const { infiniteScrollContainer } = this.props

      if (infiniteScrollContainer === 'window') {
        window.removeEventListener('scroll', this.handleScroll)
      } else {
        document
          .getElementById(infiniteScrollContainer)
          .removeEventListener('mousewheel', this.handleScroll)
      }

    }
  }

  handleScroll() {
    const { infiniteScroll, infiniteScrollLoading, infiniteScrollEnd } = this.props
    if ( this.edgeDistance < this.props.infiniteScrollDistance
      && !infiniteScrollLoading
      && !infiniteScrollEnd ) {
      infiniteScroll()
    }
  }

  getBricksInstance() {
    return this.instanceElement.getBricksInstance();
  }

  get edgeDistance() {
    return this.props.infiniteScrollEdge === 'bottom'
      ? this.containerElement.getBoundingClientRect().bottom - window.innerHeight
      : this.containerElement.getBoundingClientRect().top * (-1)
  }

  render() {
    return (
      <div>
        <div ref={(element) => { this.containerElement = element; }} >
          <ComposedComponent
            ref={(element) => { this.instanceElement = element; }}
            {...this.props} />
        </div>
        {this.props.infiniteScrollLoading && this.props.infiniteScrollSpinner}
        {this.props.infiniteScrollEnd && this.props.infiniteScrollEndIndicator}
      </div>
    )
  }

}
