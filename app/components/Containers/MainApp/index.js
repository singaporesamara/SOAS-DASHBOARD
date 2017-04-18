import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MainHeader } from '../../Header';
import { MainSidebar } from '../../Sidebar';
import styles from './styles.scss';

export class MainAppContainer extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.pageSidebar}>
          <MainSidebar />
        </div>
        <div className={styles.pageContent}>
          <div className={styles.pageHeader}>
            <MainHeader title="Account" />
          </div>
          <div className={styles.pageContentWrapper}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), {})(MainAppContainer);
