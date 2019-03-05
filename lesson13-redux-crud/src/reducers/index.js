import { combineReducers } from "redux";
import tasks from "./tasks";
import isFormOpen from "./isFormOpen";
import itemEditing from "./itemEditing";
import filterTable from "./filterTable";

const myReducer = combineReducers({
    tasks,
    isFormOpen,
    itemEditing,
    filterTable
})

export default myReducer;