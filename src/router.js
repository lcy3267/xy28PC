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
      {path: '/usersList', component: require('./routes/users/UserList')},
      {path: '/rechargeList', component: require('./routes/users/RechargeList')},
      {path: '/gameRules', component: require('./routes/system/GameRules')},
      {path: '/rooms', component: require('./routes/system/Rooms')},
      {path: '/rollbackRules', component: require('./routes/system/RollbackRules')},
    ]
  },
  {path: '/login', component: require('./routes/Login')},

];

export default function({ history }) {
  return (
    <Router history={history} routes={routerConfig} />
  );
};




