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
import unLogo from '../../../images/unlike.svg';
import { useUpdateUserData } from '../../context/UserUpdate';

const ArticlesComponent = () => {
  const { handleLike } = useUpdateUserData();
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    fetchArticles, loading, articles, error, totalPages, setArticles, loggedIn,
  } = useGlobal();

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handleLikeClick = async (article) => {
    await handleLike(article, loggedIn, setArticles);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const shortDescription = (text, size) => {
    const maxLength = size;
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength - 3)}...`;
    }
    return text;
  };

  const convertDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  };

  if (loading) return <Spinner />;
  if (error) return <Noarticles />;

  console.log(articles);

  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <article
          key={article.slug}
          style={{ color: 'black' }}
          className={styles.article}
        >
          {/* Like is here */}
          <div>
            <div>
              <div className={styles.flex}>
                <Link to={`/articles/${article.slug}`} className={styles.title}>
                  {shortDescription(article.title, 15)}
                </Link>
                <button
                  type="button"
                  className={`${styles.flex} ${styles['custom-button']}`}
                  onClick={() => handleLikeClick(article)}
                >
                  <img src={article.favorited ? unLogo : logo} className={styles['like-article']} alt="like article" />
                  <div>{article.favoritesCount}</div>
                </button>
              </div>
              <div className={styles.flex}>
                <div className={styles['tags-block']}>
                  {article.tagList.filter((tag) => tag
                    .trim()
                    .length > 0)
                    .slice(0, 4)
                    .map((tag, index) => (
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
            <div style={{ width: '600px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.88)' }}>
              <div>{shortDescription(article.description, 100)}</div>
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
