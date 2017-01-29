import { connect } from 'react-redux';
import About from './about';

export { About };

function mapStateToProps(state) {
    return {
        owners: state.github.users
    };
}

export default connect(mapStateToProps)(About);
