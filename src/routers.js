/**
 * Created by zhengguorong on 16/11/3.
 */
export default [{
  path: '/',
  name: 'index',
  component: require('./views/user/login')
}, {
  path: '/login',
  name: 'login',
  component: require('./views/user/login')
}, {
  path: '/register',
  name: 'register',
  component: require('./views/user/register')
}, {
  path: '/editor',
  name: 'editor',
  component: require('./views/editor/index.vue')
}, {
  path: '/h5editor',
  name: 'h5editor',
  component: require('./views/h5editor/index.vue')
}, {
  path: '/themeList',
  name: 'themeList',
  component: require('./views/h5editor/themeList.vue')
}]
