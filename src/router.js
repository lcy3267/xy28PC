import React, { PropTypes } from 'react';
import { Router} from 'dva/router';
import { createHashHistory } from 'history';
import Base from './components/Base';
import Index from './routes/Index';
import BetRecords from './routes/bet/records';

const routerConfig = [
  {
    path: '/',
    component: Base,
    childRoutes: [
      {path: '/index', component: Index},
      {path: '/betRecords', component: BetRecords},
    ]
  },
  {title: '注册', path: '/register', component: <div></div>},

];

export default function({ history }) {
  return (
    <Router history={history} routes={routerConfig} />
  );
};




