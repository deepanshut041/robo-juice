import React, { Component } from "react";
import io from "socket.io-client";
import WelcomeScreen from "./welcome/welcome.screen";
import PrepareScreen from "./prepare/prepare.screen";
import DiliverScreen from "./diliver/diliver.screen";

interface HomeScreenState {
    shopStatus: string
}

export default class HomeScreen extends Component<any, HomeScreenState>{
    socket: any

    constructor(props: any) {
        super(props)
        this.socket = io("http://localhost:5000");
        this.state = {
            shopStatus: ""
        }
    }

    componentDidMount() {
        this.setStatusListener()
    }

    setStatusListener() {
        this.socket.on("status", (data: string) => {
            this.setState({ shopStatus: data })
        })
        this.socket.on("orders", (data: string) => {
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                <h1>Home Screen</h1>
                {this.renderComponent(this.state.shopStatus)}
            </div>
        )
    }

    renderComponent(shopStatus: string) {
        switch (shopStatus) {
            case "WELCOME":
                return (<WelcomeScreen />)
            case "ORDER_PREPARED":
                return (<PrepareScreen />)
            case "DILIVER_ORDER":
                return (<DiliverScreen />)
            default:
                return null;
        }
    }
}