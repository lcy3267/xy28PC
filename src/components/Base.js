/**
 * Created by chengyuan on 2017/3/25.
 */
import React, {Component} from 'react';
import {Layout, Button, notification, Badge, Icon} from 'antd';
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
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
    const {dispatch} = this.props;
    if(this.props.location.pathname == '/'){
      dispatch(routerRedux.push('/usersList'));
    }
    dispatch({type: 'withdraw/getApproveNum'});

    //链接房间
    var socket = io(apiDomain+'/admin', {jsonp: false});

    let login = ()=>{
      socket.emit('adminLogin',{test: '123'});
    };
    login();

    socket.on('adminLogin', (data)=>{
      console.log('connetd success');
    });

    socket.on('newWithDraw', async(data)=>{
      notification.info({
        message: '有新的提现申请',
        description: '有用户提交了提现申请, 请及时处理!',
        duration: 6,
      });
      dispatch({type: 'withdraw/getApproveNum'});
    });

    //心跳包
    this.palpitationTimer = setInterval(()=>{
      socket.emit("palpitation");
    },10000);

    socket.on('palpitation', (data)=>{
      let { result } = data;
      if(result != 'success'){
        login();
      }
    });

  }

  componentWillUnMount() {
    this.palpitationTimer && clearInterval(this.palpitationTimer);
  }

  loginOut = ()=>{
    this.props.dispatch(routerRedux.push('/login'))
  }

  render() {
    const {children, withdraw: {approveNum}} = this.props;
    return (
      <Layout style={{height: '100%'}}>
        <Sider><Slider /></Sider>
        <Layout>
          <Header className={style.header}>
            <Link to="/withdrawRecords?status=1" className={style.news}>
              <Badge count={approveNum}>
                <Icon type="bell" style={{fontSize: 24}}/>
              </Badge>
            </Link>
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

export default connect(({withdraw})=>{
  return {withdraw};
})(Base);
