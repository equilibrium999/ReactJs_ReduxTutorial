import React, { Component } from 'react';
import TaskItem from "./TaskItem";

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: "",
            filterStatus: -1 // All: -1, Activated: 1, Hidden: 0
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === "filterName" ? value : this.state.filterName,
            name === "filterStatus" ? value : this.state.filterStatus
        );
        this.setState({
            [name]: value
        });
    }

  render() {
    var {tasks} = this.props;
    var {filterName, filterStatus} = this.state;
    var elmTask = tasks.map((task, index) => {
        return  <TaskItem key={task.id} index={index} task = {task} onUpdateStatus={this.props.onUpdateStatus} onUpdateItem={this.props.onUpdateItem} onDeleteItem={this.props.onDeleteItem}/>
    });
    return (
    <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange}/>
                        </td>
                        <td>
                            <select className="form-control" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                                <option value={-1}>All</option>
                                <option value={0}>Hidden</option>
                                <option value={1}>Activated</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTask}
                </tbody>
            </table>
        </div>
    </div>
    );
  }
}

export default TaskList;
