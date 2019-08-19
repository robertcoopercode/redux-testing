import reducer from './reducers';
import * as actionTypes from './actionTypes';

it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({
        randomNumberFacts: {
            currentFact: '',
            savedFacts: [],
            isLoading: false,
            error: '',
        },
    });
});

it('should handle GET_RANDOM_NUMBER_FACT_STARTED', () => {
    expect(
        reducer(undefined, {
            type: actionTypes.GET_RANDOM_NUMBER_FACT_STARTED,
        }),
    ).toEqual({
        randomNumberFacts: {
            currentFact: '',
            savedFacts: [],
            isLoading: true,
            error: '',
        },
    });
});

it('should handle GET_RANDOM_NUMBER_FACT_SUCCESS', () => {
    expect(
        reducer(undefined, {
            type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS,
            randomNumberFact: 'a random fact',
        }),
    ).toEqual({
        randomNumberFacts: {
            currentFact: 'a random fact',
            savedFacts: [],
            isLoading: false,
            error: '',
        },
    });

    expect(
        reducer(
            {
                randomNumberFacts: {
                    currentFact: 'a random fact',
                    savedFacts: [],
                    isLoading: false,
                    error: '',
                },
            },
            {
                type: actionTypes.GET_RANDOM_NUMBER_FACT_SUCCESS,
                randomNumberFact: 'a new random fact',
            },
        ),
    ).toEqual({
        randomNumberFacts: {
            currentFact: 'a new random fact',
            savedFacts: [],
            isLoading: false,
            error: '',
        },
    });
});

it('should handle GET_RANDOM_NUMBER_FACT_FAILURE', () => {
    expect(
        reducer(undefined, {
            type: actionTypes.GET_RANDOM_NUMBER_FACT_FAILURE,
            error: 'this is an error',
        }),
    ).toEqual({
        randomNumberFacts: {
            currentFact: '',
            savedFacts: [],
            isLoading: false,
            error: 'this is an error',
        },
    });
});

it('should handle SAVE_RANDOM_NUMBER_FACT', () => {
    expect(
        reducer(undefined, {
            type: actionTypes.SAVE_RANDOM_NUMBER_FACT,
            fact: 'a cool fact',
        }),
    ).toEqual({
        randomNumberFacts: {
            currentFact: '',
            savedFacts: ['a cool fact'],
            isLoading: false,
            error: '',
        },
    });

    expect(
        reducer(
            {
                randomNumberFacts: {
                    currentFact: '',
                    savedFacts: ['a cool fact'],
                    isLoading: false,
                    error: '',
                },
            },
            {
                type: actionTypes.SAVE_RANDOM_NUMBER_FACT,
                fact: 'another cool fact',
            },
        ),
    ).toEqual({
        randomNumberFacts: {
            currentFact: '',
            savedFacts: ['a cool fact', 'another cool fact'],
            isLoading: false,
            error: '',
        },
    });
});
