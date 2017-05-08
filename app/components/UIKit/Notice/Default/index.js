import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import classNames from 'classnames';
import styles from './styles.scss';

export const NOTICE_TYPES = { ERROR: 'error', INFO: 'info' };

export class DefaultNotice extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: PropTypes.string,
    page: PropTypes.any,
  };

  renderNotice(notice, key = 0) {
    const noticeStyles = classNames(styles.singleNotice, {
      [styles.singleNoticeError]: notice.type === NOTICE_TYPES.ERROR,
      [styles.singleNoticeInfo]: notice.type === NOTICE_TYPES.INFO,
    });
    return (
      <div className={noticeStyles} key={key}>{notice.message}</div>
    );
  }

  renderNotices() {
    const page = this.props.page ? this.props.page.toJS() : null;
    return page && page.notices.length ? (
      <div>{map(page.notices, (notice, index) => this.renderNotice(notice, index))}</div>
    ) : null;
  }

  render() {
    const noticeStyles = classNames(styles.notice);
    const hasPage = !!this.props.page;
    return (
      <div className={noticeStyles}>
        { hasPage && this.renderNotices() }
        { /* eslint-disable */ }
        { !hasPage && <div dangerouslySetInnerHTML={{ __html: this.props.message }}></div> }
        { /* eslint-enable */ }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    page: state.getIn(['pages', ownProps.page], null),
  };
}

export default connect(mapStateToProps, {})(DefaultNotice);
