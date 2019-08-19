import { combineReducers, AnyAction } from 'redux';
import * as actionTypes from './actionTypes';

function randomNumberFacts(
    state = {
        currentFact: '',
        savedFacts: [],
        isLoading: false,
        error: '',
    },
    action: AnyAction,
) {
    switch (action.type) {
        case actionTypes.GET_RANDOM_NUMBER_FACT_STARTED:
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        case actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS:
            return {
                ...state,
                currentFact: action.randomNumberFact,
                savedFacts: [...state.savedFacts],
                isLoading: false,
            };
        case actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE:
            return {
                ...state,
                savedFacts: [...state.savedFacts],
                isLoading: false,
                error: action.error,
            };
        case actionTypes.SAVE_RANDOM_NUMBER_FACT:
            return {
                ...state,
                currentFact: '',
                savedFacts: [...state.savedFacts, action.fact],
                isLoading: false,
            };
        default:
            return state;
    }
}

const reducer = combineReducers<any>({
    randomNumberFacts,
});

export default reducer;
