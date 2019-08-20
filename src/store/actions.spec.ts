import * as actions from './actions';
import * as actionTypes from './actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it('should create an action when a random fact fetch has started', () => {
    const expectedAction = {
        type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED,
    };
    expect(actions.getRandomNumberFactStarted()).toEqual(expectedAction);
});

it('should create an action for a successful fetch of a random number fact', () => {
    const text = 'random fact';
    const expectedAction = {
        type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS,
        randomNumberFact: text,
    };
    expect(actions.getRandomNumberFactSuccess(text)).toEqual(expectedAction);
});

it('should create an action for a failed fetch of a random number fact', () => {
    const text = 'failed to fetch random fact';
    const expectedAction = {
        type: actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE,
        error: text,
    };
    expect(actions.getRandomNumberFactFailure(text)).toEqual(expectedAction);
});

it('should create an action for a saved random fact', () => {
    const text = 'a random fact';

    const store = mockStore({ randomNumberFacts: { currentFact: text } });

    const expectedAction = {
        type: actionTypes.SAVE_RANDOM_NUMBER_FACT,
        fact: text,
    };

    store.dispatch(actions.saveRandomNumberFact() as any);

    expect(store.getActions()).toEqual([expectedAction]);
});

it('should create an action to start the fetch of a random fact and another action to mark the success of the fetch', done => {
    const text = 'a random fact';

    const store = mockStore({});
    (axios.get as jest.Mock).mockResolvedValue({ data: text });

    const expectedActions = [
        { type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED },
        { type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS, randomNumberFact: text },
    ];

    store.dispatch(actions.getRandomNumberFact() as any);

    store.subscribe(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
    });
});

it('should create an action to start the fetch of a random fact and another action to mark the failure of the fetch', done => {
    const store = mockStore({});
    (axios.get as jest.Mock).mockRejectedValue(new Error());

    const expectedActions = [
        { type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED },
        { type: actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE, error: 'Failed to load random error' },
    ];

    store.dispatch(actions.getRandomNumberFact() as any);

    store.subscribe(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
    });
});
