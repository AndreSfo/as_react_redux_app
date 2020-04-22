const CHANGE_VALUES = '@@changevalues@@/changevalues';
const ADD_VALUES = '@@changevalues@@/addvalues';
const REMOVE_VALUES = '@@changevalues@@/removevalues';
const ACTION_LOAD = '@@saga@@/actionLoad';
const ACTION_LOADING = '@@saga@@/actionLoading';
const ACTION_DONE = '@@saga@@/actionDone';
const ACTION_DONE_OK = '@@saga@@/actionDoneOk';

const changeAction = (value, key) => {
    console.log("CHANGE ACTION");
    return {
        type: CHANGE_VALUES,
        payload: {
            value, key
        }
    }
}

const addValue = (value) => {
    console.log("ADD ACTION");
    return {
        type: ADD_VALUES,
        payload: {
            value
        }
    }
}

const removeValue = (index) => {
    console.log("REMOVE ACTION");
    return {
        type: REMOVE_VALUES,
        payload: {
            index
        }
    }
}

const startAction = () => {
    console.log("START ACTION");
    return {
        type: ACTION_LOAD
    }
}

const doneAction = () => {
    console.log("DONE ACTION");
    return {
        type: ACTION_DONE_OK
    }
}

export {
    CHANGE_VALUES, ADD_VALUES, REMOVE_VALUES, ACTION_LOAD, ACTION_LOADING, ACTION_DONE,ACTION_DONE_OK,
    changeAction, addValue, removeValue, startAction, doneAction
}
