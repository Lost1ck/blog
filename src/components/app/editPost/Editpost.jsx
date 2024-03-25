/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styles from './editPost.module.scss';
import Spinner from '../spin/Spin';

export default function EditPost() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);

  const {
    register, handleSubmit, setValue, control, formState: { errors }, watch,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tags: [],
      newTag: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const newTag = watch('newTag');

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
        const data = await response.json();
        const { article } = data;
        setValue('title', article.title);
        setValue('description', article.description);
        setValue('body', article.body);
        if (article.tagList) {
          setValue('tags', article.tagList.map((tag) => ({ name: tag })));
        }
      } catch (error) {
        console.error('Ошибка при загрузке статьи:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, setValue]);

  const handleTagAdd = () => {
    if (newTag.trim() && !fields.some(({ name }) => name === newTag)) {
      append({ name: newTag.trim() });
      setValue('newTag', '');
    }
  };

  const onSubmit = async (formData) => {
    const updatedData = {
      article: {
        title: formData.title,
        description: formData.description,
        body: formData.body,
        tagList: formData.tags.map((t) => t.name),
      },
    };
    const deist = localStorage.getItem('accessToken');
    const storage = JSON.parse(deist).user.token;
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${storage}`,
        },
        body: JSON.stringify(updatedData),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Article updated:', responseData);
      } else {
        console.error('Failed to update article:', responseData);
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса на обновление статьи:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.articleForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit article</h2>
        <label htmlFor="title" className={styles.title}>
          <h3>Title</h3>
          <input
            id="title"
            placeholder="Title"
            type="text"
            {...register('title', {
              required: true,
              minLength: {
                value: 6,
                message: 'Min length is 6',
              },
              maxLength: {
                value: 50,
                message: 'Max characters 50',
              },
              pattern: {
                value: /^[a-z0-9]+$/,
                message: 'Only lowercase letters and numbers are allowed',
              },
            })}
            className={errors.title ? styles.error : ''}
          />
          {errors.title && <p className={styles['error-message']}>{errors.title.message}</p>}
        </label>
        <label htmlFor="description">
          <h3>Short description</h3>
          <input
            id="description"
            placeholder="Short description"
            type="text"
            {...register('description', {
              required: true,
              minLength: {
                value: 6,
                message: 'Min length is 6',
              },
              maxLength: {
                value: 50,
                message: 'Max characters 50',
              },
            })}
            className={errors.description ? styles.error : ''}
          />
          {errors.description && <p className={styles['error-message']}>{errors.description.message}</p>}
        </label>
        <label htmlFor="body">
          <h3>Text</h3>
          <textarea
            id="body"
            placeholder="Text"
            {...register('body', {
              required: true,
              minLength: {
                value: 6,
                message: 'Min length is 6',
              },
              maxLength: {
                value: 5000,
                message: 'Max characters 5000',
              },
            })}
            className={errors.body ? styles.error : ''}
          />
          {errors.body && <p className={styles['error-message']}>{errors.body.message}</p>}
        </label>
        <label htmlFor="tags">
          <h3>Tags</h3>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.tag}>
              <label htmlFor={`tag-${index}`} className={styles['tag-input-show']}>
                <input
                  id={`tag-${index}`}
                  type="text"
                  {...register(`tags.${index}.name`)}
                  defaultValue={field.name}
                />
              </label>
              <button
                type="button"
                onClick={() => remove(index)}
                className={styles['delete-tag']}
              >
                Delete
              </button>
            </div>
          ))}
          <div className={styles.tag}>
            <div className={styles['tag-input']}>
              <input
                placeholder="Tag"
                type="text"
                {...register('newTag', {
                  minLength: {
                    value: 6,
                    message: 'Min length is 6',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Max length is 15',
                  },
                })}
                onKeyDown={(e) => e.key === 'Enter' && handleTagAdd()}
                className={errors.newTag ? styles.error : ''}
              />
              {errors.newTag && <p className={styles['error-message']}>{errors.newTag.message}</p>}
            </div>
            <button
              type="button"
              onClick={() => setValue('tags', '')}
              className={styles['delete-tag']}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleTagAdd}
              className={styles['add-tag']}
            >
              Add tag
            </button>
          </div>
        </label>
        <button type="submit" className={styles.send}>
          Send
        </button>
      </form>
    </div>
  );
}
