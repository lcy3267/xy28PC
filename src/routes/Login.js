/**
 * Created by chengyuan on 2017/4/29.
 */
import React,{Component} from 'react';
import {connect} from 'dva';
import { Form, Icon, Input, Button, message } from 'antd';
import md5 from 'blueimp-md5';
import { routerRedux } from 'dva/router';
import style from './css/Login.css';
import {md5Key} from '../config/index';
import {setCookie} from '../utils/tool';
const FormItem = Form.Item;

class Login extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/login',
          params: {
            account: values.account,
            password: md5(md5Key+values.password)
          },
          successCallback: (rs)=>{
            setCookie("token", rs.token, 30);
            this.props.dispatch(routerRedux.push('/'));
          },
          errCallback: ()=>{
            message.error('账号或密码错误!',3);
          }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={style.container}>
        <Form
          className={[style.myForm,"login-form"]}
          onSubmit={this.handleSubmit}>
          <p className={style.title}>登录</p>
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入账号' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}


export default connect(()=>{
  return {};
})(Form.create()(Login));
