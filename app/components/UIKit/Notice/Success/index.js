import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';
import successIcon from '../../../../assets/images/icons/success-circle.svg';

export default class SuccessNotice extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: PropTypes.string,
  };

  render() {
    const noticeStyles = classNames(styles.notice, 'text-center');
    return (
      <div className={noticeStyles}>
        <div className={styles.noticeIcon}><img src={successIcon} alt="success" /></div>
        { /* eslint-disable-line react/no-danger */ }
        <div className={styles.noticeText} dangerouslySetInnerHTML={{ __html: this.props.message }}></div>
        { /* eslint-enable-line react/no-danger */ }
      </div>
    );
  }
}
