/**
 * Created by zhengguorong on 16/11/3.
 */
export default [{
  path: '/login',
  name: 'login',
  component: require('./views/user/login')
}, {
  path: '/editor',
  name: 'editor',
  component: require('./views/editor/index.vue')
}, {
  path: '/h5editor',
  name: 'h5editor',
  component: require('./views/h5editor/index.vue')
}, {
  path: '/themelist',
  name: 'themelist',
  component: require('./views/h5editor/themelist.vue')
}]
