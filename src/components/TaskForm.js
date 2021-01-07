import React, {Component} from 'react';
class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state={
      id: '',
      name: '',
      status: true
    }
  }
  onCloseForm=()=>{
    this.props.onCloseForm(false);
  }
  onSubmit=(event)=>{
    event.preventDefault();
    this.props.onSubmit(this.state);
  }
  onHandleChange=(event)=>{
    var target=event.target;
    var name= target.name;
    var value=target.value;
    if(name === 'status')
      value=target.value ==='true' ? true : false ;
    this.setState({
        [name]: value
    });
  }
  componentWillMount(){
    if(this.props.tasks){
      this.setState({
        id: this.props.tasks.id,
        name: this.props.tasks.name,
        status: this.props.tasks.status
      });
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.tasks){
      this.setState({
        id: nextProps.tasks.id,
        name: nextProps.tasks.name,
        status: nextProps.tasks.status
      });
    }else if(!nextProps.tasks){
      this.setState({
        id: '',
        name: '',
        status: true
      });
    }

  }
  render(){
  var {id}= this.state;
  return (
    <div className="panel panel-warning">
      <div className="panel-heading">
          <h3 className=" panel-title">{id !=='' ? 'Cập nhật công việc' : 'Thêm Công Việc'}<span 
          className="fa fa-times-circle text-right"
            onClick={this.onCloseForm}
          ></span></h3>
      </div>
      <div className="panel-body">
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label>Tên :</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name='name'
                    value={this.state.name}
                    onChange={this.onHandleChange}
                     />
              </div>
              <label>Trạng Thái :</label>
              <select 
                className="form-control"
                name='status'
                value={this.state.status}
                onChange={this.onHandleChange}
                >
                  <option value={true}>Kích Hoạt</option>
                  <option value={false}>Ẩn</option>
              </select>
              <br/>
              <div className="text-center">
                  <button 
                    type="submit" 
                    className="fa fa-plus btn btn-warning"
                    >Lưu Lại</button>&nbsp;
                  <button type="submit" className="btn btn-danger">Hủy Bỏ</button>
              </div>
          </form>
      </div>
    </div>
  );
  }
}

export default TaskForm;
