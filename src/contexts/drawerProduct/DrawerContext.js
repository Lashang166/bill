import { useCreateContext } from './create-context';
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
const [useDrawerState, useDrawerDispatch, DrawerProvider] = useCreateContext(initialState, reducer);

export { useDrawerState, useDrawerDispatch, DrawerProvider };
 