import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BaseComponent from '../../Base';
import { MainAppContainer } from '../../../components/Containers';
import { MyBalance } from '../../../components/Profile/Balance';
import { EventsTable } from '../../../components/UIKit';
import { EWalletTopUpModalWidget, EWalletCreateTransactionModalWidget } from '../../../components/Widgets';
import { layoutUpdate, loadPage } from '../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../constants/common';
import { TYPES as EVENT_TYPES } from '../../../constants/events';
import styles from './styles.scss';

export class HomePage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    loadPage: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
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
    const events = this.props.events.toJS();
    const transactions = filter(events, (event) => event.type === EVENT_TYPES.TRANSACTION);
    return (
      <Tabs className="tabs -default">
        <TabList className="tabs-head" activeTabClassName="-selected">
          <Tab className="tabs-head-item">News</Tab>
          <Tab className="tabs-head-item">Transactions</Tab>
          <Tab className="tabs-head-item">Invoices</Tab>
        </TabList>
        <TabPanel className="tabs-content -tiny">
          <EventsTable events={events} />
        </TabPanel>
        <TabPanel className="tabs-content -tiny">
          <EventsTable events={transactions} />
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
    const { profile } = this.props.user.toJS();
    if (page.loading || !profile) return null;
    return (
      <MainAppContainer>
        <Helmet title="Home" />
        <EWalletTopUpModalWidget />
        <EWalletCreateTransactionModalWidget />
        <div className={styles.page}>
          <div className={styles.pageBalance}>
            <MyBalance profile={profile} />
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
    user: state.get('user'),
    page: state.getIn(['pages', 'application']),
    events: state.getIn(['entities', 'events']),
  };
}

export default connect(mapStateToProps, { layoutUpdate, loadPage })(HomePage);
