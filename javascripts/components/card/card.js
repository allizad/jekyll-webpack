import React, {
    PropTypes
} from 'react';
import styles from './card.scss';

const Card = (({ children, uniform }) => (
    <div className={`${styles.card} ${uniform ? styles.strict : ''}`}>
        {children}
    </div>
));

Card.propTypes = {
    uniform: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.element,
        PropTypes.string
    ])
};

Card.defaultProps = {
    uniform: false
};

export default Card;
