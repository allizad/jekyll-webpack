import React, {
    PropTypes,
    Component
} from 'react';
import Repo from './repo';
import styles from './repos.scss';

class Repos extends Component {
    render() {
        const { repos } = this.props;
        return (
            <div className={styles.repos}>
                {repos.map(repo => (
                    <Repo {...repo} key={`repo-${repo.id}`} />
                ))}
            </div>
        );
    }
}

Repos.propTypes = {
    owners: PropTypes.arrayOf(PropTypes.string),
    repos: PropTypes.arrayOf(PropTypes.shape(Repo.propTypes))
};

Repos.defaultProps = {
    owners: [],
    repos: []
};

export default Repos;
