import { useCreateContext } from './create-context';
import React from 'react'
const initialState = {
    isOpen: false,
    drawerComponent: null,
    data: null,
};
function reducer(state, action) {
    // alert('ABCDEFG');
    console.log('state------');
    console.log(state);
    console.log('action------');
    console.log(action);
    switch (action.type) {
        case 'OPEN_DRAWER':
            return {
                ...state,
                isOpen: true,
                drawerComponent: action.drawerComponent,
                data: action.data,
            };
        case 'CLOSE_DRAWER':
            return {
                ...state,
                isOpen: false,
                drawerComponent: null,
                data: null,
            };
        default:
            return state;
    }
}
//const [useDrawerState, useDrawerDispatch, DrawerProvider] = useCreateContext(initialState, reducer);
class useDrawerState extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  class useDrawerDispatch extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  class DrawerProvider extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }

export { useDrawerState, useDrawerDispatch, DrawerProvider };
 