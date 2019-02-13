import { createStore } from "redux";

var initialState = {
    status: false,
    sort : {
        by: "name",
        value: 1
    }
};

var myReducer = (state = initialState, action) => {
    if (action.type === "TOGGLE_STATUS") {
        state.status = !state.status;
    }

    if (action.type === "SORT") {
        var { by, value } = action.sort;
        var { status } = state;

       return {
           status: status,
           sort: {
               by: by,
               value: value
           }
       }
    }
    return state;
}

const store = createStore(myReducer);

// Toggle status
var action = {
    type: "TOGGLE_STATUS"
};

console.log("Default: ", store.getState());
store.dispatch(action);
console.log("TOGGLE_STATUS: ", store.getState());

// Sort Z - A by name
var sortAction = {
    type: "SORT",
    sort: {
        by: "name",
        value: -1
    }
};
console.log("Default: ", store.getState());
store.dispatch(sortAction);
console.log("SORT: ", store.getState());