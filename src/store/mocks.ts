export const aRandomNumberFacts = (overrides: any = {}) => ({
    currentFact: '',
    savedFacts: [],
    isLoading: false,
    error: '',
    ...overrides,
});
