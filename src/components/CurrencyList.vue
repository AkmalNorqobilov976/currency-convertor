<script setup lang="ts">
import { currencyFormatterReplace } from '@/utils/formatters'
const props = defineProps<{
    items: Array<{ from: string; to: string; value: number }>;
}>();
</script>

<template>
    <ul class="currency-list">
        <li v-for="(currency, index) in items" :key="index" class="currency-item"
            :style="{ animationDelay: `${index * 0.1}s` }">
            <slot name="currency" :currency="currency">
                <span class="currency-pair">{{ currency.from }} → {{ currency.to }}</span>
                <span class="currency-value">{{ currencyFormatterReplace( currency.value) }}</span>
            </slot>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.currency-list {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    //   max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeIn 0.6s ease-in-out;

    .currency-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.07);
        backdrop-filter: blur(8px);
        padding: 16px 20px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, background 0.3s ease;
        animation: slideIn 0.4s ease-out forwards;
        opacity: 0;
        &:hover {
            background: rgba(255, 255, 255, 0.12);
            transform: scale(1.02);
        }

        .currency-pair {
            font-weight: 600;
            font-size: 16px;
            text-transform: uppercase;
        }

        .currency-value {
            font-weight: 700;
            font-size: 18px;
            color: #89a19d;
        }
    }
}

/* Fade-in animation for the list on load */
@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

/* Slide-in animation for each list item */
@keyframes slideIn {
    0% {
        transform: translateY(20px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
