/**
 * Created by chengyuan on 2017/3/25.
 */
import React, {Component} from 'react';
import {Select} from 'antd';
import { connect } from 'dva'

const Option = Select.Option;

class RuleRatesSelect extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.paly_type = this.props.paly_type;

    this.state = {
      rule_id: this.props.rule_id
    };
  }

  componentWillMount() {
    const { ruleRates } = this.props.lottery;
    if(ruleRates.length == 0){
      this.loadRules();
    }
  }

  loadRules = ()=>{
    this.props.dispatch({
      type: 'lottery/gameRules',
    });
  }

  updateRules =(v)=>{
    this.setState({rule_id: v});
    const {updateRules} = this.props;
    updateRules(v);
  }

  render() {

    const { ruleRates } = this.props.lottery;

    let options = [];

    ruleRates.map((rule)=>{
      if(rule.play_type == this.paly_type){
        options.push(<Option key={rule.id+''}>{rule.name}</Option>) ;
      }
    });

    return (
      <Select
        style={{width: 150}}
        value={this.state.rule_id+''}
        onChange={this.updateRules}
      >
        {options}
      </Select>
    )
  }
}

export default connect(({ lottery })=>{
  return { lottery };
})(RuleRatesSelect);
