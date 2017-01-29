import React, {
    Component,
    PropTypes
} from 'react';
import FontAwesome from '../../font-awesome';
import styles from './member.scss';

class Member extends Component {
    render() {
        const {
            id,
            username,
            avatar,
            email,
            name,
            location,
            bio,
            blog
        } = this.props;
        return (
            <div data-reference={`git-${id}`} className={styles.member}>
                <div className={styles.name}>
                    <a href={`https://github.com/${username}`}>{name}</a>
                </div>
                <div className={styles.avatar}>
                    <img src={avatar} alt="Github avatar" />
                </div>
                <div className={styles.details}>
                    <div className={styles.info}>
                        <FontAwesome name="github" />
                        <span className={styles.label}>git username</span>
                        <span><a href={`https://github.com/${username}`}>{username}</a></span>
                    </div>
                    {email && (<div className={styles.info}>
                        <FontAwesome name="envelope" />
                        <span className={styles.label}>email</span>
                        <span><a href={`mailto:${email}`}>{email}</a></span>
                    </div>)}
                    {location && (<div className={styles.info}>
                        <FontAwesome name="map-marker" />
                        <span className={styles.label}>location</span>
                        <span>{location}</span>
                    </div>)}
                    {blog && (<div className={styles.info}>
                        <FontAwesome name="rss-square" />
                        <span className={styles.label}>blog</span>
                        <span><a href={blog}>{blog}</a></span>
                    </div>)}
                </div>
                <div className={styles.bio}>
                    <FontAwesome name="quote-left" size="3x" /> {bio}
                </div>
            </div>
        );
    }
}

Member.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
    blog: PropTypes.string
};

Member.defaultProps = {};

export default Member;
