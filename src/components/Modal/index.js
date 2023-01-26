import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import * as css from "./css.module.scss"
class Modal extends PureComponent {
  state = {
    active: false,
    header: "",
    body: "",
    onAction: () => {},
    actions: this.props.actions,
  }

  set({ header, body, actions }) {
    this.setState({
      header,
      body,
      actions: actions === false ? false : true,
      key: Math.random(),
    })
    return this
  }
  setMessage(body) {
    this.setState({ body })
    return this
  }
  setBody(body) {
    this.setState({ body })
    return this
  }
  _onAction = () => {}
  onAction = onAction => (this._onAction = onAction)

  toggle() {
    if (this.state.active)
      document.querySelector("html").setAttribute("style", "overflow-y:hidden;")
    else document.querySelector("html").removeAttribute("style")
    this.setState({ active: !this.state.active })
    return this
  }
  show() {
    this.setState({ active: true })
    document.querySelector("html").setAttribute("style", "overflow-y:hidden;")
    return this
  }
  hide() {
    this.setState({ active: false, header: "", body: "" })
    document.querySelector("html").removeAttribute("style")
    return this
  }
  accept() {
    this._onAction(true, this)
    this.props.onAction(true, this)
  }
  cancel() {
    this._onAction(0, this)
    this.props.onAction(0, this)
  }
  render() {
    const handleAction = action => {
      this._onAction(action, this)
      this.props.onAction(action, this)
      this.hide()
    }

    return (
      <div
        className={[css.modal, this.state.active ? css.active : ""].join(" ")}
      >
        <div className={css.container}>
          <h1 className={css.header}>
            {this.state.header || this.props.header}
            <svg
              width="20"
              height="20"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => this.hide()}
            >
              <path
                d="M5.7945 1.00211L1.0025 5.79411"
                stroke="#595959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.796 5.797L1 1"
                stroke="#595959"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h1>
          <div className={css.content}>
            {this.state.body || this.props.children}
          </div>

          {this.state.actions ? (
            <div className={css.actions}>
              <div
                tabIndex={-1}
                role="button"
                className={css.accept}
                onKeyDown={() => {}}
                onClick={() => handleAction(1)}
              >
                {this.props.accept}
              </div>
              <div
                tabIndex={-1}
                role="button"
                className={css.cancel}
                onKeyDown={() => {}}
                onClick={() => handleAction(0)}
              >
                {this.props.cancel}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.bool,
  cancel: PropTypes.node,
  accept: PropTypes.node,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  onAction: PropTypes.func,
}
Modal.defaultProps = {
  cancel: <span>Cancel</span>,
  accept: <span>Accept</span>,
  actions: true,
  onCancel: () => {},
  onAccept: () => {},
  onAction: () => {},
}

export default Modal
