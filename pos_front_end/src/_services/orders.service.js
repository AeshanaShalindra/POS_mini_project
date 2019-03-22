import config from 'config';
import { orderHeader } from '../_helpers';

export const ordersService = {
    enter,
    getAll,
    getById,
    update,
    delete: _delete
};

function enter(order) {
    const requestOptions = {
        method: 'POST',
        headers: { ...orderHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    };

    return fetch(`${config.apiUrl}/orders/enter`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: orderHeader()
    };

    return fetch(`${config.apiUrl}/orders`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: orderHeader()
    };

    return fetch(`${config.apiUrl}/orders/${id}`, requestOptions).then(handleResponse);
}


function update(order) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...orderHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    };

    return fetch(`${config.apiUrl}/orders/${order.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: orderHeader()
    };

    return fetch(`${config.apiUrl}/orders/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}