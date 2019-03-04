import * as types from "./../constants/ActionTypes";

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

var generateId = () => {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });

    return result;
}

var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var id = "",
        index = -1;

    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SUBMIT_TASK:
            var task = {
                "id" : action.task.id ,
                "name": action.task.name,
                "status": action.task.status
            };

            if (task.id) {
                index = findIndex(state, task.id);
                state[index] = task;
            } else {
                task.id = generateId();
                state.push(task );
            }

            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            id = action.id;
            index = findIndex(state, id);

            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            // state[index].status = !state[index].status; // If uncomment this line, also uncomment line 47 in TaskItem.js
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default myReducer;