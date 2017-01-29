import React, {
    PropTypes,
    Component
} from 'react';

import Repos from './repos';
import styles from './github.scss';


class Github extends Component {
    render() {
        const { owners, repos } = this.props;
        return (
            <div className={styles.github}>
                <Repos
                    owners={owners.map(owner => owner.username)}
                    repos={repos}
                />
            </div>
        );
    }
}

Github.propTypes = {
    owners: PropTypes.arrayOf(PropTypes.object),
    repos: PropTypes.arrayOf(PropTypes.object)
};

Github.defaultProps = {
    owners: [],
    repos: []
};

export { Github };
export default Github;
