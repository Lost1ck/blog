import React from 'react';
import { Space, Alert } from 'antd';
import styles from './nointernet.module.scss';

export default function Nointernet() {
  return (
    <Space className={styles.container}>
      <Alert
        message="Error"
        description="There is no internet connection"
        type="error"
        showIcon
      />
    </Space>
  );
}
