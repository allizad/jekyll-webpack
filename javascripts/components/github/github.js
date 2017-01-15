import React, {
    PropTypes,
    Component
} from 'react';
import Repo from './repo';
import styles from './github.scss';

// https://api.github.com/users/daniloster
// https://api.github.com/users/daniloster/repos

class Repos extends Component {
    componentWillMount() {
        this.props.onLoadRepos(this.props.owners);
    }

    render() {
        const { repos } = this.props.repos;
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
    repos: PropTypes.arrayOf(PropTypes.shape(Repo.propTypes)),
    onLoadRepos: PropTypes.func
};

Repos.defaultProps = {
    owners: [],
    repos: [],
    onLoadRepos: () => {}
};

export default Repos;
