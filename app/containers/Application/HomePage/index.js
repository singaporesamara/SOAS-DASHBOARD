import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BaseComponent from '../../Base';
import { MainAppContainer } from '../../../components/Containers';
import { MyBalance } from '../../../components/Profile/Balance';
import { layoutUpdate, loadPage } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import styles from './styles.scss';

export class HomePage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    loadPage: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
  };

  constructor(props, context) { // eslint-disable-line no-useless-constructor
    super(props, context);
  }

  componentWillMount() {
    this.props.layoutUpdate(LAYOUT_NO_FOOTER);
    this.props.loadPage('application');
  }

  render() {
    const page = this.props.page.toJS();
    if (page.loading) return null;
    return (
      <MainAppContainer>
        <Helmet title="Home" />
        <div className={styles.page}>
          <div className={styles.pageBalance}>
            <MyBalance />
          </div>
        </div>
      </MainAppContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['pages', 'application']),
  };
}

export default connect(mapStateToProps, { layoutUpdate, loadPage })(HomePage);
