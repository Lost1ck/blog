// SinglePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spin from '../spin/Spin';

const SinglePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://api.realworld.io/api/articles/${slug}`);
        const data = await response.json();
        setArticle(data.article);
      } catch (error) {
        console.error('Не удалось загрузить статью', error);
      }
    };
    fetchArticle();
  }, [slug]);

  if (!article) return <Spin />;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </div>
  );
};

export default SinglePage;
