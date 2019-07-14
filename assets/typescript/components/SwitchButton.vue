<template>
    <button class="btn" :class="currentClassName" @click="onClick">{{ label }}</button>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    enum ClassNames {
        on = '--on',
        off = '--off',
    }

    @Component({
        props: {
            label: String
        }
    })
    export default class SwitchButton extends Vue {
        currentClassName: ClassNames = ClassNames.off;

        onClick(event: MouseEvent) {
            this.currentClassName = this.currentClassName === ClassNames.on ? ClassNames.off : ClassNames.on;
            this.$emit('click', event);
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        display: inline-block;

        background: none;
        border: 2px solid currentColor;

        font-size: 1rem;
        text-transform: uppercase;

        padding: .375em .625em;
        border-radius: .375em;

        outline: none;
        cursor: pointer;

        &.--on {
            color: green;
        }

        &.--off {
            color: red;
        }
    }
</style>
