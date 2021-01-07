import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
        tasks: [],//id: unique, name, status
        isDisplayForm: false, 
        taskEditing: null,
        filter : {
          name: '',
          status : -1
        }
    };
  }
  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks=JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }
  generateData=()=>{
    var tasks=[
      {
          id: this.generateID(),
          name: 'Học lập trình',
          status: true
      },
      {
          id: this.generateID(),
          name: 'Ngủ',
          status: false
      },
      {
          id: this.generateID(),
          name: 'Game',
          status: true
      }
    ];
    console.log(tasks);
    this.setState({
      tasks: tasks
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  s4(){
    return Math.floor((1+Math.random())* 0x1000).toString(16).substring(1);
  }
  generateID(){
    return this.s4()+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4();
  }
  onToggleForm=()=>{
    this.setState({
      isDisplayForm: true,
      taskEditing: null
    });
  };
  onCloseForm=(value)=>{
    this.setState({
      isDisplayForm: value
    });
  }
  onSubmit=(data)=>{
    var {tasks}= this.state;
    if(data.id === ''){
      data.id=this.generateID();
      tasks.push(data);
    }else{
      var index=this.findIndex(data.id);
      tasks[index]= data;
    }
   this.setState({
    tasks: tasks
   });
   localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onChangeStatus=(id)=>{
    var {tasks} = this.state;
    var index=this.findIndex(id);
    if(index !==-1){
      tasks[index].status= !tasks[index].status; 
    }
    this.setState({
      tasks:tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  findIndex=(id)=>{
    var {tasks}= this.state;
    var result=-1;
    tasks.forEach((task,index)=>{
      if(task.id === id){
          result = index ;
        }
    });
    return result;
  }
  onDelete=(id)=>{
    var {tasks}=this.state;
    var index=this.findIndex(id);
    if(index !== -1){
      tasks.splice(index,1);
    }
    this.setState({
      tasks:tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }
  onUpdate=(id)=>{
    var {tasks}=this.state;
    var index= this.findIndex(id);
    var taskEditing= tasks[index];
    this.setState({
      taskEditing: taskEditing,
     isDisplayForm: true
    });
  }
  onFilter=(filterName,filterStatus)=>{
    filterStatus = parseInt(filterStatus,10);
    this.setState({
      filter: {
      name: filterName,
      status : filterStatus
    }
    });
  }
  render(){
    var {tasks,isDisplayForm,taskEditing, filter }=this.state;
    console.log(filter);
    if(filter){
      if(filter.name){
        tasks= tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1 ;
      });
    }
  }
    var elmform= isDisplayForm === true ? <TaskForm tasks={taskEditing} onCloseForm={this.onCloseForm} onSubmit={this.onSubmit}/> :'';
  return (
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
          </div>
          <div className="row">
            <div className={isDisplayForm === true? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                {elmform}
            </div>
            <div className={isDisplayForm ===  true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button type="button" 
                  className="btn btn-primary"
                  onClick={this.onToggleForm}
                  >
                <span 
                  className="fa fa-plus mr-5" 
                  ></span>Thêm Công Việc
              </button>
              <button 
                  type="button" 
                  className="btn btn-danger ml-5" 
                  onClick={this.generateData}>
                Generate Data
              </button>
              <Control/>
              <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList tasks={tasks}
                                  onChangeStatus={this.onChangeStatus}
                                  onDelete={this.onDelete}
                                  onUpdate={this.onUpdate}
                                  onFilter={this.onFilter}
                        />
                    </div>
                </div>  
            </div>
            
          </div>
        </div>
  );
  }
}

export default App;
