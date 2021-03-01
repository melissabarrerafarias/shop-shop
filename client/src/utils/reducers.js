import { 
    UPDATE_PRODUCTS, 
    UPDATE_CATEGORIES, 
    UPDATE_CURRENT_CATEGORY
} from './actions';
import { useReducer } from 'react'; 

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of "UPDATE_PRODUCTS", return a new state object with an updated products array
        case UPDATE_PRODUCTS: 
        return {
            ...state, 
            products: [...action.products],
        }; 
        // if action type value is of "UPDATE_CATEGORIES", return a new state object with an updated categories array 
        case UPDATE_CATEGORIES: 
        return {
            ...state, 
            categories: [...action.categories]
        };
        // if action type is of "UPDATE_CURRENT_CATEGORY", return a new state object with updated current_category value 
        case UPDATE_CURRENT_CATEGORY: 
        return {
            ...state, 
            currentCategory: action.currentCategory
        };
        // if it's none of these actions, do not update state at all and keep the same thing
        default: 
        return state; 
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState); 
}