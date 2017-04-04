import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import styles from './styles.scss';

export class App extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node,
    layout: PropTypes.object.isRequired,
    page: PropTypes.object.isRequired,
  };

  render() {
    const layout = this.props.layout.toJS();
    const loading = this.props.page.get('loading');
    const blockUiStyle = styles.blockUIContainer;
    return (
      <div className={styles.app}>
        <Helmet titleTemplate="%s - SOAS Pay" defaultTitle="SOAS Pay" meta={[{ name: 'description', content: 'SOAS Pay' }]} />
        <BlockUi tag="div" className={blockUiStyle} blocking={loading}></BlockUi>
        {React.Children.toArray(this.props.children)}
        {layout.footer.show && <Footer />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    layout: state.get('layout'),
    page: state.getIn(['pages', 'current']),
  };
}

export default connect(mapStateToProps, {})(withProgressBar(App));
