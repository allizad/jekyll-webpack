import React from 'react';
import Member from '../member';

import styles from './about.scss';

const About = (() => (
    <div className={styles.about}>
        <h3>Learn a little bit more about us...</h3>
        <div className={styles.members}>
            <Member githubAccount="daniloster" />
            <Member githubAccount="leticiacalmon" />
        </div>
    </div>
));

export default About;
