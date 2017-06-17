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

class AddCombineRules extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      id: null,
      name: null,
      rates: {
        big: {index: 0, value: undefined},
        small: {index: 1, value: undefined},
        single: {index: 2, value: undefined},
        double: {index: 3, value: undefined},
	      max: {index: 4, value: undefined},
        big_single: {index: 5, value: undefined},
        big_double: {index: 6, value: undefined},
        small_single: {index: 7, value: undefined},
        small_double: {index: 8, value: undefined},
        min: {index: 9, value: undefined},
      },
    };
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.combineRule){
      const {rates, name, id} = nextProps.combineRule;
      this.setState({
        rates, name, id
      });
    }
  }

  onChange = (v, key)=>{
    let rates = this.state.rates;
    rates[key].value = v;
    this.setState({rates});
  }

  doSave = ()=>{

    let params = {
      type: 1,
      name: this.state.name,
      rates: this.state.rates
    };
    let type = 'lottery/addGameRules';

    if(this.state.id){
      params.id = this.state.id;
      type = 'lottery/updateGameRules';
    };

    this.props.dispatch({
      type,
      params,
      callback: ()=>{
        this.props.callback();
      }
    });
  }

  render() {

    const rates = this.state.rates;

    let rateDom = [];
    for(let key of Object.keys(rates)){
      rateDom.push(
        <Col key={key} span="4.8" style={{height: 35}}>
          <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{combineRates[key]}:</label>
          <InputNumber
            onChange={(v)=>{this.onChange(v, key)}}
            value={rates[key].value}/>
        </Col>
      )
    }

    return (
      <Modal
        title="添加大小单双赔率规则"
        visible={true}
        onOk={this.doSave}
        onCancel={this.props.hideFunc}
        okText={this.state.id?'修改':'"添加"'}
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
})(AddCombineRules);
