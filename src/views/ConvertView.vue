<script setup lang="ts">
import { ref, computed, inject, watch, reactive } from 'vue'
import { useCurrencyStore } from '@/stores/currencyStore'

const currencyStore = useCurrencyStore();
const currenciesList = inject('currenciesList', []);
const convertableCurrenciesList = computed(() => {
    return currenciesList.value.filter((currency) => {
        return currency !== currencyStore.currentCurrency;
    });
});


const amounts = ref({
    fromAmount: 0,
    toAmount: 0,
    toCurrency: "USD",
    fromCurrency: "RUB"
});

const fromCurrencyComputed = computed({
    get: () => amounts.value.fromCurrency,
    set: (value) => {
        amounts.value.fromCurrency = value;

        if (currentCurrencyDataForCalculation.value) {
            amounts.value.toAmount = amounts.value.fromAmount * currentCurrencyDataForCalculation.value.value;
        } else {
            amounts.value.toAmount = null;
        }
    }
});

watch(() => currencyStore.currentCurrency, (newValue) => {
    amounts.value.fromCurrency = newValue;
}, {
    immediate: true
});

const toCurrencyComputed = computed({
    get() {
        return amounts.value.toCurrency;
    },
    set(value) {
        amounts.value.toCurrency = value;
        amounts.value.toAmount = Number((amounts.value.fromAmount * currentCurrencyDataForCalculation.value?.value).toFixed(2));
    }
});

const currentCurrencyDataForCalculation = computed(() => {
    return currencyStore.formattedCurrencies.find((currency) => {
        return currency.from === currencyStore.currentCurrency && currency.to === amounts.value.toCurrency;
    });
});

const onToAmount = (value: string) => {
    amounts.value.toAmount = Number(value);
    amounts.value.fromAmount = Number((amounts.value.toAmount / currentCurrencyDataForCalculation.value?.value).toFixed(2));
};

const onFromAmount = (value: string) => {
    amounts.value.fromAmount = Number(value);
    amounts.value.toAmount = Number((amounts.value.fromAmount * currentCurrencyDataForCalculation.value?.value).toFixed(2));
};


</script>
<template>
    <main>
        <section class="container">
            <h1 class="my-4">Конвертер валют</h1>
            <div v-if="currencyStore.isLoading" class="loader mt-6">
            </div>
            <div v-else>
                <form @submit.prevent="">
                    <div class="mb-2">
                        <input type="number" id="amount" :value="amounts.fromAmount" @input="onFromAmount(($event as Event).target.value)"/>
                        <select id="fromCurrency" v-model="fromCurrencyComputed">
                            <option v-for="currency in currenciesList" :key="currency" :value="currency">
                                {{ currency }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <input type="number" id="amount" :value="amounts.toAmount" @input="onToAmount(($event as Event).target.value)"/>
                        <select id="toCurrency" v-model="toCurrencyComputed">
                            <option v-for="currency in convertableCurrenciesList" :key="currency" :value="currency">
                                {{ currency }}
                            </option>
                        </select>
                    </div>
                </form>

            </div>
        </section>
    </main>
</template>

<style lang="scss" scoped></style>