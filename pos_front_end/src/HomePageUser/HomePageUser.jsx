import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {Orders} from '../Orders'
import {OrdersView} from '../Orders/OrdersView'
import {FieldArraysForm} from '../Orders/FieldArraysForm'

class HomePageUser extends React.Component {
    
    render() {
        const { user } = this.props;
        return (
            <div >
                <h1>Hi {user.firstName}!</h1>
                
                <p>You're logged in as an user!!</p>
                <p>

                    <Link to="/login">Logout</Link>
                </p>
                <Orders/>
                <OrdersView/>
                
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePageUser);
export { connectedHomePage as HomePageUser };