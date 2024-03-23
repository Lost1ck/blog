/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import Spinner from '../spin/Spin';
import Noarticles from '../noarticles/Noarticles';
import { useGlobal } from '../../context/GlobalContext';
import logo from '../../../images/Vector.svg';

const ArticlesComponent = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [likesInfo, setLikesInfo] = React.useState({});

  const {
    fetchArticles, loading, articles, error, totalPages,
  } = useGlobal();

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  const { token } = JSON.parse(localStorage.getItem('accessToken')).user;

  const handleLikeClick = async (slug, liked) => {
    const method = liked ? 'DELETE' : 'POST';
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method,
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.log(response);
        throw new Error('Не удалось изменить лайк');
      }
      return {
        slug,
        favoritesCount: data.article.favoritesCount,
        liked: method === 'POST',
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleLike = async (article) => {
    const articleLikesInfo = likesInfo[article.slug] || {
      favoritesCount: article
        .favoritesCount,
      liked: false,
    };
    const updatedLikesInfo = await handleLikeClick(article.slug, articleLikesInfo.liked);
    if (updatedLikesInfo) {
      setLikesInfo((prev) => ({
        ...prev,
        [article.slug]: updatedLikesInfo,
      }));
    }
  };

  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <article
          key={article.slug}
          style={{ color: 'black' }}
          className={styles.article}
        >
          <div>
            <div>
              <div className={styles.flex}>
                <Link to={`/articles/${article.slug}`} className={styles.title}>
                  {article.author.slug}
                  some text
                </Link>
                <button type="submit" className={styles.flex && styles['custom-button']} onClick={() => handleLike(article)}>
                  <img src={logo} className={styles['like-article']} alt="like article" />
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
            <div className={styles.fixed}>
              <div className={styles['avatar-block']}>
                <div>
                  <p style={{ fontSize: '18px' }}>{shortDescription(article.author.username, 15)}</p>
                  <div style={{ fontSize: '12px', color: 'color: #00000080' }}>{convertDate(article.updatedAt)}</div>
                </div>
                <div className={styles['article-block']}>
                  <img className={styles['article-image']} src={article.author.image} alt={article.title || 'Article image'} />
                </div>
              </div>
            </div>
            <div style={{ width: '600px' }}>
              <div>{shortDescription(article.title, 50)}</div>
              <div>{shortDescription(article.description, 200)}</div>
            </div>
          </div>
        </article>
      ))}
      <Pagination
        className={styles.pagination}
        defaultCurrent={currentPage}
        onChange={handlePageChange}
        total={totalPages * 10}
      />
    </div>
  );
};

export default ArticlesComponent;
