/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import styles from './post.module.scss';

export default function Post() {
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
      setNewTag(''); // Reset the input after adding a tag
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission, possibly sending data to an API or elsewhere
  };

  return (
    <div className={styles.articleForm}>
      <form onSubmit={handleSubmit}>
        <h2>Create new article</h2>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Short description
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Text (Markdown supported)
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textarea}
          />
        </label>
        <div className={styles.preview}>
          <h3>Preview</h3>
          <Markdown>{text}</Markdown>
        </div>
        <label>
          Tags
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <div key={tag.index} className={styles.tag}>
                {tag}
                <button type="button" onClick={() => handleTagDelete(index)} className={styles.deleteTag}>
                  Delete
                </button>
              </div>
            ))}
            <div className={styles.tagInput}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTagAdd()}
                className={styles.input} // Apply input styles
              />
              <button type="button" onClick={handleTagAdd} className={styles.addTag}>
                Add tag
              </button>
            </div>
          </div>
        </label>
        <button type="submit" className={styles.send}>Send</button>
      </form>
    </div>
  );
}
