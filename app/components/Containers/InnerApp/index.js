import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Wrapper } from '../../UIKit';
import { RegistrationHeader } from '../../Header';
import styles from './styles.scss';

export class InnerAppContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={styles.page}>
        <RegistrationHeader />
        <Wrapper>
          {this.props.children}
        </Wrapper>
      </div>
    );
  }
}

export default connect(() => ({}), {})(InnerAppContainer);
