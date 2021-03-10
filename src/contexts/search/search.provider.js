import React, { useReducer } from 'react';
import { SearchContext } from './search.context';
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE':
            return { ...state, ...action.payload };
        case 'RESET':
            return { page: 1 };
        default:
            return state;
    }
}
export const SearchProvider = ({ children, query, }) => {
    const [state, dispatch] = useReducer(reducer, { ...query, page: 1 });
    return (<SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>);
};
