import { connect } from 'react-redux';

import actions from '../../github/github-actions';
import Portifolio from './portifolio';

function mapStateToProps(state) {
    return {
        owners: state.github.users.map(user => user.username),
        repos: state.github.repos,
        reposStatus: state.github.reposStatus,
        usersStatus: state.github.usersStatus
    };
}

export default connect(mapStateToProps, actions)(Portifolio);
