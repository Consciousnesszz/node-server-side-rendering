import Home from './container/Home';
import User from './container/User';
import NoMatch from './container/NoMatch';

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/user',
    component: User,
  },
  {
    path: null,
    component: NoMatch,
  },
];
