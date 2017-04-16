/**
 * Created by chengyuan on 2017/3/25.
 */
import React,{Component} from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Slider from './Slider';

export default class Base extends Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
    }

  render(){
    const {children} = this.props;
    return (
      <Layout style={{height: '100%'}}>
        <Sider><Slider /></Sider>
        <Layout>
          <Header style={{backgroundColor: '#D1C4C4',height: 50}}></Header>
          <Content style={{backgroundColor: 'white',padding: 10}}>{children}</Content>
        </Layout>
      </Layout>
    )
  }
}
