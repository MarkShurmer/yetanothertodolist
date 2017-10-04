import reducer, {initialState} from '../reducer';
import {addItem, deleteItem, setCompletionFilter, toggleItem} from '../actions';
import {ALL, COMPLETED_ONLY} from "../constants";

describe('reducer', () => {
    it('should return state for unknown action', () => {
        const mockState = {test: 'testItem'};
        const mockAction = {type: 'mystery-meat'};
        const result = reducer(mockState, mockAction);
        expect(result).toEqual(mockState);
    });

    it('should use initial state if state not provided', () => {
        const mockAction = {type: 'mystery-meat'};
        const result = reducer(undefined, mockAction);
        expect(result).toEqual(initialState);
    });

    it('should add new items on ADD_ITEM', () => {
        const mockAction = addItem('Test Content');
        const result = reducer(undefined, mockAction);
        expect(result.items).toHaveLength(3);
        expect(result.items[2].id === 3);
        expect(result.items[2].content === 'Test Content');
    });

    it('should add delete item on DELETE_ITEM', () => {
        const mockAction = deleteItem(1);
        const result = reducer(undefined, mockAction);
        expect(result.items).toHaveLength(1);
        expect(result.items[0].id === 2);
        expect(result.items[0].content === 'Add filters (Use HOC)');
    });

    it('should change isComplete to true on TOGGLE_ITEM', () => {
        const mockAction = toggleItem(1);
        const result = reducer(undefined, mockAction);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id === 1);
        expect(result.items[0].content === 'Add filters (Use HOC)');
        expect(result.items[0].isComplete === true);
    });

    it('should change isComplete back to true when TOGGLE_ITEM called twice', () => {
        const mockAction = toggleItem(2);
        reducer(undefined, mockAction);
        const result = reducer(undefined, mockAction);

        expect(result.items).toHaveLength(2);
        expect(result.items[0].id === 1);
        expect(result.items[0].content === 'Add filters (Use HOC)');
        expect(result.items[0].isComplete === false);
    });

    it('should change filter when SET_COMPLETION_FILTER called with ALL', () => {
        const mockAction = setCompletionFilter(ALL);
        const result = reducer(undefined, mockAction);

        expect(result.filter).toBe(ALL);
    });

    it('should change filter when SET_COMPLETION_FILTER called with COMPLETED_ONLY', () => {
        const mockAction = setCompletionFilter(COMPLETED_ONLY);
        const result = reducer(undefined, mockAction);

        expect(result.filter).toBe(COMPLETED_ONLY);
    });

    it('shouldnt change filter when SET_COMPLETION_FILTER called with garbage', () => {
        const mockAction = setCompletionFilter('zzzz');
        const result = reducer({filter: 'ALL'}, mockAction);

        expect(result.filter).toBe(ALL);
    });

});
