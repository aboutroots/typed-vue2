import Vue from 'vue';
import Vuesax from 'vuesax';
import VueWait from 'vue-wait';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false;
Vue.use(VueWait);
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#5b3cc4',
      success: 'rgb(23, 201, 100)',
      danger: 'rgb(242, 19, 93)',
      warning: 'rgb(255, 130, 0)',
      dark: 'rgb(36, 33, 69)',
    },
  },
});

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true,
  }),
  render: (h) => h(App),
}).$mount('#app');
