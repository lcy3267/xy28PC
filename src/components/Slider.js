/**
 * Created by chengyuan on 2017/3/25.
 */
import React,{Component} from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;

export default class Slider extends Component{

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      theme: 'dark',
      current: '1',
      openKeys: ["sub_0","sub_1","sub_2","sub_3"],
    };
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  menuList = [
      {
        title: '玩家管理',
        icon: 'switcher',
        child: [
          {title: '玩家列表', router: '/users/list'},
          {title: '玩家充值记录', router: '/recharge/list'},
        ]
      },
      {
        title: '下注管理',
        icon: 'appstore',
        child: [
          {title: '开奖记录', router: '/lotteryRecords'},
          {title: '用户下注记录', router: '/betRecords'},
          {title: '生成自动拖用户', router: '/'},
        ]
      },
      {
        title: '财务管理',
        icon: 'switcher',
        child: [
          {title: '玩家提现审核', router: '/'},
          {title: '玩家提现记录', router: '/'},
          {title: '玩家回水记录', router: '/'},
        ]
      },
      {
        title: '系统设置',
        icon: 'setting',
        child: [
          {title: '赔率设置', router: '/gameRules'},
          {title: '回水设置', router: '/'},
          {title: '开奖设置', router: '/'},
        ]
      },
    ]

  initSidebarDom(){
    return (
      this.menuList.map((sidebar,key)=>{
        return (
          <SubMenu key={`sub_${key}`} title={<span><Icon type={sidebar.icon} /><span>{sidebar.title}</span></span>}>
            {sidebar.child.map((child,index)=>{
              return (
                <Menu.Item key={`sub${key}_${index}`}>
                  <Link to={child.router}>
                    {child.title}
                  </Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        )
      })
    );
  }

  render() {
    return (
      <div>
        <div style={{height: 50, width: '100%',
        textAlign: 'center',paddingTop: 14,fontSize: 16,marginBottom: 20}}>
        </div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick.bind(this)}
          selectedKeys={[this.state.current]}
          style={{ width: '100%' }}
          //defaultOpenKeys={['sub1_1']}
          mode="inline"
          openKeys={this.state.openKeys}
        >
          {this.initSidebarDom()}
        </Menu>
      </div>
    );
  }

}
