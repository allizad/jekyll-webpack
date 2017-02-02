import React, {
    PropTypes
} from 'react';
import { Member } from '../../github';
import Card from '../../card';

import styles from './about.scss';

const About = (({ owners }) => (
    <div className={styles.about}>
        <div className={'wrapper'}>
            <h3>Learn a little bit more about us...</h3>
        </div>
        <div className={styles.members}>
            {owners.map(owner => (
                <div key={`member-${owner.username}`} className={styles.member}>
                    <Card uniform={true}>
                        <Member {...owner} />
                    </Card>
                </div>
            ))}
        </div>
    </div>
));

About.propTypes = {
    owners: PropTypes.arrayOf(PropTypes.object)
};

export default About;
