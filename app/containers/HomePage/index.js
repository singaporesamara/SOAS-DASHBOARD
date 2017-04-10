/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ROUTES } from '../../constants/routes';
import { Wrapper } from '../../components/UIKit';
import styles from './styles.scss';

export class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.push(ROUTES.USER.LOGIN);
  }

  render() {
    return (
      <Wrapper>
        <div className={styles.page}>
          <div className={styles.pageTitle}>Home page...</div>
        </div>
      </Wrapper>
    );
  }
}

export default connect(() => ({}), { push })(HomePage);
