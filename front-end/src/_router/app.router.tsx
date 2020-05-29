import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import React, { Component } from 'react';
import SplashScreen from "../_screens/splash/splash.screen";
import AuthScreen from "../_screens/auth/auth.screen";
import HomeScreen from "../_screens/home/home.screen";

class AppRouter extends Component<RouteComponentProps> {

    render() {
        return (
            <Switch>
                <Route path="/" exact component={SplashScreen} />
                <Route path="/auth" component={AuthScreen} />
                <Route path="/home" component={HomeScreen} />
            </Switch>
        )
    }

}

export default withRouter(AppRouter)