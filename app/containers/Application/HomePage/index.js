import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BaseComponent from '../../Base';
import { MainAppContainer } from '../../../components/Containers';
import { MyBalance } from '../../../components/Profile/Balance';
import { EventsTable } from '../../../components/UIKit';
import { EWalletModalWidget } from '../../../components/Widgets';
import { layoutUpdate, loadPage } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import styles from './styles.scss';
import { FAKE_EVENTS } from './fake';

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
    Tabs.setUseDefaultStyles(false);
  }

  renderEvents() {
    return (
      <Tabs className="tabs -default">
        <TabList className="tabs-head" activeTabClassName="-selected">
          <Tab className="tabs-head-item">News</Tab>
          <Tab className="tabs-head-item">Transactions</Tab>
          <Tab className="tabs-head-item">Invoices</Tab>
        </TabList>
        <TabPanel className="tabs-content -tiny">
          <EventsTable events={FAKE_EVENTS} />
        </TabPanel>
        <TabPanel className="tabs-content">
          <div className={styles.pageEventsEmpty}>
            Sorry, there are no Transactions yet..
          </div>
        </TabPanel>
        <TabPanel className="tabs-content">
          <div className={styles.pageEventsEmpty}>
            Sorry, there are no Invoices yet..
          </div>
        </TabPanel>
      </Tabs>
    );
  }

  render() {
    const page = this.props.page.toJS();
    if (page.loading) return null;
    return (
      <MainAppContainer>
        <Helmet title="Home" />
        <EWalletModalWidget visible={true} />
        <div className={styles.page}>
          <div className={styles.pageBalance}>
            <MyBalance />
          </div>
          <div className={styles.pageEvents}>
            {this.renderEvents()}
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
