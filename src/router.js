import React, { PropTypes } from 'react';
import { Router} from 'dva/router';
import { createHashHistory } from 'history';
import Base from './components/Base';

const routerConfig = [
  {
    path: '/',
    component: Base,
    childRoutes: [
      {path: '/', component: require('./routes/Index')},
      {path: '/betRecords', component: require('./routes/bet/Records')},
      {path: '/lotteryRecords', component: require('./routes/lottery/LotteryRecords')},
      {path: '/usersList', component: require('./routes/users/UserList')},
      {path: '/rollback', component: require('./routes/users/Rollback')},
      {path: '/userIntegralChange', component: require('./routes/users/UserIntegralChange')},
      {path: '/rollbackRecord', component: require('./routes/users/RollbackRecord')},
      {path: '/rechargeList', component: require('./routes/users/RechargeList')},
      {path: '/gameRules', component: require('./routes/system/GameRules')},
      {path: '/betLimit', component: require('./routes/system/BetLimit')},
      {path: '/rooms', component: require('./routes/system/Rooms')},
      {path: '/withdrawRecords', component: require('./routes/withdraw/records')},
      {path: '/rollbackRules', component: require('./routes/system/RollbackRules')},
      {path: '/addMessage', component: require('./routes/messages/AddMassage')},
      {path: '/systemList', component: require('./routes/messages/MessageList')},
    ]
  },
  {path: '/login', component: require('./routes/Login')},

];

export default function({ history }) {
  return (
    <Router history={history} routes={routerConfig} />
  );
};




