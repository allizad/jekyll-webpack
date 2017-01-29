import React, {
    PropTypes,
    Component
} from 'react';
import styles from './repos.scss';

const FontAwesome = (() => (<i />));

class Repo extends Component {
    render() {
        const {
            id,
            name,
            description,
            owner,
            pictureUrl,
            gitUrl,
            sshUrl,
            language,
            forks,
            stars,
            watchers
        } = this.props;
        return (
            <div id={`repo-id-${id}`} className={styles.repo}>
                <div className={styles.repoName}>
                    <a href={`http://github.com/${owner}/${name}`}>{name}</a>
                </div>
                <div className={styles.ownerName}>
                    <a href={`http://github.com/${owner}`}>{owner}</a>
                </div>
                <div className={styles.details}>
                    <span className={styles.language}>{language}</span>
                    <span className={styles.imageCounters}>
                        <FontAwesome /> {forks}
                    </span>
                    <span className={styles.imageCounters}>
                        <FontAwesome /> {stars}
                    </span>
                    <span className={styles.imageCounters}>
                        <FontAwesome /> {watchers}
                    </span>
                    <span className={styles.gitUrl}>{gitUrl}</span>
                    <span className={styles.sshUrl}>{sshUrl}</span>
                </div>
                <div className={styles.avatar}>
                    <picture
                        alt="Github profile picture"
                        src={pictureUrl}
                    />
                </div>
                <div className={styles.descritpion}>
                    {description}
                </div>
            </div>
        );
    }
}

Repo.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    pictureUrl: PropTypes.string,
    gitUrl: PropTypes.string,
    sshUrl: PropTypes.string,
    language: PropTypes.string,
    forks: PropTypes.number,
    stars: PropTypes.number,
    watchers: PropTypes.number
};

export default Repo;
