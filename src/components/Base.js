/**
 * Created by chengyuan on 2017/3/25.
 */
import React, {Component} from 'react';
import {Layout, Button} from 'antd';
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
const {Header, Sider, Content} = Layout;
import Slider from './Slider';
import style from './Base.css';

class Base extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  loginOut = ()=>{
    this.props.dispatch(routerRedux.push('/login'))
  }

  render() {
    const {children} = this.props;
    return (
      <Layout style={{height: '100%'}}>
        <Sider><Slider /></Sider>
        <Layout>
          <Header className={style.header}>
            <Button
              onClick={this.loginOut}
              className={style.loginOut}>退出</Button>
          </Header>
          <Content style={{backgroundColor: 'white',padding: 10}}>{children}</Content>
        </Layout>
      </Layout>
    )
  }
}

export default connect(()=>{
  return {};
})(Base);
