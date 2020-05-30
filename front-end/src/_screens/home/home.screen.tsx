import React, { Component } from "react";
import io from "socket.io-client";
import WelcomeScreen from "./welcome/welcome.screen";
import TakeOrderScreen from "./order/take-order.screen";
import ConfirmOrderScreen from "./order/confirm-order.screen";

export default class HomeScreen extends Component{
    socket: any

    constructor(props:any){
        super(props)
        this.socket = io("http://localhost:5000"); 
    }

    componentDidMount(){
        this.setStatusListener()
    }

    setStatusListener(){
        this.socket.on("status", (data:any) =>{
            console.log(data)
        })
    }
    
    render(){
        return (
            <div>
                <h1>Home Screen</h1>
            </div>
        )
    }

    renderComponent(shopStatus: any){
        switch (shopStatus) {
            case "WELCOME":
                return (<WelcomeScreen/>)
            case "TAKE_ORDER":
                return (<TakeOrderScreen/>)
            case "CONFIRM_ORDER":
                return (<ConfirmOrderScreen/>)         
            default:
                break;
        }
    }
}