import React from 'react';
import { Pagination } from 'antd';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.container}>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}
