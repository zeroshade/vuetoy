import '@babel/polyfill';
import Vue, { CreateElement, VNode, AsyncComponent } from 'vue';
import VueMomentLib from 'vue-moment-lib';
import './plugins/vuetify';

const routes: {[index: string]: AsyncComponent} = {
  '/': () => import('./App.vue'),
  '/home': () => import('./AppLight.vue'),
};

Vue.config.productionTip = false;
Vue.use(VueMomentLib);

const MyVue = Vue.extend({
  data() {
    return {
      currentRoute: window.location.pathname,
    };
  },
  computed: {
    viewComponent(): AsyncComponent {
      const matchingView = routes[this.currentRoute];
      return matchingView
      ? matchingView
      : () => import('./App.vue');
    },
  },
  render(h): VNode {
    return h(this.viewComponent);
  },
});

const app = new MyVue({}).$mount('#app');

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
