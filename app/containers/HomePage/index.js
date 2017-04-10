import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { layoutUpdate, loadPage } from '../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../constants/common';
import { Wrapper } from '../../components/UIKit';
import styles from './styles.scss';

export class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loadPage: PropTypes.func.isRequired,
    layoutUpdate: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
    this.props.loadPage('home');
  }

  render() {
    const page = this.props.page.toJS();
    if (page.loading) return null;

    return (
      <Wrapper>
        <div className={styles.page}>
          <div className={styles.pageTitle}>Home page...</div>
        </div>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['pages', 'home']),
  };
}

export default connect(mapStateToProps, { loadPage, layoutUpdate })(HomePage);
