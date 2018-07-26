import Vue from 'Vue';
import VueRouter from 'vue-router';


//page components
import PageTop from 'components/PageTop.vue'
import PageNews from 'components/PageNews.vue'
import PageNewsSingle from 'components/PageNewsSingle.vue'
import PageMember from 'components/PageMember.vue'

import http from '../axios/wrapper'
import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: _WP.base_path,
  routes: [
    {path: '/', name: 'home', component: PageTop},
    {path: '/news/:id', name: 'news-single', component: PageNewsSingle},
    {path: '/news', name: 'news', component: PageNews},
    {path: '/member', name: 'member', component: PageMember},
    {path: '/*', redirect: _WP.base_path},
  ]
})

router.afterEach((to, from, next)=>{
  const url = _WP.base_url + to.path;

  http.get(url).then(res=>{
    const title = res.data.match(/<title>(.*)<\/title>/)[1];
    store.commit('updateTitle', title);
  });
})



export default router;
