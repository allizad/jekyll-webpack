import React, {
  PropTypes
} from 'react';

import styles from './header.scss';

const Title = (({ title, link, className }) => (
  <div className={`${styles.title} ${className}`}>
    <a href={link}>{title}</a>
  </div>
));

Title.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

Title.defaultProps = {
  className: ''
};

export default Title;
