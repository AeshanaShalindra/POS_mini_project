/*import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { orderActions } from '../_actions';

class Orderssss extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            order: {
                content: '',
                item: '',
                qty: ''
            },
            submitted: false,
            itemss: [{item:"", qty:""}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { order } = this.state;
        this.setState({
            order: {
                ...order,
                [name]: value
            }
        });
        if (["item", "qty"].includes(event.target.className) ) {
            let itemss = [...this.state.itemss]
            itemss[event.target.dataset.id][event.target.className] = event.target.value.toUpperCase()
            this.setState({ itemss }, () => console.log(this.state.itemss))
            const { name, value } = event.target;
        
          } else {
            this.setState({ [event.target.name]: event.target.value.toUpperCase() })
          }
        
    }
    addItem = (e) => {
        this.setState((prevState) => ({
          itemss: [...prevState.itemss, {item:"", qty:""}],
        }));
      }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { order } = this.state;
        const { dispatch } = this.props;
        if (order.content && order.item && order.qty) {
            dispatch(orderActions.enter(order));
            location.reload();
        }
    }
    componentDidMount() {
      //  this.props.dispatch(orderActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(orderActions.delete(id));
    }


    render() {
        const { odering } = this.props;
        const { order, submitted } = this.state;
        let{itemss}=this.state;
        
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Orders</h2>
               
                <form name="form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                   
                    <div className={'form-group' + (submitted && !order.content ? ' has-error' : '')}>
                        <label htmlFor="content">Customer Name</label>
                        <input type="text" className="form-control" name="content" value={order.content} onChange={this.handleChange} />
                        {submitted && !order.content &&
                            <div className="help-block">content is required</div>
                        }
                    </div>
                    <button onClick={this.addItem}>Add new item</button>
                    {
          itemss.map((val, idx)=> {
            let catId = `cat-${idx}`, ageId = `age-${idx}`
            return (
              <div key={idx}>
                <label htmlFor={catId}>{`Item #${idx + 1}`}</label>
                <input
                  type="text"
                  name={catId}
                  data-id={idx}
                  id={catId}
                  className="name"
                />
                <label htmlFor={ageId}>qty</label>
                <input
                  type="text"
                  name={ageId}
                  data-id={idx}
                  id={ageId}
                  className="age"
                />
              </div>
            )
          })
        }
                    <div className={'form-group' + (submitted && !order.item ? ' has-error' : '')}>
                        <label htmlFor="item">item</label>
                        <input type="text" className="form-control" name="item" value={order.item} onChange={this.handleChange} />
                        {submitted && !order.item &&
                            <div className="help-block">item is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !order.qty ? ' has-error' : '')}>
                        <label htmlFor="qty">qty</label>
                        <input type="text" className="form-control" name="qty" value={order.qty} onChange={this.handleChange} />
                        {submitted && !order.qty &&
                            <div className="help-block">qty is required</div>
                        }
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="add"/>
                        {odering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
                <br/>
              
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { odering } = state.ordering;
    //const { user } = authentication;
    return {
        odering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(Orders);
export { connectedRegisterPage as Orderssss };*/