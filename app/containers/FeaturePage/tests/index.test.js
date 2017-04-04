import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import messages from '../messages';
import FeaturePage from '../index';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    expect(renderedComponent.contains(
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    )).toBe(true);
  });
});
