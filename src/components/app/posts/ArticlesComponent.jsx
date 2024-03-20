import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import Spinner from '../spin/Spin';
import Noarticles from '../noarticles/Noarticles';
import { useGlobal } from '../../context/GlobalContext';

const ArticlesComponent = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

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

  return (
    <div className={styles.container}>
      {/* {console.log(articles)} */}
      {articles.map((article) => (
        <Link
          key={article.slug}
          to={`/articles/${article.slug}`}
          style={{ color: 'black' }}
          className={styles.article}
        >
          <div>
            <div>
              <div>{article.author.username}</div>
              <div>{convertDate(article.updatedAt)}</div>
              <div>{article.favoritesCount}</div>
              <img src={article.img} alt={article.title || 'Article image'} />
              <div>{article.title}</div>
              <div>{article.description}</div>
            </div>
          </div>
        </Link>
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
