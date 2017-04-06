import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';

export class InnerAppContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={styles.page}>
        <div>Header is gonna be here..</div>
        <div className={styles.pageContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(InnerAppContainer);
