import { combineReducers } from "redux";
import tasks from "./tasks";
import isFormOpen from "./isFormOpen";
import itemEditing from "./itemEditing";
import filterTable from "./filterTable";
import search from "./search";
import sort from "./sort";

const myReducer = combineReducers({
    tasks,
    isFormOpen,
    itemEditing,
    filterTable,
    search,
    sort
})

export default myReducer;