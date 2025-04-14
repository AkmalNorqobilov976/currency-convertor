<script setup lang="ts">
import { inject } from 'vue'
import { useCurrencyStore } from '@/stores/currencyStore'
import Dropdown from '@/components/Dropdown.vue'
const props = defineProps<{
    items: Array<{ name: string; path: string }>
}>()


const currencyStore = useCurrencyStore(); 

const currenciesList = inject('currenciesList', []);

const { items } = props
</script>
<template>
    <header id="header" class="container">
        <nav>
            <ul>
                <li v-for="item in items" :key="item.name">
                    <router-link :to="item.path" :class="{ active: $route.path === item.path }">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
            
            <Dropdown :items="currenciesList" v-model="currencyStore.currentCurrency"/>
        </nav>
    </header>
</template>

<style scoped lang="scss">
#header {
    background-color: #f8f8f8;
    padding: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    nav{ 
        display: flex;

        justify-content: space-between;
        ul {
        display: flex;
        justify-content: center;
        list-style: none;
        font-size: 18px;
        .active {
            color: #42b983;
            font-weight: bold;
        }
        
        a {
            text-decoration: none;
            color: #333;
            padding: 10px 15px;
            display: inline-block;
        }
    }}
}
</style>