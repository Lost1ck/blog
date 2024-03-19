import React from 'react';
import { Result } from 'antd';
import styles from './noarticles.module.scss';

export default function Noarticles() {
  return (
    <Result
      status="warning"
      className={styles.container}
      title="There are no articles"
    />
  );
}
