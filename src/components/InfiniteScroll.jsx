import React, { PropTypes, Component } from 'react'

export default (ComposedComponent) => class I extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    infiniteScroll: PropTypes.func.isRequired,
    infiniteScrollLoading: PropTypes.bool,
    infiniteScrollEdge: PropTypes.oneOf(['top', 'bottom']),
    infiniteScrollDistance: PropTypes.number,
    infiniteScrollDisabled: PropTypes.bool,
    infiniteScrollSpinner: PropTypes.element
  }

  static defaultProps = {
    infiniteScrollLoading: false,
    infiniteScrollEdge: 'bottom',
    infiniteScrollDistance: 200,
    infiniteScrollDisabled: false
  }

  state = {
    lastScrollTop: 0 // 用来计算滚动方向
  }

  componentDidMount() {
    if (!this.props.infiniteScrollDisabled) {
      window.addEventListener('scroll', ::this.handleScroll)
    }
  }

  componengWillUnmount() {
    if (!this.props.infiniteScrollDisabled) {
      window.removeEventListener('scroll', ::this.handleScroll)
    }
  }

  handleScroll() {
    const { id, infiniteScroll, infiniteScrollLoading } = this.props
    let scrollTop = document.body.scrollTop
    let bottom = window.innerHeight - this.refs[id].getBoundingClientRect().bottom
    if ( bottom > 0
      && scrollTop > this.state.lastScrollTop
      && infiniteScrollLoading === false
      && typeof infiniteScroll === 'function'
    ) {
      infiniteScroll()
    }

    this.setState(Object.assign({}, this.state, { lastScrollTop: scrollTop }))
  }

  get infiniteScrollSpinner() {
    return this.props.infiniteScrollSpinner || <div>this is a loader</div>
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
