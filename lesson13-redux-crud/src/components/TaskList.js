import React, { Component } from 'react';
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import _ from "lodash";

class TaskList extends Component {
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            "name": name === "filterName" ? value : this.props.filterTable.name,
            "status": name === "filterStatus" ? value : this.props.filterTable.status
        };
        this.props.onFilterTable(filter);
    }

  render() {
    var {tasks, filterTable, keyword, sort} = this.props;
    // filter on table
    if (filterTable.name) {
        tasks = _.filter(tasks, function(task) { return task.name.toLowerCase().indexOf(filterTable.name) !== -1; });
    }

    tasks = _.filter(tasks, function(task) { 
        if (filterTable.status === -1) {
            return task;
        } else {
            return task.status === (filterTable.status === 0 ? false : true);
        } 
    });

    if (keyword) {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        });
    }

    if (sort.by === "name") {
        tasks.sort((a, b) => {
            if (a.name > b.name) return sort.value;
            else if (a.name < b.name) return -sort.value;
            else return 0;
        });
    } else {
        tasks.sort((a, b) => {
            if (a.status > b.status) return -sort.value;
            else if (a.status < b.status) return sort.value;
            else return 0;
        });
    }

    var elmTask = tasks.map((task, index) => {
        return  <TaskItem key={task.id} index={index} task = {task}/>
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
                            <input type="text" className="form-control" name="filterName" value={this.props.filterTable.name} onChange={this.onChange}/>
                        </td>
                        <td>
                            <select className="form-control" name="filterStatus" value={this.props.filterTable.status} onChange={this.onChange}>
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

const mapStateToProps = (state) => {
    return {
        "tasks": state.tasks,
        "filterTable": state.filterTable,
        "keyword": state.search,
        "sort": state.sort
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        "onFilterTable": (filter) => {
            dispatch(actions.filter_task(filter));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
