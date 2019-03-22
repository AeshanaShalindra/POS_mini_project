export function orderHeader() {
    // return authorization header with jwt token
    let order = JSON.parse(localStorage.getItem('order'));

    if (order && order.token) {
        return { 'Ordering': 'holding ' + order.token };
    } else {
        return {};
    }
}