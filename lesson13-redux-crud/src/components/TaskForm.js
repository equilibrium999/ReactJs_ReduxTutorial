import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskForm extends Component {
    componentWillMount(){
        if(this.props.task && this.props.task.id !== null) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
        } else {
           this.onClear();
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === "status") {
            value = target.value === "true" ? true : false;
        }
        this.setState({
            [name]: value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmitTask(this.state);

        // Clear fields and close the form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: "",
            status: false
        });
    }

  render() {
    var {id} = this.state;
    if (!this.props.isFormOpen) return null;
    return (
    <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title">{id !== "" ? "Edit Task" : "Add Task"}
            <span className="fa fa-times-circle pull-right" onClick={this.onCloseForm}></span>
            </h3>
        </div>
        <div className="panel-body">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
                </div>
                <label>Status: </label>
                <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                    <option value={true}>Activated</option>
                    <option value={false}>Hidden</option>
                </select>
                <br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">{id !== "" ? "Save" : "Add"}</button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onClear}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        "isFormOpen": state.isFormOpen,
        "task": state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        "onSubmitTask": (task) => {
            dispatch(actions.submit_task(task));
        },
        "onCloseForm": () => {
            dispatch(actions.close_form());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
