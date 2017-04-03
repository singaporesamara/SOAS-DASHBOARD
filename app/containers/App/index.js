/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';

export function App(props) {
  return (
    <div>
      <Helmet titleTemplate="%s - SOAS Pay" defaultTitle="SOAS Pay" meta={[{ name: 'description', content: 'SOAS Pay' }]} />
      {React.Children.toArray(props.children)}
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
