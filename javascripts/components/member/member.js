import React, {
    Component,
    PropTypes
} from 'react';

import styles from './member.scss';

class Member extends Component {
    componentWillMount() {
        this.props.onLoadMember(this.props.login);
    }

    render() {
        const {
            id,
            login,
            pictureUrl,
            email,
            name,
            location,
            bio,
            blog
        } = this.props;
        return (
            <div className={styles.member}>
                Profile {login}
                {[
                    id,
                    login,
                    pictureUrl,
                    email,
                    name,
                    location,
                    bio,
                    blog
                ].join(' | ')}
            </div>
        );
    }
}

Member.propTypes = {
    id: PropTypes.number,
    login: PropTypes.string.isRequired,
    pictureUrl: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
    blog: PropTypes.string,
    onLoadMember: PropTypes.func
};

Member.defaultProps = {
    onLoadMember: () => {}
};

export default Member;
