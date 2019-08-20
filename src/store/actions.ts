import axios from 'axios';
import * as actionTypes from './actionTypes';

export function getRandomNumberFactStarted() {
    return { type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED };
}

export function getRandomNumberFactSuccess(randomNumberFact: string) {
    return { type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS, randomNumberFact };
}

export function getRandomNumberFactFailure(error: string) {
    return { type: actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE, error };
}

// Thunk
export function saveRandomNumberFact() {
    return (dispatch: any, getState: any) =>
        dispatch({ type: actionTypes.SAVE_RANDOM_NUMBER_FACT, fact: getState().randomNumberFacts.currentFact });
}

// Thunk
export function getRandomNumberFact() {
    return (dispatch: any) => {
        dispatch(getRandomNumberFactStarted());
        return axios
            .get(`http://numbersapi.com/random/math`)
            .then(res => {
                dispatch(getRandomNumberFactSuccess(res.data));
            })
            .catch(e => {
                console.error(e.message);
                dispatch(getRandomNumberFactFailure('Failed to load random error'));
            });
    };
}
