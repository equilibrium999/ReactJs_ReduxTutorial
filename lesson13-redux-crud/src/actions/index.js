import * as types from "./../constants/ActionTypes";

export const list_all = () => {
    return {
        "type": types.LIST_ALL
    }
};

export const add_task = (task) => {
    return {
        "type": types.ADD_TASK,
        task
     }
};