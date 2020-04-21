import { createSelector, createStructuredSelector } from "@reduxjs/toolkit";

const selector1 = state => state.v1;

const selector2 = state => state.v2;

const selector3 = createSelector(
    [selector1, selector2],
    (s1, s2) => s1+s2
);

const selector4 = state => state.v;

const selector5 = createSelector(
    selector4,
    values => values.reduce( (value, current) => current >= value ? current : value, 0)
);

const selector6 = createSelector(
    [selector3, selector5],
    (s3, s5) => s3 >= s5 ? s3 : s5
);

const selector7 = state => state.form;

const selector8 = state => state.values;

const selector9 = state => state.sagaStatus;


const selector10 = createStructuredSelector( {
    max: selector6,
    sum: selector3,
    form: selector7,
    values: selector8,
    saga: selector9
});


export {selector10}
