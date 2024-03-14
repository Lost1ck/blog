import React from 'react';
import styles from './post.module.scss';

export default function Post() {
  return (
    <div className={styles.container}>
      <h3>title</h3>
      <div>tag</div>
      <div>text</div>
      <div>avatar</div>
    </div>
  );
}
