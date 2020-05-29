import React, { Component } from 'react';
import AppRouter from './_router/app.router';
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );
  }
}
