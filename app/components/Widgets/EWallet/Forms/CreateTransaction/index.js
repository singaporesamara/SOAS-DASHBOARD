import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import BaseComponent from '../../../../../containers/Base';
import { TextInput, TEXT_INPUT_THEMES, Button, BUTTON_THEMES } from '../../../../UIKit';
import styles from './styles.scss';

export class CreateTransactionForm extends BaseComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { number: null, expirationDate: null, cvc: null, amount: null };
    this.onFormSubmit = ::this.onFormSubmit;
    this.onValueChange = ::this.onValueChange;
  }

  onFormSubmit(event) {
    event.preventDefault();
    alert('hey..');
  }

  render() {
    const { widget } = this.props;
    const tiny = true;
    const footerStyles = classNames('pure-g form-row', styles.formFooter);
    console.info(widget);
    return (
      <div className={styles.form}>
        <form className="form" onSubmit={this.onFormSubmit}>
          <div className="form-row">
            <TextInput placeholder="Email or UEN" theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Purpose" theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Description" theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Amount" mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className="form-row">
            <TextInput placeholder="Upload" mask="digits" theme={TEXT_INPUT_THEMES.INTERNAL} />
          </div>
          <div className={footerStyles}>
            <div className="pure-u-1-2 form-col">
              <Button type="button" theme={BUTTON_THEMES.DEFAULT_GRAY_INVERSE} tiny={tiny}>Cancel</Button>
            </div>
            <div className="pure-u-1-2 form-col">
              <Button theme={BUTTON_THEMES.DEFAULT_BLUE_INVERSE} tiny={tiny}>Send</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    widget: state.getIn(['widgets', 'eWalletCreditCard']),
  };
}

export default connect(mapStateToProps, {})(CreateTransactionForm);
