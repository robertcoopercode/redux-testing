import React, { FormEvent } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getRandomNumberFact, saveRandomNumberFact } from './store/actions';

interface Props {
    getRandomNumberFact: () => void;
    saveRandomNumberFact: () => void;
    savedFacts: string[];
    currentFact: string;
    isLoading: boolean;
}

const App: React.FC<Props> = ({ getRandomNumberFact, savedFacts, currentFact, isLoading, saveRandomNumberFact }) => {
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        saveRandomNumberFact();
    };

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={getRandomNumberFact}>Get new fact!</button>
                <form onSubmit={handleSubmit}>
                    {isLoading && <p>Loading...</p>}
                    {currentFact && (
                        <>
                            <p aria-label="Currently displayed random fact">{currentFact}</p>
                            <button type="submit">
                                Save that fact{' '}
                                <span role="img" aria-label="thumbs-up">
                                    👍🏼
                                </span>
                            </button>
                        </>
                    )}
                </form>
                <h3>Saved random number facts:</h3>
                <ul>
                    {savedFacts.map(fact => (
                        <li key={fact}>{fact}</li>
                    ))}
                </ul>
            </header>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    savedFacts: state.randomNumberFacts.savedFacts,
    currentFact: state.randomNumberFacts.currentFact,
    isLoading: state.randomNumberFacts.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
    getRandomNumberFact: () => dispatch(getRandomNumberFact()),
    saveRandomNumberFact: () => dispatch(saveRandomNumberFact()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
