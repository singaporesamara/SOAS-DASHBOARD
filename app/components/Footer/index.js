import React from 'react';
import { Wrapper } from '../UIKit';
import styles from './styles.scss';

function Footer() {
  return (
    <Wrapper>
      <div className={styles.footer}>
        SOAS Pay LLC &copy; 2017
      </div>
    </Wrapper>
  );
}

export default Footer;
