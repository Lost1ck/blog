import React from 'react';
import { Flex, Spin } from 'antd';
import styles from './spin.module.scss';

const Spinner = () => (
  <Flex className={styles.spin} align="center" gap="middle">
    <Spin size="large" />
  </Flex>
);

export default Spinner;
