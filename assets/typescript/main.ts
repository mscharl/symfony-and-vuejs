import Vue from 'vue';
import GlobalConfig from './components/GlobalConfig.vue';
import SwitchButton from './components/SwitchButton.vue';

new Vue({
    components: {
        GlobalConfig,
        SwitchButton,
    },
}).$mount('#app');
