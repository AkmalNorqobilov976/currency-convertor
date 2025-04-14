<script setup lang="ts">
import CurrencyList from '@/components/CurrencyList.vue'
import { useCurrencyStore } from '@/stores/currencyStore'
import {  computed } from 'vue'

const currencyStore = useCurrencyStore();
const filteredCurrencies = computed(() => {
  return currencyStore.formattedCurrencies.filter((currency) => {
    return currency.to === currencyStore.currentCurrency;
  });
})
</script>

<template>
  <main class="container">
    <section>
      <h1 class="my-4 text-center">Добро пожаловать в Конвертер Валют</h1>

      <div v-if="currencyStore.isLoading" class="loader m-auto mt-6">
        <!-- <p>Loading currencies...</p> -->

      </div>
      <div v-else>
        <currency-list :items="filteredCurrencies">
          <template #currency="{ currency }">
            <span class="currency-pair"> 1 {{ currency.from }} = {{ currency.value }} {{ currency.to }}</span>
          </template>
        </currency-list>
      </div>
    </section>
  </main>
</template>
