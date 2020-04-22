import {CHANGE_VALUES, ADD_VALUES, REMOVE_VALUES, ACTION_LOADING, ACTION_DONE, ACTION_DONE_OK} from "../actions/actions";
import produce from "immer";

const reducerForm = (state = {
    v1:0,
    v2:0
}, action) => {
    console.log("REDUCER FORM");
    if (action.type === CHANGE_VALUES) {
        return produce(state, draft => {
            console.log("PAYLOAD - [" + action.payload.key + "] = " + action.payload.value);
            const payload = action.payload;
            draft[payload.key] = payload.value;
        })
    }

    return state;
}

const reducerValues = (state = [] , action) => {
    console.log("REDUCER VALUES");
    if (action.type === ADD_VALUES) {
        return produce(state, draft => {
            const payload = action.payload;
            draft.push(payload.value); //action.payload.value
        });
    }
    if (action.type === REMOVE_VALUES) {
        const index = action.payload.index;
        const result = [];
        for (let i = 0; i< state.length; i++) {
            if (i !== index) {
                result.push(state[i]);
            }
        }
        return result;
    }

    return state;
}

const reducerSagaStatus = (state = {
    waiting: 'NONE',
    value: -1
}, action) => {
    console.log("REDUCER SAGA");
    if (action.type === ACTION_LOADING) {
        return produce( state, draft => {
            draft.waiting = 'WAITING';
        });
    }
    if (action.type === ACTION_DONE) {
        return produce( state, draft => {
            draft.waiting = 'DONE';
            draft.value = action.payload;
        });
    }
    if (action.type === ACTION_DONE_OK) {
        return produce( state, draft => {
            draft.waiting = 'NONE';
        });
    }

    return state;
}

export {reducerForm, reducerValues, reducerSagaStatus};