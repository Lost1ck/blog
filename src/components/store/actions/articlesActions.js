/* eslint-disable arrow-body-style */
import { fetchArticlesRequest, fetchArticlesSuccess, fetchArticlesFailure } from './actions';

const fetchArticles = (page = 0) => {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    fetch(`https://api.realworld.io/api/articles?limit=5&offset=${page * 5}`)
      .then((response) => response.json())
      .then((data) => dispatch(fetchArticlesSuccess(data.articles)))
      .catch((error) => dispatch(fetchArticlesFailure(error.message)));
  };
};

export default fetchArticles;
