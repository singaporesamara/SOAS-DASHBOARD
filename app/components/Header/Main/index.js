import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';

export class MainHeader extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props, context) { // eslint-disable-line no-useless-constructor
    super(props, context);
  }

  render() {
    return (
      <div className={styles.header}>
        <div className="pure-g">
          <div className="pure-u-3-5 text-left">
            <div className={styles.headerTitle}>{this.props.title}</div>
          </div>
          <div className="pure-u-2-5 text-right">
            icon..
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(MainHeader);
