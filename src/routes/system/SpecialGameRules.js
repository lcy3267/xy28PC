import React, {Component} from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
import AddSpecialGameRule from '../../components/AddSpecialGameRule';

class Rooms extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      specialGameRules: [],
      showAdd: false,
    };
  }

  componentWillMount() {
    this.loadRules();
  }

  loadRules = ()=>{
    this.props.dispatch({
      type: 'lottery/specialGameRules',
      callback: (specialGameRules)=>{
        this.setState({specialGameRules})
      }
    });
  }

  columns = [
    {title: '规则名称', dataIndex: 'name',},
    {title: '规则类型', dataIndex: 'rule_type',render: (text)=>text == 1?'大小单双':'组合'},
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

    let str = number == 3? `${records[key]+1} 及以上` : `${number !== 1 ?records[key]+1 : records[key]} ~ ${records[nextKey]}`
    str += `(陪率: ${records[`rate_${number}`]})`;
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
          <span style={{marginLeft: 20}}>
            <a onClick={()=>{this.setState({showAdd: true, rule: null})}}>添加赔率规则</a>
          </span>
        </div>
        <Table
          rowKey={record => record.id}
          dataSource={ this.state.specialGameRules } columns={this.columns}/>
        {this.state.showAdd?<AddSpecialGameRule hideFunc={()=>{this.setState({showAdd: false})}}
                                             rule={this.state.rule} callback={this.addCallback}/>:null}
      </div>
    );
  }


}

export default connect(({})=> {
  return {};
})(Rooms);
