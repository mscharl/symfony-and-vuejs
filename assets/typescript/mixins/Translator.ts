import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare a mixin as the same style as components.
@Component
export default class TranslatorMixin extends Vue {
    trans(key: string): string {
        return Translator.trans(key);
    }
}
