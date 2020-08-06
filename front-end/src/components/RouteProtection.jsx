import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { mapToPropsUser } from '../redux/mapStateToProps';
import { routeProtection } from '../redux/actions/userActions'

class RouteProtection extends Component {

    componentDidMount() {
        if (this.props.userObj.user) {
            this.props.routeProtection()
        }
    }
    render() {
        const { userObj, component: Component, ...rest } = this.props;
        return (
            <>
                <Route {...rest} render={(props) => (
                    userObj.user ? <Component {...props} /> : <Redirect to="/login" />
                )} />
            </>
        );
    }
};



export default connect(mapToPropsUser, { routeProtection })(RouteProtection);

