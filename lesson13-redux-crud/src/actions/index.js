import * as types from "./../constants/ActionTypes";

export const list_all = () => {
    return {
        "type": types.LIST_ALL
    };
};

export const toggle_form = () => {
    return {
        "type": types.TOGGLE_FORM
    };
};

export const open_form = () => {
    return {
        "type": types.OPEN_FORM
    };
};

export const close_form = () => {
    return {
        "type": types.CLOSE_FORM
    };
};

export const update_status = (id) => {
    return {
        "type": types.UPDATE_STATUS,
        id
    };
};

export const delete_task = (id) => {
    return {
        "type": types.DELETE_TASK,
        id
    }
}

export const edit_task = (task) => {
    return {
        "type": types.EDIT_TASK,
        task
    }
}

export const submit_task = (task) => {
    return {
        "type": types.SUBMIT_TASK,
        task
    }
}

export const filter_task =  (filter) => {
    return {
        "type": types.FILTER_TABLE,
        filter
    }
}

export const search_task =  (keyword) => {
    return {
        "type": types.SEARCH,
        keyword
    }
}

export const sort_task =  (sort) => {
    return {
        "type": types.SORT,
        sort
    }
}