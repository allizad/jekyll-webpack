import React, {
  PropTypes
} from 'react';

import styles from './header.scss';

const NavigationItem = (({ title, link, className }) => (
  <div className={`${styles.navigationItem} ${className}`}>
    <a href={link}>{title}</a>
  </div>
));

NavigationItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

NavigationItem.defaultProps = {
  className: ''
};

export default NavigationItem;
