/**
 * Created by chengyuan on 2017/5/10.
 */
/**
 * Created by chengyuan on 2017/3/25.
 */
import React, {Component} from 'react';
import {Modal, InputNumber, Row, Col, Input} from 'antd';
import { connect } from 'dva'
import { combineRates } from '../config';


class AddSingleRules extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      rates: [],
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.singleRule){
      const {rates, name, id} = nextProps.singleRule;
      this.setState({
        rates, name, id
      });
    }
  }

  onChange = (v, key)=>{
    let rates = this.state.rates;
    rates[key] = v;
    this.setState({rates});
  }

  doSave = ()=>{

    let rates = this.state.rates;
    let ratesStr = '';
    rates.map((rate, index)=>{
      ratesStr += rate;
      if(index != (rates.length -1)){
        ratesStr += '|';
      }
    });

    if(this.state.id){
      this.props.dispatch({
        type: 'lottery/updateGameRules',
        params: {
          id: this.state.id,
          type: 2,
          name: this.state.name,
          rates: ratesStr
        },
        callback: ()=>{
          this.props.callback();
        }
      })
    }else{
      this.props.dispatch({
        type: 'lottery/addGameRules',
        params: {
          type: 2,
          name: this.state.name,
          rates: ratesStr
        },
        callback: ()=>{
          this.props.callback();
        }
      })
    }


  }

  render() {

    let rateDom = [];

    const rates = this.state.rates;

    for(let i = 0, len = 14; i < len; i++){
      rateDom.push(
        <Col key={i} span="4.8" style={{height: 35, marginLeft: 10}}>
          <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{i+1}</label>
          <InputNumber
            value={rates[i]}
            onChange={(v)=>{this.onChange(v, i)}}/>
        </Col>
      )
    }

    return (
      <Modal
        title="添加单点赔率规则"
        visible={true}
        onOk={this.doSave}
        onCancel={this.props.hideFunc}
        okText={this.state.id?'修改':'添加'}
        maskClosable={false}
        width={800}
      >
        <div>
          <label>规则名称:</label>
          <Input style={{width: 150, marginLeft: 10}} value={this.state.name}
                 onChange={(e)=>{this.setState({name: e.target.value})}}/>
        </div>
        <Row type='flex' style={{borderRadius: 4, padding: 10}}>
          {rateDom}
        </Row>
      </Modal>
    )
  }
}

export default connect(()=>{
  return {};
})(AddSingleRules);
