/**
 * Created by chengyuan on 2017/3/25.
 */
import React, {Component} from 'react';
import {Select} from 'antd';
import { connect } from 'dva'

const Option = Select.Option;

class RollbackRuleSelect extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      rollbackRules: [],
      rule_id: this.props.rule_id
    };
  }

  componentWillMount() {
    const {rollbackRules} = this.props.system;
    if(rollbackRules.length == 0){
      this.loadRules();
    }
  }

  loadRules = ()=>{
    this.props.dispatch({
      type: 'system/rollbackRules',
      callback: (rollbackRules)=>{
        this.setState({rollbackRules})
      }
    });
  }

  updateRules =(v)=>{
    this.setState({rule_id: v});
    const {updateRules} = this.props;
    updateRules(v);
  }

  render() {

    const {rollbackRules} = this.props.system;

    return (
      <Select
        style={{width: 150}}
        value={this.state.rule_id+''}
        onChange={this.updateRules}
      >
        {rollbackRules.map((rule)=>{
          return <Option key={rule.id+''}>{rule.name}</Option>
        })}
      </Select>
    )
  }
}

export default connect(({system})=>{
  return {system};
})(RollbackRuleSelect);
