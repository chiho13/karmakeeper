import React from 'react';

export default class TitleBar extends React.Component {
  renderSubtitle() {
      if (this.props.subtitle) {
        return  <div className="titleBar__subtitle"> {this.props.subtitle}</div>
      }
  }

  render() {
    return (
      <div className="title-bar">
      <div className="wrapper">
       <h1 className="title-bar__title"> {this.props.title}</h1>
        {this.renderSubtitle()}
        </div>
      </div>
    )
  }
}

TitleBar.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string
}
