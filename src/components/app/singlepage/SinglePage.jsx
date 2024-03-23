/* eslint-disable react/no-array-index-key */
// SinglePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.scss';
import Spinner from '../spin/Spin';
import Noarticles from '../noarticles/Noarticles';
import { useGlobal } from '../../context/GlobalContext';
import logo from '../../../images/Vector.svg';

const SinglePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const {
    loading, error, loggedIn,
  } = useGlobal();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
        const data = await response.json();
        setArticle(data.article);
      } catch (er) {
        console.error('Не удалось загрузить статью', er);
      }
    };
    fetchArticle();
  }, [slug]);

  if (!article) return <Spinner />;

  if (loading) return <Spinner className={styles.spin} />;
  if (error) return <Noarticles />;

  const convertDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };

  const shortDescription = (text, size) => {
    const maxLength = size;
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength - 3)}...`;
    }
    return text;
  };

  // const sizeOfItems = (items, size) => {
  //   if (items.length > size) {
  //     return items.slice(0, size);
  //   }
  //   return items;
  // };

  return (
    <div className={styles.container}>
      <article
        key={article.slug}
        style={{ color: 'black' }}
        className={styles.article}
      >
        {console.log(article)}
        <div>
          <div className={styles.flex}>
            <div className={styles.title}>
              {shortDescription(article.body, 15)}
            </div>
            <div className={styles.flex}>
              <img src={logo} className={styles['like-article']} alt="like article" />
              <div>{article.favoritesCount}</div>
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles['tags-block']}>
              {article.tagList.slice(0, 4).map((tag, index) => (
                <div key={`${tag} - ${index}`} className={styles['tags-item']}>
                  {shortDescription(tag, 10)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.fixed} style={{ margin: '10px 10px 0 0' }}>
          <div className={styles['avatar-block']}>
            <div>
              <p style={{ fontSize: '18px' }}>{shortDescription(article.author.username, 15)}</p>
              <div style={{ fontSize: '12px', color: 'color: #00000080' }}>{convertDate(article.updatedAt)}</div>
            </div>
            <div className={styles['article-block']}>
              <img className={styles['article-image']} src={article.author.image} alt={article.title || 'Article image'} />
            </div>
          </div>
          <div className={styles['btns-edit']}>
            {loggedIn ? (
              <div>
                <button type="submit" className={styles['btn-delete']}>Delete</button>
                <button type="submit" className={styles['btn-edit']}>Edit</button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div style={{ width: '600px' }}>
          <div>{shortDescription(article.title, 50)}</div>
          <div>{article.description}</div>
        </div>
      </article>
    </div>
  );
};

export default SinglePage;
