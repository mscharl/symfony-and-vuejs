<template>
    <section>
        <h2>{{ trans('global_config.title') }}</h2>
    <dl>
        <template v-for="(value, key) in config">
            <dt>{{ key }}</dt>
            <dd>{{ stringify(value) }}</dd>
        </template>
    </dl>
    </section>
</template>

<script lang="ts">
    import Component, {mixins} from 'vue-class-component'
    import Translator from '../mixins/Translator';

    @Component
    export default class GlobalConfig extends mixins(Translator) {
        get config(): { [key: string]: any } {
            console.log(__CONFIG__);
            return __CONFIG__;
        }

        stringify(value: any): string {
            return JSON.stringify(value);
        }
    }
</script>

<style lang="scss" scoped>
    dl {
        max-width: 62.5vw;
    }

    dt, dd {
        padding: 0;
        margin: 0;
    }

    dt {
        text-transform: uppercase;
        font-weight: bold;
        padding: .375em 0 .625em;

        & ~ & {
            border-top: 1px solid currentColor;
        }
    }

    dd {
        padding: 0 0 .625em;

        font-family: monospace;
    }
</style>
