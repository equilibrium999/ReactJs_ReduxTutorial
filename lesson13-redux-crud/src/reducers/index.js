import { combineReducers } from "redux";
import tasks from "./tasks";
import isFormOpen from "./isFormOpen";

const myReducer = combineReducers({
    tasks,
    isFormOpen
})

export default myReducer;