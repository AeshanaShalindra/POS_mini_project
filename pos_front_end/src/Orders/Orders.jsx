import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { orderActions } from '../_actions';

class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: {
                content: '',
                item: [{item:"", qty:""}],
                
            },
            submitted: false,
            itemss: [{item:"", qty:""}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //console.log(event);
        const { name, value } = event.target;
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
            this.setState({ [event.target.name]: event.target.value})
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
        //console.log(this.state.itemss);
        const { order } = this.state;
        const { dispatch } = this.props;
        order.item=this.state.itemss;
        //console.log(order);
        //console.log(order.item);
        if (order.content && order.item ) {
            dispatch(orderActions.enter(order));
            //location.reload();
        }
    }
    componentDidMount() {
      //  this.props.dispatch(orderActions.getAll());
    }




    render() {
        const { odering } = this.props;
        const { order, submitted } = this.state;
        let{itemss}=this.state;
        
        return (
            <div >
                <h2>Orders</h2>
               
                <form name="form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                   
                    <div className={'form-group' + (submitted && !order.content ? ' has-error' : '')}>
                        <label htmlFor="content">Customer Name</label>
                        <input type="text" className="form-control" name="content" value={order.content}  />
                        {submitted && !order.content &&
                            <div className="help-block">content is required</div>
                        }
                    </div>
                    <input type="button"onClick={this.addItem} value="add items"/>
                    {
                    itemss.map((val, idx)=> {
                        let itemID = `item-${idx}`, qtyId = `qty-${idx}`
                        return (
                                <div key={idx}>
                                <label htmlFor={itemID} style={{padding:20}}>{`Item #${idx + 1}`}</label>
                                <input
                                type="text"
                                name={itemID}
                                data-id={idx}
                                id={itemID}
                                className="item"
                                style={{paddingLeft:20}}
                                />
                                <label htmlFor={qtyId} style={{paddingLeft:20,paddingRight:20}}>qty</label>
                                <input
                                type="text"
                                name={qtyId}
                                data-id={idx}
                                id={qtyId}
                                className="qty"
                                style={{paddingLeft:20}}
                                />
                            </div>
                            )
                        })
                        }
                    
                    
                    <div className="form-group">
                        <button className="btn btn-primary">add</button>
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
export { connectedRegisterPage as Orders };