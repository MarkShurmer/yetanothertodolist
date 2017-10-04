import {ADD_ITEM, ALL, COMPLETED_ONLY, DELETE_ITEM, SET_COMPLETION_FILTER, TOGGLE_ITEM} from './constants';

let nextId = 3;

export const initialState = {
  items: [
    { id: 1, content: 'Make sure items are completeable', isComplete: false },
    { id: 2, content: 'Add filters (Use HOC)', isComplete: false },
  ],
    filter: ALL
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItem = {
        id: nextId++,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };

      case DELETE_ITEM:
        // remove task by using filter which returns copy without removed item
        return { ...state, items: state.items.filter(i => i.id !== action.id)};

      case TOGGLE_ITEM:
          // take copy
          const copyOfItems = [...state.items];
          // now find item
          const foundItem = copyOfItems.find(i => i.id === action.id);
          if(foundItem !== undefined) {
              foundItem.isComplete = !foundItem.isComplete;
          }

          return {...state, items: copyOfItems};

      case SET_COMPLETION_FILTER:
          if(action.filter === ALL || action.filter === COMPLETED_ONLY) {
              return {...state, filter: action.filter }
          }

          return state;

    default:
      return state;
  }
};

export default reducer;
