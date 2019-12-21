import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
// import App from './App';
import Dashboard from './Dashboard/Screen'
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
       primary: {
          light: '#fff',
          main: 'rgb(23, 105, 170)',
          dark: '#0d47a1'
       },
       secondary: {
         main: '#fff',
       },
    },
    typography: { 
       useNextVariants: true
    }      
 });

ReactDOM.render(
    <MuiThemeProvider theme = { theme }>
        <Dashboard />
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
