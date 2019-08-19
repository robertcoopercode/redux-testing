import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, fireEvent, wait } from '@testing-library/react';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { aRandomNumberFacts } from './store/mocks';

jest.mock('axios');

const render = (initialStore = {}) => {
    const store = createStore(rootReducer, initialStore, applyMiddleware(thunk));

    return rtlRender(
        <Provider store={store}>
            <App />
        </Provider>,
    );
};

jest.useFakeTimers();

it('should display a random fact when clicking the generate button', async () => {
    const randomFactText = 'Random fact';
    (axios.get as jest.Mock).mockResolvedValue({ data: randomFactText });
    const { getByText, queryByText } = render();

    expect(queryByText(/Save that fact/)).not.toBeInTheDocument();

    fireEvent.click(getByText(/Get new fact!/));

    expect(queryByText(/Loading.../)).toBeInTheDocument();

    jest.runAllTimers();

    await wait(() => {
        expect(queryByText(randomFactText)).toBeInTheDocument();
        expect(queryByText(/Save that fact/)).toBeInTheDocument();
    });
});

it('should replace the current random fact with a new random fact', async () => {
    const firstRandomFactText = 'First random fact';
    const secondRandomFactText = 'Second random fact';

    const { getByText, queryByText } = render();

    (axios.get as jest.Mock).mockResolvedValue({ data: firstRandomFactText });
    fireEvent.click(getByText(/Get new fact!/));
    jest.runAllTimers();

    await wait(() => {
        expect(queryByText(firstRandomFactText)).toBeInTheDocument();
    });

    (axios.get as jest.Mock).mockResolvedValue({ data: secondRandomFactText });
    fireEvent.click(getByText(/Get new fact!/));
    jest.runAllTimers();

    await wait(() => {
        expect(queryByText(secondRandomFactText)).toBeInTheDocument();
        expect(queryByText(firstRandomFactText)).not.toBeInTheDocument();
    });
});

it('should save a random fact when clicking the save button', () => {
    const randomFactText = 'Random fact';
    const { queryByLabelText, getByText, getByRole, queryByRole } = render({
        randomNumberFacts: aRandomNumberFacts({ currentFact: randomFactText }),
    });

    expect(queryByLabelText(/Currently displayed random fact/)).toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();

    fireEvent.click(getByText(/Save that fact/));

    expect(queryByLabelText(/Currently displayed random fact/)).not.toBeInTheDocument();
    expect(getByRole('listitem')).toHaveTextContent(randomFactText);
});

it('should be able to save multiple random facts', async () => {
    const firstRandomFactText = 'First random fact';
    const secondRandomFactText = 'Second random fact';
    const { queryByLabelText, getByText, getAllByRole, queryByRole } = render({
        randomNumberFacts: aRandomNumberFacts({ currentFact: firstRandomFactText }),
    });

    expect(queryByLabelText(/Currently displayed random fact/)).toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();

    fireEvent.click(getByText(/Save that fact/));

    (axios.get as jest.Mock).mockResolvedValue({ data: secondRandomFactText });
    fireEvent.click(getByText(/Get new fact!/));
    jest.runAllTimers();

    await wait(() => {
        expect(getByText(/Save that fact/)).toBeInTheDocument();
    });

    fireEvent.click(getByText(/Save that fact/));

    expect(getAllByRole('listitem').length).toBe(2);
    getAllByRole('listitem').forEach((listItem, index) => {
        if (index === 0) {
            expect(listItem).toHaveTextContent(firstRandomFactText);
        }
        if (index === 1) {
            expect(listItem).toHaveTextContent(secondRandomFactText);
        }
    });
});
