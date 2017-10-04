import {ADD_ITEM, DELETE_ITEM, SET_COMPLETION_FILTER, TOGGLE_ITEM} from './constants';

export const addItem = content => {
  return { type: ADD_ITEM, content };
};

export const deleteItem = id => {
    return { type: DELETE_ITEM, id };
};

export const toggleItem = id => {
    return { type: TOGGLE_ITEM, id };
};

export const setCompletionFilter = filter => {
    return { type: SET_COMPLETION_FILTER, filter };
};