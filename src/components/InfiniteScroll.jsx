import React, { PropTypes, Component } from 'react'

export default (ComposedComponent) => class I extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    infiniteScroll: PropTypes.func.isRequired,
    infiniteScrollContainer: PropTypes.string,
    infiniteScrollLoading: PropTypes.bool,
    infiniteScrollEdge: PropTypes.oneOf(['top', 'bottom']),
    infiniteScrollDistance: PropTypes.number,
    infiniteScrollDisabled: PropTypes.bool,
    infiniteScrollSpinner: PropTypes.element
  }

  static defaultProps = {
    infiniteScrollContainer: 'window',
    infiniteScrollLoading: false,
    infiniteScrollEdge: 'bottom',
    infiniteScrollDistance: 200,
    infiniteScrollDisabled: false,
    infiniteScrollSpinner: <div>this is a loader</div>
  }

  componentDidMount() {
    if (!this.props.infiniteScrollDisabled) {

      const { infiniteScrollContainer } = this.props

      if (infiniteScrollContainer === 'window') {
        window.addEventListener('scroll', ::this.handleScroll)
      } else {
        document
          .getElementById(infiniteScrollContainer)
          .addEventListener('mousewheel', ::this.handleScroll)
      }


    }
  }

  componentWillUnmount() {
    if (!this.props.infiniteScrollDisabled) {

      const { infiniteScrollContainer } = this.props

      if (infiniteScrollContainer === 'window') {
        window.removeEventListener('scroll', ::this.handleScroll)
      } else {
        document
          .getElementById(infiniteScrollContainer)
          .addEventListener('mousewheel', ::this.handleScroll)
      }

    }
  }

  handleScroll() {
    const { infiniteScroll, infiniteScrollLoading } = this.props
    if ( this.edgeDistance < this.props.infiniteScrollDistance
      && !infiniteScrollLoading ) {
      infiniteScroll()
    }
  }

  get infiniteScrollSpinner() {
    return this.props.infiniteScrollSpinner
  }

  get edgeDistance() {
    const { id } = this.props
    return this.props.infiniteScrollEdge === 'bottom'
      ? this.refs[id].getBoundingClientRect().bottom - window.innerHeight
      : this.refs[id].getBoundingClientRect().top * (-1)
  }

  render() {
    return (
      <div>
        <div ref={this.props.id} >
          <ComposedComponent {...this.props} />
        </div>
        {this.infiniteScrollSpinner}
      </div>
    )
  }

}
