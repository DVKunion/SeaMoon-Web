﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './dashboard/',
  },
  {
    path: '/service',
    name: 'service',
    icon: 'Thunderbolt',
    component: './service/',
  },
  {
    path: '/serverless',
    name: 'serverless',
    icon: 'cluster',
    component: './serverless/',
  },
  {
    path: 'cloud',
    name: 'cloud', // 云账户相关配置
    icon: 'cloud',
    component: './cloud/',
  },
  {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
    component: './setting/',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
