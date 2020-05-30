import React, { Component } from "react";
import './splash.screen.css';
import logo from './logo.png'
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Redirect } from "react-router-dom";

enum ServiceFetchType {
    LOADING,
    DONE,
    ERROR
}

interface SplashScreenState {
    plcService: ServiceFetchType
    masterService: ServiceFetchType
    detectionService: ServiceFetchType
}

export default class SplashScreen extends Component<any, SplashScreenState>{

    constructor(props: any) {
        super(props)
        this.state = {
            plcService: ServiceFetchType.LOADING,
            masterService: ServiceFetchType.LOADING,
            detectionService: ServiceFetchType.LOADING
        }
    }

    render() {
        if (this.allFetchSuccess())
            return <Redirect to="/home" />
        else
            return (
                <Container fluid className="vh-100 p-0">
                    <Row className="h-100 justify-content-center align-items-center no-gutters">
                        <Col className="col-auto">
                            <img width="200px" src={logo} alt="Logo" className="mx-auto d-block" />
                            <div className="mt-5 mb-2">
                                {this.displayListItem(this.state.masterService, "Master Service at port 5000")}
                                {this.displayListItem(this.state.plcService, "Plc Service at port 5001")}
                                {this.displayListItem(this.state.detectionService, "Image Detection Service at port 5002")}
                            </div>
                            {(this.fetchError()) ? (
                                <div className="text-center">
                                    <Button variant="outline-success" onClick={this.fetchAll}>Try Again</Button>
                                </div>
                            ) : null}
                        </Col>
                    </Row>
                </Container>
            )
    }

    displayListItem(status: ServiceFetchType, text: string) {
        return (
            <Row className="no-gutters">
                {(status === ServiceFetchType.LOADING) ? (
                    <div className="col-auto" ><Spinner animation="border" role="success" variant="secondary" /></div>
                ) : null}

                {(status === ServiceFetchType.DONE) ? (
                    <FaCheck size="2.1em" className="text-success" />
                ) : null}

                {(status === ServiceFetchType.ERROR) ? (
                    <FaTimes size="2.1em" className="text-danger" />
                ) : null}
                <div className="col-auto pl-3"><h4>{text}</h4></div>
            </Row>
        )
    }

    componentDidMount() {
        this.fetchAll()
    }

    fetchAll = () => {
        this.setState({
            masterService: ServiceFetchType.LOADING,
            plcService: ServiceFetchType.LOADING,
            detectionService: ServiceFetchType.LOADING
        })
        fetch('http://localhost:5000').then(async res => {
            this.setState({ masterService: ServiceFetchType.DONE })
        }).catch(error => {
            this.setState({ masterService: ServiceFetchType.ERROR })
        })

        fetch('http://localhost:5001').then(async res => {
            this.setState({ plcService: ServiceFetchType.DONE })
        }).catch(error => {
            this.setState({ plcService: ServiceFetchType.ERROR })
        })

        fetch('http://localhost:5002').then(async res => {
            this.setState({ detectionService: ServiceFetchType.DONE })
        }).catch(error => {
            this.setState({ detectionService: ServiceFetchType.ERROR })
        })
    }

    allFetchSuccess(): boolean {
        return (this.state.plcService === ServiceFetchType.DONE 
            && this.state.masterService === ServiceFetchType.DONE 
            && this.state.detectionService === ServiceFetchType.DONE)
    }

    fetchError(): boolean {
        return (this.state.plcService === ServiceFetchType.ERROR 
            || this.state.masterService === ServiceFetchType.ERROR
            || this.state.detectionService === ServiceFetchType.ERROR)
    }
}