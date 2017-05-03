import React, { PropTypes } from 'react';
import { Router} from 'dva/router';
import { createHashHistory } from 'history';
import Base from './components/Base';

const routerConfig = [
  {
    path: '/',
    component: Base,
    childRoutes: [
      {path: '/index', component: require('./routes/Index')},
      {path: '/betRecords', component: require('./routes/bet/Records')},
      {path: '/lotteryRecords', component: require('./routes/lottery/LotteryRecords')},
      {path: '/users/list', component: require('./routes/users/UserList')},
      {path: '/recharge/list', component: require('./routes/users/RechargeList')},
    ]
  },
  {path: '/login', component: require('./routes/Login')},

];

export default function({ history }) {
  return (
    <Router history={history} routes={routerConfig} />
  );
};




