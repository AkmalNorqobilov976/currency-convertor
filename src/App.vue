<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed, provide } from 'vue'
import Navbar from '@/layouts/Navbar.vue'
import { navbarItems} from '@/layouts/navigations/navbarItems'


import { useCurrencyStore } from '@/stores/currencyStore'

const currencyStore = useCurrencyStore();
import { onMounted } from 'vue'

onMounted(() => {
  currencyStore.getCurrencies();
})

const currenciesList = computed(() => {
  const currencySet = new Set();
  currencyStore.formattedCurrencies.forEach((rate) => {
    currencySet.add(rate.from);
    currencySet.add(rate.to);
  });

  return Array.from(currencySet);
});
provide('currenciesList', currenciesList);
</script>

<template>
  <Navbar :items="navbarItems" />

  <RouterView />
</template>
