import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BaseComponent from '../../../Base';
import { MainAppContainer } from '../../../../components/Containers';
import { InvoiceTable } from '../../../../components/UIKit';
import { MyBalance } from '../../../../components/Profile/Balance';
import { EWalletTopUpModalWidget, EWalletCreateTransactionModalWidget, EWalletCreateInvoiceModalWidget } from '../../../../components/Widgets';
import { layoutUpdate, loadPage } from '../../../../actions/common';
import { LAYOUT_NO_FOOTER } from '../../../../constants/common';
import styles from './styles.scss';

export class CreateInvoicePage extends BaseComponent {
  static propTypes = {
    layoutUpdate: PropTypes.func.isRequired,
    loadPage: PropTypes.func.isRequired,
    page: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
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
    const invoice = { items: [
      {"code":"2123131", name: "iPhone 7S", "quantity":1,"description":"item 1","price":20},
      {"code":"2123131", name: "iPhone 7S", "quantity":2,"description":"item 2","price":40},
    ]};
    return (
      <Tabs className="tabs -default">
        <TabList className="tabs-head" activeTabClassName="-selected">
          <Tab className="tabs-head-item">Create Invoice</Tab>
        </TabList>
        <TabPanel className="tabs-content -tiny">
          <InvoiceTable invoice={invoice} />
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
        <Helmet title="Create Invoice" />
        <EWalletTopUpModalWidget />
        <EWalletCreateTransactionModalWidget />
        <EWalletCreateInvoiceModalWidget />
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
  };
}

export default connect(mapStateToProps, { layoutUpdate, loadPage })(CreateInvoicePage);
