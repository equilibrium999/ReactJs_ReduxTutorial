import React, { Component } from 'react';
import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import _ from "lodash"
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: "name",
            sortValue: 1
        };
    }
    
    onToggleForm = () => {
        var {itemEditing} = this.props;
        if (itemEditing && itemEditing.id !== "") {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            "id": "",
            "name": "",
            "status": false
        });
    }

    onShowForm = () => {
        this.setState({
            isFormOpen: true
        });
    }
 
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
    }

    render() {
      var {sortBy, sortValue}=this.state;
      var {isFormOpen} = this.props;

    //   if (sortBy === "name") {
    //     tasks.sort((a, b) => {
    //         if (a.name > b.name) return sortValue;
    //         else if (a.name < b.name) return -sortValue;
    //         else return 0;
    //     });
    //   } else {
    //     tasks.sort((a, b) => {
    //         if (a.status > b.status) return -sortValue;
    //         else if (a.status < b.status) return sortValue;
    //         else return 0;
    //     });
    //   }
      
        var elmTaskForm = isFormOpen ? <TaskForm/> : "";
        return (
        <div className="container">
            <div className="text-center">
                <h1>Task Management</h1>
                <hr/>
            </div>
            <div className="row">
                <div className={isFormOpen ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                    {/* Form */}
                    {elmTaskForm}
                </div>
                <div className={isFormOpen ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                    <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                        <span className="fa fa-plus mr-5"></span>Add Task
                    </button>
                    {/* Search - Sort */}
                    <Control onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                    {/* List */}
                    <TaskList/>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        "isFormOpen": state.isFormOpen,
        "itemEditing": state.itemEditing
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        "onToggleForm": () => {
            dispatch(actions.toggle_form());
        },
        "onClearTask": (task) => {
            dispatch(actions.edit_task(task));
        },   
        "onOpenForm": () => {
            dispatch(actions.open_form());
        },  
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
