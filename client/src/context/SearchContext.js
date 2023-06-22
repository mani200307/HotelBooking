import { createContext, useEffect, useReducer } from 'react';

const dateLs = localStorage.getItem("search");
const INITAL_STATE = {
    city: undefined,
    dates: dateLs ? JSON.parse(dateLs) : [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined
    },
};

export const SearchContext = createContext(INITAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITAL_STATE;
        default:
            return state;
    }
};


export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITAL_STATE);

    useEffect(() => {
        localStorage.setItem('search', JSON.stringify(state.dates, state.city, state.options));
    }, [state.dates]);

    return (
        <SearchContext.Provider value={{ city: state.city, dates: state.dates, options: state.options, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
};