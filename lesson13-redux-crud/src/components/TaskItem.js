import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
      var {task, index} = this.props;

        return (
        <tr>
            <td>{index + 1}</td>
            <td>{task.name}</td>
            <td className="text-center">
                <span className={task.status === true ? "label label-danger" : "label label-success"}
                    onClick={this.onUpdateStatus}>
                            {task.status === true ? "Activated" : "Hidden"}
                </span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={this.onEditTask}>
                    <span className="fa fa-pencil mr-5"></span>Edit
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onDeleteItem}>
                    <span className="fa fa-trash mr-5"></span>Remove
                </button>
            </td>
        </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        // "tasks": state.tasks
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        "onUpdateStatus": (id) => {
            dispatch(actions.update_status(id));
        },
        "onDeleteTask": (id) => {
            dispatch(actions.delete_task(id));
        },
        "onCloseForm": () => {
            dispatch(actions.close_form());
        },
        "onOpenForm": () => {
            dispatch(actions.open_form());
        },
        "onEditTask": (task) => {
            dispatch(actions.edit_task(task));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
