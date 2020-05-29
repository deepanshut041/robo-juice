import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";
import React, { Component } from 'react';
import LoginScreen from "../_screens/auth/login/login.screen";
import RegisterScreen from "../_screens/auth/register/register.screen";

class AuthRouter extends Component<RouteComponentProps> {

    url: String

    constructor(props: any) {
        super(props)
        this.url = props.match.url
    }

    render() {
        return (
            <Switch>
                <Route path={`${this.url}/login`} exact component={LoginScreen}></Route>
                <Route path={`${this.url}/register`} exact component={RegisterScreen}></Route>
            </Switch>
        )
    }

}

export default withRouter(AuthRouter)