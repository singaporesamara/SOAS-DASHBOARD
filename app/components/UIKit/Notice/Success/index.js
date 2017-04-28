import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';
import successIcon from '../../../../assets/images/icons/success-circle.svg';

export default class SuccessNotice extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: PropTypes.string,
    icon: PropTypes.any,
  };

  render() {
    const noticeStyles = classNames(styles.notice, 'text-center');
    const icon = this.props.icon || successIcon;
    return (
      <div className={noticeStyles}>
        <div className={styles.noticeIcon}><img src={icon} alt="success" /></div>
        { /* eslint-disable */ }
        <div className={styles.noticeText} dangerouslySetInnerHTML={{ __html: this.props.message }}></div>
        { /* eslint-enable */ }
      </div>
    );
  }
}
