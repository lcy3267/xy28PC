/**
 * Created by chengyuan on 2017/3/25.
 */
import React, {Component} from 'react';
import {Layout, Button} from 'antd';
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import io from "socket.io-client";
const {Header, Sider, Content} = Layout;
import Slider from './Slider';
import style from './Base.css';
import {apiDomain, ioDomain} from '../config/index';

class Base extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  componentWillMount() {

    /*//链接房间
    var socket = io('http://localhost:3000/admin', {jsonp: false});

    console.log(socket.id); // undefined

    socket.on('connect', function(){
      console.log(socket.id); // 'G5p5...'
    });

    socket.emit('adminLogin',{test: '123'});

    socket.on('adminLogin', async(data)=>{
      console.log(data);
    });*/


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
