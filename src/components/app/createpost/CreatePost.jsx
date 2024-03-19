/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styles from './createpost.module.scss';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleTagDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagAdd = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // server
  };

  const handleDelete = () => {
    setNewTag('');
  };

  return (
    <div className={styles.articleForm}>
      <form onSubmit={handleSubmit}>
        <h2>Create new article</h2>
        <label>
          Title
          <input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Short description
          <input
            placeholder="Short description"
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Text
          <textarea
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textarea}
          />
        </label>
        <label>
          Tags
          {tags.map((tag, index) => (
            <div key={tag.index} className={styles.tag}>
              <div className={styles['tag-input-show']}>
                <input
                  type="text"
                  value={tag}
                  readOnly
                />
              </div>
              <button
                type="button"
                onClick={() => handleTagDelete(index)}
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
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTagAdd()}
              />
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className={styles['delete-tag']}
            >
              Delete
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
