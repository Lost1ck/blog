/* eslint-disable react/no-array-index-key */
// SinglePage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { message, Modal } from 'antd';
import styles from './style.module.scss';
import Spinner from '../spin/Spin';
import Noarticles from '../noarticles/Noarticles';
import { useGlobal } from '../../context/GlobalContext';
import logo from '../../../images/Vector.svg';
import unLogo from '../../../images/unlike.svg';
import { useUpdateUserData } from '../../context/UserUpdate';

const SinglePage = () => {
  const { handleLike } = useUpdateUserData();
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const {
    loading, error, loggedIn,
  } = useGlobal();

  const currentUser = JSON.parse(localStorage.getItem('accessToken')).user.username;

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

  const setArticles = (updatedArticle) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      favorited: updatedArticle.favorited,
      favoritesCount: updatedArticle.favoritesCount,
    }));
  };

  const handleLikeClick = async () => {
    if (loggedIn) {
      await handleLike(article, loggedIn, setArticles);
    } else {
      message.error('Please log in to like articles.');
    }
  };

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

  console.log(article);

  const deleteArticle = async (articlew) => {
    const slugForDelete = slug;
    const url = `https://blog.kata.academy/api/articles/${slugForDelete}`;
    const token = localStorage.getItem('accessToken');
    const storage = JSON.parse(token).user.token;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${storage}`,
        },
        body: articlew.body,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      try {
        window.location.href = '/';
      } catch (e) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (e) {
      message.error('you cant delete this article');
    }
  };

  const handleDeleteArticle = (articleSlug) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить эту статью?',
      content: 'Это действие нельзя будет отменить.',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        deleteArticle(articleSlug);
      },
      onCancel() {
        console.log('Отмена удаления');
      },
    });
  };

  return (
    <div className={styles.container}>
      <article
        key={article.slug}
        style={{ color: 'black' }}
        className={styles.article}
      >
        <div>
          <div className={styles.flex}>
            <div className={styles.title}>
              {shortDescription(article.title, 15)}
            </div>
            <button
              type="button"
              className={`${styles.flex} ${styles['custom-button']}`}
              onClick={handleLikeClick}
            >
              <img src={article.favorited ? logo : unLogo} className={styles['like-article']} alt="like article" />
              <div>{article.favoritesCount}</div>
            </button>
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
              <div
                style={{ fontSize: '12px', color: '#00000080' }}
              >
                {convertDate(article.updatedAt)}
              </div>
            </div>
            <div className={styles['article-block']}>
              <img className={styles['article-image']} src={article.author.image} alt={article.title || 'Article image'} />
            </div>
          </div>
          <div className={styles['btns-edit']}>
            {loggedIn && article.author.username === currentUser ? (
              <div>
                <button type="button" className={styles['btn-delete']} onClick={() => handleDeleteArticle(article.slug)}>Delete</button>
                <Link
                  to={{
                    pathname: `/articles/${slug}/edit`,
                  }}
                  type="button"
                  className={styles['btn-edit']}
                >
                  Edit
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div style={{ width: '600px' }}>
          <div>{article.description}</div>
          <ReactMarkdown>{shortDescription(article.body, 50)}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default SinglePage;
