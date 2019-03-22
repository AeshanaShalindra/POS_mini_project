import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { orderActions } from '../_actions';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  });

class OrdersView extends React.Component {
    
    componentDidMount() {
        this.props.dispatch(orderActions.getAll());
        console.log(this.props)
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(orderActions.delete(id));
    }


    render(props) {
        
        const {order, orders,classes } = this.props;
    
        console.log(this.props);
        //console.log(user);
        console.log(orders);
        return (
            <div >
                <h3>All registered orders:</h3>
                {orders.loading && <em>Loading orders...</em>}
                {orders.error && <span className="text-danger">ERROR: {orders.error}</span>}
                
               {orders.items &&
                <div className={classes.root} >
                        {orders.items.map((order, index) =>
                            <div key={order._id} style={{float:"left",width:"33.33%",padding:10}}>
                                <Paper className={classes.paper}>
                                    <Grid container>
                                        <Grid item>
                                            <ButtonBase className={classes.image}>
                                                <img className={classes.img} alt="complex" src="/src/static/images/user.png" />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item>
                                            <Grid item xs container direction="column" spacing={16}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        ORDER ID: {order.id}
                                                    </Typography>
                                                    <table>
                                                    <thead>
                                                        <tr>
                                                            <th width="50%">ITEM</th>
                                                            <th width="50%">QTY</th>
                                                            
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                    {order.item.map((itemlist, index) =>
                                                     <tr key={itemlist.id}>
                                                     <td style={{fontSize:10, paddingRight:5}}>
                                                    {itemlist.item}
                                                    </td>
                                                    <td style={{fontSize:10}}>
                                                    {itemlist.qty}
                                                    </td>
                                                    </tr>
                                                    )}
                                                    </tbody>
                                                    </table>
                                                </Grid>
                                                <Grid item>
                                                <Typography >$19.00</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item >
                                            <Typography style={{ cursor: 'pointer', fontSize:12 }}>view more</Typography>
                                                
                                            </Grid>
                                         </Grid>
                                    </Grid>
                                </Paper>
                                <br/>
                            </div>
                            )}
                </div>  
                }
                <br/>
              
            </div>
        );
    }
}

function mapStateToProps(state) {
   // console.log(state);
    const { orders, ordering } = state;
    const { order } = ordering;
    return {
        order,
        orders
    };
}

const connectedHomePage = connect(mapStateToProps)(OrdersView);
const withStylesPage = withStyles(styles)(connectedHomePage);
export { withStylesPage as OrdersView };