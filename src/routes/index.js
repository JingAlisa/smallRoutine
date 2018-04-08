/**
 * 路由配置文件
 * 如果需要按需加载，可使用asyncComponent加载，用法请参考README.md文件
*/
import Home from './Home';
import asyncComponent from './AsyncComponent';
import matchUrlComponent from './MatchUrlComponent';

// webpackChunkName 可指定模块名称，访问路由按需加载
const routes = [
  { path: '/', defaultComponent: Home, exact: true },
  // editor和test是模板自带的，后面可以删了
  { path: '/editor', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './Editor')) },
  { path: '/test', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './test')) },
  { path: '/team', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './Teams')), exact: true },
  // { path: '/team/:category', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './TeamList')), exact: true },
  { path: '/team/:id', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './TeamDetail')), exact: true },
  { path: '/add', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './AddTeam')) },
  { path: '/message/:uid', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './Message')), exact: true  },
  { path: '/message/:uid/:id', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './MessageDetail')), exact: true  },
  { path: '/mine', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './Mine')), exact: true },
  { path: '/mine/public', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './MinePublic')), exact: true  },
  // { path: '/mine/public/:id', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './MineDetail')) },
  { path: '/mine/apply', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './MineApply')), exact: true  }
  // { path: '/mine/apply/:id', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './MineDetail')) }
];

routes[0].component = matchUrlComponent(routes);
console.log(routes[0].component);

export default routes;
