/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styles from './createpost.module.scss';

export default function CreatePost() {
  const {
    register, control, formState: { errors }, handleSubmit, setValue, getValues, reset,
  } = useForm({
    defaultValues: {
      title: '',
      shortDescription: '',
      text: '',
      tags: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const handleTagAdd = () => {
    const newTag = getValues('newTag');
    if (newTag && !fields.some(({ name }) => name === newTag)) {
      append({ name: newTag });
      setValue('newTag', '');
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.articleForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new article</h2>
        <label htmlFor="title" className={styles.title}>
          Title
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
          Short description
          <input
            id="description"
            placeholder="Short description"
            type="text"
            {...register('shortDescription', {
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
            className={errors.shortDescription ? styles.error : ''}
          />
          {errors.shortDescription && <p className={styles['error-message']}>{errors.shortDescription.message}</p>}
        </label>
        <label htmlFor="text">
          Text
          <textarea
            id="text"
            placeholder="Text"
            {...register('text', {
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
            className={errors.text ? styles.error : ''}
          />
          {errors.text && <p className={styles['error-message']}>{errors.text.message}</p>}
        </label>
        <label htmlFor="tags">
          Tags
          {fields.map((field, index) => (
            <div key={field.id} className={styles.tag}>
              <label htmlFor={`tag-${index}`} className={styles['tag-input-show']}>
                Tag
                {index + 1}
                <input
                  id={`tag-${index}`}
                  type="text"
                  {...register(`tags.${index}.name`)}
                  readOnly
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
              onClick={() => setValue('newTag', '')}
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
