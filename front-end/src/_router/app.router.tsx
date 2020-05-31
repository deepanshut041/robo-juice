import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import React, { Component } from 'react';
import SplashScreen from "../_screens/splash/splash.screen";
import AuthScreen from "../_screens/auth/auth.screen";
import HomeScreen from "../_screens/home/home.screen";

class AppRouter extends Component<RouteComponentProps> {

    render() {
        console.log(this.props)
        return (
            <Switch>
                <Route path="/auth" exact component={AuthScreen} />
                <Route path="/home" exact component={HomeScreen} />
                <Route path="/" exact component={SplashScreen} />
            </Switch>
        )
    }

}

export default withRouter(AppRouter)