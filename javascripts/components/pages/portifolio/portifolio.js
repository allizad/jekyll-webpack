import React, {
    PropTypes
} from 'react';

import { Repos } from '../../github';
import styles from './portifolio.scss';


const Portifolio = (({ owners, repos }) => (
    <div className={styles.github}>
        <Repos
            owners={owners}
            repos={repos}
        />
    </div>
));

Portifolio.propTypes = {
    owners: PropTypes.arrayOf(PropTypes.string),
    repos: PropTypes.arrayOf(PropTypes.object)
};

Portifolio.defaultProps = {
    owners: [],
    repos: []
};

export { Portifolio };
export default Portifolio;
