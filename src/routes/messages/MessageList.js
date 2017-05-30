/**
 * Created by chengyuan on 2017/5/26.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, message, Modal} from 'antd';
import {getFrontDate} from '../../utils/formatUtil';
import { Link } from 'dva/router';

class MessageList extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      systemList: [],
      count: 0,
      pageIndex: 1,
    };
  }

  componentWillMount() {
    this.loadRecords();
  }

  loadRecords = ()=>{
    this.props.dispatch({
      type: "message/systemList",
      params: {
        pageIndex: this.state.pageIndex,
      },
      callback: (rs)=>{
        this.setState({systemList: rs.systemList, count: rs.count});
      }
    });
  }

  columns = [
    {title: '发送时间', dataIndex: 'created_at', render: (text)=>getFrontDate(text,'yyyy-MM-dd hh:ss')},
    {title: '标题', dataIndex: 'title'},
    {
      title: '操作', dataIndex: 'id',
      render: (text)=>this.getOperation(text)
    },
  ];

  getTitle = (text, record)=>{
    return (
      <Link to={`/messageDetail/${record.id}`}>
        {text}
      </Link>
    )
  }

  getOperation = (text)=>{
    return <a href="javascript:;" onClick={()=>{this.delete(text)}}>删除</a>
  }

  delete = (id)=>{
    Modal.confirm({
      title: '提示',
      content: '是否要删除该条系统消息',
      onOk: ()=>{
        this.props.dispatch({
          type: 'message/deleteMessage',
          params: {id},
          callback: ()=>{
            message.success('删除成功!');
            this.loadRecords();
          }
        });
      }
    })
  }

  nextPage = (pageIndex)=>{
    this.setState({pageIndex},()=>{
      this.loadRecords();
    })
  };


  render() {
    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>
          <span style={{marginRight: 20}}>系统消息列表</span>
          <Link to="/addMessage">发送消息</Link>
        </div>
        <Table
          rowKey='id'
          expandedRowRender={record => <pre>{record.content}</pre>}
          dataSource={ this.state.systemList } columns={this.columns}
          pagination={{ pageSize: 10, total: this.state.count, onChange:this.nextPage}}
        />
      </div>  
    );
  }
}

export default connect(({user})=> {
  return {user};
})(MessageList);
