import React, {Component} from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
import AddRollbackRule from '../../components/AddRollbackRule';

class Rooms extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      rollbackRules: [],
      showAdd: false,
    };
  }

  componentWillMount() {
    this.loadRules();
  }

  loadRules = ()=>{
    this.props.dispatch({
      type: 'system/rollbackRules',
      callback: (rollbackRules)=>{
        this.setState({rollbackRules})
      }
    });
  }

  columns = [
    {title: '规则名称', dataIndex: 'name',},
    {
      title: '对应房间等级', dataIndex: 'rule_level',
      render: (text)=>text == 1?'初级':text == 2?'中级':text == 3?'高级':''
    },
    {
      title: 'level1', dataIndex: 'level1',
      render: (text, record)=>this.loadLevels(record, 1)
    },
    {
      title: 'level2', dataIndex: 'level2',
      render: (text, record)=>this.loadLevels(record, 2)
    },
    {
      title: 'level3', dataIndex: 'level3',
      render: (text, record)=>this.loadLevels(record, 3)
    },
    {
      title: 'level4', dataIndex: 'level4',
      render: (text, record)=>this.loadLevels(record, 4)
    },
    {
      title: '操作', dataIndex: 'operation',
      render: (text, record, index)=><a onClick={()=>{this.updateRule(record)}}>修改规则</a>
    },
  ];

  updateRule = (record)=>{
    this.setState({ showAdd: true, rule: record });
  }

  loadLevels = (records, number)=>{

    let key = "level_"+number;
    let nextKey = "level_"+(number + 1);

    let str = number == 4? `${records[key]+1} 及以上` : `${records[key]+1} ~ ${records[nextKey]}`
    str += `(回水率: ${records[`rate_${number}`]}%)`;
    return str;
  }

  addCallback = ()=>{
    this.loadRules();
    this.setState({showAdd: false});
  }

  render() {
    return (
      <div>
        <div style={{fontSize: 15,height: 30}}>
          <span>回水条件设置</span>
        </div>
        <div>

        </div>

        <div style={{fontSize: 15,height: 30}}>
          <span>回水规则列表</span>
          <span style={{marginLeft: 20}}>
            <a onClick={()=>{this.setState({showAdd: true, rule: null})}}>添加回水规则</a>
          </span>
        </div>
        <Table
          rowKey={record => record.id}
          dataSource={ this.state.rollbackRules } columns={this.columns}/>
        {this.state.showAdd?<AddRollbackRule hideFunc={()=>{this.setState({showAdd: false})}}
                                             rule={this.state.rule} callback={this.addCallback}/>:null}
      </div>
    );
  }


}

export default connect(({})=> {
  return {};
})(Rooms);
