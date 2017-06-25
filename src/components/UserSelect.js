/**
 * Created by chengyuan on 17/1/18.
 */
import React,{Component, PropTypes} from 'react';
import {Select} from 'antd';
const Option = Select.Option;

export default class UserSelect extends Component{

  static defaultProps = {
    dispatch: ()=>{},
    onSelect: ()=>{},
  };

  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }

  componentWillMount() {
    this.loadList('');
  }

  loadList = (v)=>{
    this.props.dispatch({
      type: "user/getUsers",
      params: {
        pageIndex: 1,
        searchKey: v,
      },
      callback: (users)=>{
        console.log(users)
        this.setState({users});
      },
      isSetList: false,
    });
  }


  handleSelect(v){
    this.props.onSelect(v);
  }


  render() {
    let users = this.state.users;
    if(users.length > 0 && users[0].user_id != 0) {
      users.unshift({user_id: 0,name: '全部'});
    };
    return (
      <div>
        <Select
          showSearch={true}
          placeholder="输入用户昵称"
          notFoundContent=""
          optionFilterProp="children"
          onSearch={this.loadList}
          onSelect={this.handleSelect.bind(this)}
          style={{width: 150}}
        >
          {users.map((user,i)=>{
            return (
              <Option key={user.user_id+''}>{user.name}</Option>
            );
          })}
        </Select>
      </div>
    );
  }
}

