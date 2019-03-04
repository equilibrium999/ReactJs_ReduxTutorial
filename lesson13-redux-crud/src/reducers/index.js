import { combineReducers } from "redux";
import tasks from "./tasks";
import isFormOpen from "./isFormOpen";
import itemEditing from "./itemEditing";

const myReducer = combineReducers({
    tasks,
    isFormOpen,
    itemEditing
})

export default myReducer;