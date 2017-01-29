import { connect } from 'react-redux';
import Repos, {
    Repo
} from './repos';
import Member from './member';
import Github from './github';

import actions from './github-actions';

export { Repos };
export { Repo };
export { Member };
export { Github };

function mapStateToProps(state) {
    return {
        owners: state.github.users.map(user => user.username),
        repos: state.github.repos,
        reposStatus: state.github.reposStatus,
        usersStatus: state.github.usersStatus
    };
}

export default connect(mapStateToProps, actions)(Github);
