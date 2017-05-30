import React, {Component} from 'react';
import {Modal, InputNumber, Input, message, Select} from 'antd';
import { connect } from 'dva';
const Option = Select.Option;

class AddRollbackRule extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      levels: [],
      rates: [],
    };
  }

  componentWillMount() {
  }

  LevelsNumber = (number,hasAdd = false)=>{
    const onChange = (v, number)=>{
      let levels = this.state.levels;
      levels[number] = v;
      this.setState({levels});
    }
    let value = hasAdd ? this.state.levels[number]+1 : this.state.levels[number];
    value = value || value == 0 ? value : undefined;
    return <InputNumber value={value} onChange={(v)=>{onChange(v, number)}}/>
  }

  ratesNumber = (number)=>{
    const onChange = (v, number)=>{
      let rates = this.state.rates;
      rates[number] = v;
      this.setState({rates});
    }
    return <InputNumber value={this.state.rates[number]} onChange={(v)=>{onChange(v, number)}}/>
  }

  doSave = ()=>{
    const name = this.state.name;
    const levels = this.state.levels;
    const rates = this.state.rates;
    const ruleLevel = this.state.ruleLevel;
    const len = levels.length;

    let ok = true;
    if(len != 4 || rates.length != 4 || !name) {
      message.error('请将回水规则填写完整!!');
      return;
    }

    for (let i = 0; i < len; i++){
      if(i < len - 1){
        if(levels[i] > levels[i+1]) {
          ok = false;
          message.error('请填写正确的回水规则!!');
          break;
        };
      }
    }

    if(ok){
      this.props.dispatch({
        type: 'system/addRollback',
        params: {
          name, levels, rates, ruleLevel
        },
        callback: ()=>{
          this.props.callback();
        }
      })
    }
  }

  render() {
    return (
      <Modal
        title="添加回水规则"
        visible={true}
        onOk={this.doSave}
        onCancel={this.props.hideFunc}
        okText="添加"
        maskClosable={false}
      >
        <div>
          <div style={{height: 50}}>
            名称:<Input placeholder="请输入规则名称" style={{width: 150, marginLeft: 10}} onChange={(e)=>{this.setState({name: e.target.value})}}/>
            等级:<Select onSelect={(v)=>this.setState({ruleLevel: v})}
                       style={{width: 150}}>
            <Option key="1">初级</Option>
            <Option key="2">中级</Option>
            <Option key="3">高级</Option>
          </Select>
          </div>
          <div style={{height: 50}}>
            <label>level1:</label><span style={{marginLeft: 10}}>
            {this.LevelsNumber(0)} ~ {this.LevelsNumber(1)}
          </span>
            <label style={{marginLeft: 20}}>赔率:</label>
            <span style={{marginLeft: 10}}>{this.ratesNumber(0)} %</span>
          </div>
          <div style={{height: 50}}>
            <label>level2:</label>
            <span style={{marginLeft: 10}}>
              {this.LevelsNumber(1, true)} ~ {this.LevelsNumber(2)}
            </span>
            <label style={{marginLeft: 20}}>赔率:</label>
            <span style={{marginLeft: 10}}>{this.ratesNumber(1)} %</span>
          </div>
          <div style={{height: 50}}>
            <label>level3:</label>
            <span style={{marginLeft: 10}}>
              {this.LevelsNumber(2, true)} ~ {this.LevelsNumber(3)}
            </span>
            <label style={{marginLeft: 20}}>赔率:</label>
            <span style={{marginLeft: 10}}>{this.ratesNumber(2)} %</span>
          </div>
          <div style={{height: 50}}>
            <label>level4:</label>
            <span style={{marginLeft: 10}}>
              {this.LevelsNumber(3)} 以上
            </span>
            <label style={{marginLeft: 20}}>赔率:</label>
            <span style={{marginLeft: 10}}>{this.ratesNumber(3)} %</span>
          </div>
        </div>
      </Modal>
    )
  }
}

export default connect(()=>{
  return {};
})(AddRollbackRule);
