<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{
    items: Array<string>,
    modelValue: string
}>();

const emits = defineEmits([
    'update:modelValue'
]);
</script>

<template>
    <select @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)" :value="modelValue">
      <option v-for="currency in items" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
</template>

<style scoped lang="scss">
select {
    width: 80px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    outline: none;
    // appearance: none;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
}
</style>