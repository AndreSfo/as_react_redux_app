import {all, put, takeLatest, call} from "@redux-saga/core/effects";
import {ACTION_LOAD, ACTION_LOADING, ACTION_DONE} from "../actions/actions";

function getAll() {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve(35);
        }, 5000);
    });
}

function * sagaStarted() {
    yield takeLatest(ACTION_LOAD, fetchAction);
}

function * fetchAction() {
    yield put({type: ACTION_LOADING}); //PUT esegue il dispatch di un'azione (invia ACTION sullo STORE)
    const elements = yield call(getAll); //CALL metodo per eseguire funzione asincrone 
    yield put({type: ACTION_DONE, payload: elements});
}

export default function * root() {
    console.log("START SAGA");
    yield all([sagaStarted()]); 
}