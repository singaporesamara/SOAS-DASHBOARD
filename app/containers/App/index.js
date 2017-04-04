import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

export class App extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node,
    layout: PropTypes.object.isRequired,
  };

  render() {
    const layout = this.props.layout.toJS();
    return (
      <div>
        <Helmet titleTemplate="%s - SOAS Pay" defaultTitle="SOAS Pay" meta={[{ name: 'description', content: 'SOAS Pay' }]} />
        {React.Children.toArray(this.props.children)}
        {layout.footer.show && <Footer />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    layout: state.get('layout'),
  };
}

export default connect(mapStateToProps, {})(withProgressBar(App));
