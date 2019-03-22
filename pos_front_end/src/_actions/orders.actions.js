import { orderConstants } from '../_constants';
import { ordersService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const orderActions = {
    enter,
    getAll,
    delete: _delete
};



function enter(order) {
    return dispatch => {
        dispatch(request(order));

        ordersService.enter(order)
            .then(
                
                order => { 
                    console.log(order)
                    dispatch(success());
                    //history.push('/login');
                    dispatch(alertActions.success('order entry successful,please refresh to view changes'));
                },
                error => {
                    console.log(error)
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(order) { return { type: orderConstants.ORDER_REQUEST, order } }
    function success(order) { return { type: orderConstants.ORDER_SUCCESS, order } }
    function failure(error) { return { type: orderConstants.ORDER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        ordersService.getAll()
            .then(
                orders => dispatch(success(orders)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: orderConstants.GETALL_REQUEST } }
    function success(orders) { return { type: orderConstants.GETALL_SUCCESS, orders } }
    function failure(error) { return { type: orderConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        ordersService.delete(id)
            .then(
                order => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}