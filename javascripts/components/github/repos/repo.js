import React, {
    PropTypes
} from 'react';
import FontAwesome from '../../font-awesome';
import styles from './repos.scss';

const Repo = ((props) => {
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
    } = props;
    const {
        username
    } = owner;
    return (
        <div id={`repo-id-${id}`} className={styles.repo}>
            <div className={styles.repoName}>
                <a href={`http://github.com/${username}/${name}`}>{name}</a>
            </div>
            <div className={styles.ownerName}>
                <a href={`http://github.com/${username}`}>{username}</a>
            </div>
            <div className={styles.details}>
                <span className={styles.language}>{language}</span>
                <span className={styles.imageCounters}>
                    <FontAwesome name="code-fork" /> {forks}
                </span>
                <span className={styles.imageCounters}>
                    <FontAwesome name={stars === 0 ? 'star-o' : 'star'} /> {stars}
                </span>
                <span className={styles.imageCounters}>
                    <FontAwesome name="binoculars" /> {watchers}
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
});

Repo.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string
    }),
    pictureUrl: PropTypes.string,
    gitUrl: PropTypes.string,
    sshUrl: PropTypes.string,
    language: PropTypes.string,
    forks: PropTypes.number,
    stars: PropTypes.number,
    watchers: PropTypes.number
};

export default Repo;
