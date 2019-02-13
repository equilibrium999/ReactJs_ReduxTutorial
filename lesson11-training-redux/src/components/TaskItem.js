import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id);
    }

    onUpdateItem = () => {
        this.props.onUpdateItem(this.props.task.id);
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
            <button type="button" className="btn btn-warning" onClick={this.onUpdateItem}>
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

export default TaskItem;
