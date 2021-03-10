import React, { useContext, createContext } from 'react';
export function useCreateContext(defaultValue, reducer) {
    const defaultDispatch = () => defaultValue;
    const stateCtx = createContext(defaultValue);
    const dispatchCtx = createContext(defaultDispatch);
    function useStateCtx(property) {
        const state = useContext(stateCtx);
        return state[property]; // only one depth selector for comparison
    }
    function useDispatchCtx() {
        return useContext(dispatchCtx);
    }
    function Provider({ children }) {
        const [state, dispatch] = React.useReducer(reducer, defaultValue);
        return (<dispatchCtx.Provider value={dispatch}>
        <stateCtx.Provider value={state}>{children}</stateCtx.Provider>
      </dispatchCtx.Provider>);
    }
    return [useStateCtx, useDispatchCtx, Provider];
}
// const [useTextState, useTextDispatch, TextProvider] = useCreateContext(initialState, reducer);
// export const TextContext = ctx;
// export function App() {
//   return (
//     <TextProvider>
//       <Component />
//     </TextProvider>
//   )
// }
// export function Component() {
//   const state = useTextState('state')
//   const dispatch = useTextDispatch()
// const increment = useCallback(() => dispatch({ type: 'increment' }), [dispatch]);
//   return (
//     <div>
//       {state}
//       <button onClick={increment}>Toggle</button>
//     </div>
//   )
// }
