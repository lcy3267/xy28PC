/**
 * Created by chengyuan on 2017/5/4.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {InputNumber, Row, Col, Modal, message} from 'antd';
import { combineRates } from '../../config';
import AddCombineRules from '../../components/AddCombineRules';
import AddSingleRules from '../../components/AddSingleRules';


class GameRules extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      combineRules: [],
      singleRules: [],
      showAddCombine: false,
      showAddSingle: false,
    };
  }

  componentWillMount() {
    this.loadInfo();
  }

  loadInfo = ()=>{
    this.props.dispatch({
      type: 'lottery/gameRules',
      callback: (rules)=>{

        const combineRules = rules.filter((rule)=>rule.play_type == 1);
        const singleRules = rules.filter((rule)=>rule.play_type == 2);

        this.setState({combineRules, singleRules});
      }
    });
  }

  doUpdateRate = (v,rule)=>{
    const value = v.target.value;

    if(value != rule.rate){
      const typeStr = this.formatRule(rule.type);
      Modal.confirm({
        title: '确认',
        content: <div>确认要修改"{typeStr}"的赔率为
          <em style={{color: 'red',padding: '0 3px'}}>{value}</em>吗?</div>,
        onOk: ()=>{
          this.props.dispatch({
            type: 'lottery/updateRate',
            params: {
              id: rule.id,
              rate: +value,
            },
            callback: ()=>{
              this.loadInfo();
              message.success('修改成功!!')
            }
          })
        },
        onCancel: ()=>{
          this.setState({rules: []},()=>{
            this.loadInfo();
          });
        }
      })
    }
  }

  callback = ()=>{
    this.loadInfo();
    this.setState({
      showAddCombine: false,
      showAddSingle: false
    });
  }

  render() {

    return (
      <div style={{paddingLeft: 10}}>
        <div style={{fontSize: 15,height: 30}}>
          <span>大小单双赔率规则列表</span>
          <span style={{marginLeft: 20}}>
            <a onClick={()=>{this.setState({showAddCombine: true})}}>添加赔率规则</a>
          </span>
        </div>
        <div style={{border: '1px solid #E9E9E9',borderRadius: 4, padding: 10}}>
          {this.state.combineRules.map((rule, index)=>{
            const rates = JSON.parse(rule.combine_rates);
            let rateDom = [];
            for(let key of Object.keys(rates)){
              rateDom[rates[key].index] = (
                <Col key={key} style={{height: 35, width: '20%'}}>
                  <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{combineRates[key]}:</label>
                  <InputNumber
                    onChange={(v)=>{this.onChange(v, key)}}
                    defaultValue={rates[key].value}/>
                </Col>
              )
            }
            return (
              <Row type='flex' key={index} >
                <Col span="24" style={{height: 35, fontSize: 14}}>{rule.name}</Col>
                {rateDom}
              </Row>
            )
          })}
        </div>

        <div style={{fontSize: 15,height: 30, marginTop: 20}}>
          <span>单点赔率规则列表</span>
          <span style={{marginLeft: 20}}>
            <a onClick={()=>{this.setState({showAddSingle: true})}}>添加赔率规则</a>
          </span>
        </div>
        <div style={{border: '1px solid #E9E9E9',borderRadius: 4, padding: 10}}>
          {this.state.singleRules.map((rule, index)=>{
            const rates = rule.single_point_rates.split('|');
            let rateDom = [];

            rates.map((rate, index)=>{
              rateDom.push(
                <Col key={index} span="4.8" style={{height: 35, marginLeft: 10}}>
                  <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{index}:</label>
                  <InputNumber
                    onChange={(v)=>{this.onChange(v, index)}}
                    defaultValue={rate}/>
                </Col>
              )
            });

            rates.map((rate, index)=>{
              rateDom.push(
                <Col key={index+14} span="4.8" style={{height: 35, marginLeft: 10}}>
                  <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{index+14}:</label>
                  <InputNumber
                    onChange={(v)=>{this.onChange(v, index)}}
                    defaultValue={rates[13-index]}/>
                </Col>
              )
            });

            return (
              <Row type='flex' key={index} >
                <Col span="24" style={{height: 35, fontSize: 14}}>{rule.name}</Col>
                {rateDom}
              </Row>
            )
          })}
        </div>

        {this.state.showAddCombine?<AddCombineRules hideFunc={()=>{this.setState({showAddCombine: false})}} callback={this.callback} />:null}
        {this.state.showAddSingle?<AddSingleRules hideFunc={()=>{this.setState({showAddSingle: false})}} callback={this.callback} />:null}
      </div>
    );
  }
}

export default connect(({})=> {
  return {};
})(GameRules);
