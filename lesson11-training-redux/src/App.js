import React, { Component } from 'react';
import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import _ from "lodash"
import demo from "./training/demo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isFormOpen: false,
            taskEditing: null,
            filter: {
                name: "",
                status: -1
            },
            keyword: "",
            sortBy: "name",
            sortValue: 1
        };
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem("tasks")) {
            var tasks = JSON.parse(localStorage.getItem("tasks"));
            this.setState({
                tasks: tasks
            });
        }
    }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    } 

    generateId(){
        return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4();
    }
    
    onToggleForm = () => {
        if (this.state.isFormOpen && this.state.taskEditing !== null) {
            this.setState({
                isFormOpen: true,
                taskEditing: null
            });
        } else {
            this.setState({
                isFormOpen: !this.state.isFormOpen,
                taskEditing: null
            });
        }
    }

    onCloseForm = () => {
        this.setState({
            isFormOpen: false
        });
    }

    onShowForm = () => {
        this.setState({
            isFormOpen: true
        });
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if (data.id) {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        } else {
            data.id = this.generateId();
            tasks.push(data);
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = _.findIndex(tasks, (task) => {
            return task.id === id;
        });
        // const newTasks = tasks.map(task => {
        //   if (task.id === id) {
        //     task.status = !task.status
        //   }
        //   return task;
        // })
        tasks[index].status = !tasks[index].status;
        this.setState({tasks: tasks})
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    onUpdateItem = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();
    }

    onDeleteItem = (id) => {
       var {tasks} = this.state;
       var index = this.findIndex(id);
       if (index !== -1) {
            tasks.splice(index,1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem("tasks",JSON.stringify(tasks));
       }
       this.onCloseForm();
    }

    onFilter = (filterName, filterStatus) => {
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: parseInt(filterStatus, 10)
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
    }

    findIndex(id){
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });

        return result;
    }
    
  render() {
      var {tasks, isFormOpen, taskEditing, filter, keyword, sortBy, sortValue}=this.state;

      if (filter) {
        if (filter.name) {
            tasks = _.filter(tasks, function(task) { return task.name.toLowerCase().indexOf(filter.name) !== -1; });
            // tasks = tasks.filter((task) => {
            //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
            // });
        } 

        tasks = _.filter(tasks, function(task) { 
            if (filter.status === -1) {
                return task;
            } else {
                return task.status === (filter.status === 0 ? false : true);
            } 
        });

        // tasks = tasks.filter((task) => {
        //     if (filter.status === -1) {
        //         return task;
        //     } else {
        //         return task.status === (filter.status === 0 ? false : true);
        //     }
        // });
      }

      if (keyword) {
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        });
      }

      if (sortBy === "name") {
        tasks.sort((a, b) => {
            if (a.name > b.name) return sortValue;
            else if (a.name < b.name) return -sortValue;
            else return 0;
        });
      } else {
        tasks.sort((a, b) => {
            if (a.status > b.status) return -sortValue;
            else if (a.status < b.status) return sortValue;
            else return 0;
        });
      }
      
 
      var elmTaskForm = isFormOpen ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} task={taskEditing}/> : "";
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
                <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                {/* List */}
                <TaskList tasks = {tasks} onFilter={this.onFilter} onUpdateStatus={this.onUpdateStatus} onUpdateItem={this.onUpdateItem} onDeleteItem={this.onDeleteItem}/>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
