import React from 'react';
import PropTypes from 'prop-types';
import {ALL, COMPLETED_ONLY} from "../../logic/constants";
import {deleteItem, setCompletionFilter, toggleItem} from '../../logic/actions';
import {connect} from "react-redux";
import './styles.css';
import {getTasks} from "./selector";

const getCompletionStatus = (isComplete) => {
    return isComplete ? ' Un - complete' : ' Complete';
};

export const ItemsList = ({items, isFilterAll, onDeleteItem, onToggleItem, onChangeFilter}) => {
    return (
        <div>
            <ul className={'itemsList-ul'}>
                {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}

                <div>
                    <label>Filter</label>
                    <label>
                        <input type="radio" checked={isFilterAll} value={ALL}
                               onChange={() => onChangeFilter(ALL)}/>All
                    </label>
                    <label>
                        <input type="radio" checked={!isFilterAll} value={COMPLETED_ONLY}
                               onChange={() => onChangeFilter(COMPLETED_ONLY)}/>Completed only
                    </label>
                </div>
                {items.map(item =>
                    <li key={item.id}>{item.content}
                        <button id={'del'} onClick={() => onDeleteItem(item.id)} title="Delete">X</button>
                        <button onClick={() => onToggleItem(item.id)} title={getCompletionStatus(item.isComplete)}>
                            {getCompletionStatus(item.isComplete)}
                        </button>
                    </li>)}
            </ul>
        </div>
    );
};

ItemsList.propTypes = {
    items: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
    return {
        items: getTasks(state.todos.items, state.todos.filter),
        isFilterAll: state.todos.filter === ALL
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteItem: (id) => {
            dispatch(deleteItem(id));
        },
        onToggleItem: (id) => {
            dispatch(toggleItem(id));
        },
        onChangeFilter: (filter) => {
            dispatch(setCompletionFilter(filter));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
