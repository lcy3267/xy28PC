/**
 * Created by chengyuan on 2017/5/4.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {InputNumber, Row, Col, Tabs, Icon} from 'antd';
import { combineRates } from '../../config';
import AddCombineRules from '../../components/AddCombineRules';
import AddSingleRules from '../../components/AddSingleRules';
import SpecialGameRules from './SpecialGameRules';
const TabPane = Tabs.TabPane;

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
      combineRule: null,
      singleRule: null,

    };
  }

  componentWillMount() {
    this.loadInfo();
  }

  loadInfo = ()=>{
    this.props.dispatch({
      type: 'lottery/gameRules',
      callback: (rules)=>{

        let combineRules = rules.filter((rule)=>rule.play_type == 1);
        let singleRules = rules.filter((rule)=>rule.play_type == 2);

        combineRules = combineRules.map((rule)=>{
          rule.rates = JSON.parse(rule.combine_rates);
          return rule;
        });

        singleRules = singleRules.map((rule)=>{
          rule.rates = rule.single_point_rates.split('|');
          return rule;
        });

        this.setState({combineRules, singleRules});
      }
    });
  }

  callback = ()=>{
    this.loadInfo();
    this.setState({
      showAddCombine: false,
      showAddSingle: false
    });
  }

  updateRate = (type, index)=>{
    if(type == 1){
      let combineRule = this.state.combineRules[index];
      this.setState({
        showAddCombine: true,
      }, ()=>{
        this.setState({
          combineRule
        })
      });
    }else{
      let singleRule = this.state.singleRules[index];
      this.setState({
        showAddSingle: true,
      }, ()=>{
        this.setState({
          singleRule
        })
      });
    }
  }

  render() {

    return (
      <div style={{fontSize: 14}}>

        <Tabs defaultActiveKey="3" type="card">
          <TabPane tab={<span>大小单双赔率规则列表</span>} key="1">
            <div style={{fontSize: 15,height: 30}}>
              <span style={{marginLeft: 20}}>
                <a onClick={()=>{this.setState({showAddCombine: true, combineRule: null})}}>添加赔率规则</a>
              </span>
            </div>
            <div style={{border: '1px solid #E9E9E9',borderRadius: 4, padding: 10}}>
              {this.state.combineRules.map((rule, index)=>{
                const rates = rule.rates;
                let rateDom = [];
                for(let key of Object.keys(rates)){
                  rateDom[rates[key].index] = (
                    <Col key={key} style={{height: 35, width: '20%'}}>
                      <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{combineRates[key]}:</label>
                      <InputNumber
                        value={rates[key].value}/>
                    </Col>
                  )
                }
                return (
                  <Row type='flex' key={index} >
                    <Col span="24" style={{height: 35}}>
                      <label style={{fontSize: 15}}>{rule.name}</label>
                      <label style={{fontSize: 15, marginLeft: 20}}>
                        <a onClick={()=>{this.updateRate(1, index)}}>修改赔率</a>
                      </label>
                    </Col>
                    {rateDom}
                  </Row>
                )
              })}
            </div>
          </TabPane>
          <TabPane tab={<span>单点赔率规则列表</span>} key="2">
            <div style={{fontSize: 15,height: 30, }}>
              <span style={{marginLeft: 20}}>
                <a onClick={()=>{this.setState({showAddSingle: true})}}>添加赔率规则</a>
              </span>
            </div>
            <div style={{border: '1px solid #E9E9E9',borderRadius: 4, padding: 10}}>
              {this.state.singleRules.map((rule, index)=>{
                const rates = rule.rates;
                let rateDom = [];
                rates.map((rate, index)=>{
                  rateDom.push(
                    <Col key={index} span="4.8" style={{height: 35, marginLeft: 10}}>
                      <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{index}:</label>
                      <InputNumber
                        onBlur={(v)=>{this.doUpdateRate(v, index)}}
                        value={rate}/>
                    </Col>
                  )
                });
                rates.map((rate, index)=>{
                  rateDom.push(
                    <Col key={index+14} span="4.8" style={{height: 35, marginLeft: 10}}>
                      <label style={{textAlign: 'right', marginRight: 10, fontSize: 14, width: 50, display: 'inline-block'}}>{index+14}:</label>
                      <InputNumber
                        onChange={(v)=>{this.onChange(v, index)}}
                        value={rates[13-index]}/>
                    </Col>
                  )
                });
                return (
                  <Row type='flex' key={index} >
                    <Col span="24" style={{height: 35, fontSize: 14}}>
                      <label style={{fontSize: 15}}>{rule.name}</label>
                      <label style={{fontSize: 15, marginLeft: 20}}>
                        <a onClick={()=>{this.updateRate(2, index)}}>修改赔率</a>
                      </label>
                    </Col>
                    {rateDom}
                  </Row>
                )
              })}
            </div>
          </TabPane>
          <TabPane tab={<span>13,14数字赔率设置</span>} key="3">
            <SpecialGameRules />
          </TabPane>

        </Tabs>

        {this.state.showAddCombine?
          <AddCombineRules hideFunc={()=>{this.setState({showAddCombine: false})}}
                           combineRule={this.state.combineRule}  callback={this.callback} />:null}
        {this.state.showAddSingle?<AddSingleRules hideFunc={()=>{this.setState({showAddSingle: false})}}
                                                  singleRule={this.state.singleRule} callback={this.callback} />
          :null}
      </div>
    );
  }
}

export default connect(({})=> {
  return {};
})(GameRules);
