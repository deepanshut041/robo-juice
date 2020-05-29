import React, { Component } from "react";
import AuthRouter from "../../_router/auth.router";

export default class AuthScreen extends Component{
    
    render(){
        return (
            <div>
                <h1>Auth Screen</h1>
                <AuthRouter/>
            </div>
        )
    }
}