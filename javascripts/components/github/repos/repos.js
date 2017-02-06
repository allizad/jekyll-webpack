import React, {
  PropTypes,
  Component
} from 'react';
import Card from '../../card';
import Repo from './repo';
import styles from './repos.scss';

const Repos = ({ repos }) => (
  <div className={styles.repos}>
    {repos.map(repo => (
      <Card key={`repo-${repo.id}`}>
        <Repo {...repo} />
      </Card>
    ))}
  </div>
);

Repos.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape(Repo.propTypes))
};

Repos.defaultProps = {
  owners: [],
  repos: []
};

export default Repos;
