import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePageAdmin extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        console.log(this.props);
        
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        console.log(this.props);
        //console.log(user);
        console.log(users);
        return (
            <div>
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in as an admin!!</p>
                <h3>All registered users:</h3>
                <br/>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                <table>
                    <thead>
                     <tr>
                        <th width="130">User name</th>
                        <th width="130">Role</th>
                        <th width="130">action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.items.map((user, index) =>
                    <tr key={user.id}>
                                <td>
                                {user.firstName + ' ' + user.lastName}
                                </td>
                                <td>
                                {user.role}
                                </td>
                                <td>
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                                </td>
                    </tr>
                        )}
                    </tbody>
                    </table>
                }
                <br/>
                <br/>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log(state);
    const { users, authentication } = state;
    const { user } = authentication;
    //console.log(user);
    //console.log(users);
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePageAdmin);
export { connectedHomePage as HomePageAdmin };