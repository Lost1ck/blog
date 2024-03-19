import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import styles from './style.module.scss';
import fetchArticles from '../../store/actions/articlesActions';
import Spinner from '../spin/Spin';

const ArticlesComponent = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const dispatch = useDispatch();
  const { loading, articles, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [currentPage, dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  if (loading) return <Spinner className={styles.spin} />;
  if (error) return <p>Error loading articles!</p>;

  const convertDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const month = months[dateObj.getMonth()];

    const formattedDate = `${month} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

    return formattedDate;
  };

  return (
    <div>
      {console.log(articles)}
      <div className={styles.container}>
        {articles.map((article) => (
          <article key={article.slug} className={styles.article}>
            <div>
              <div>
                <div>
                  <div>{article.author.username}</div>
                  <div>{convertDate(article.updatedAt)}</div>
                </div>
                <div><img src={article.img} alt="Logo_picture" /></div>
              </div>
              <div>{article.title}</div>
            </div>
            <div>{article.description}</div>
            {/* <p>{article.description}</p> */}
          </article>
        ))}
      </div>
      <Pagination
        className={styles.pagination}
        current={currentPage + 1}
        onChange={handlePageChange}
        total={50}
      />
    </div>
  );
};

export default ArticlesComponent;
