import { currencyApi } from "@/utils/currencyApi";
import { defineStore } from "pinia";

type CurrencyType = { from: string, to: string, value: number };

export const useCurrencyStore = defineStore("currency", {
    state: () => ({
        currencies: {} as Object,
        currentCurrency: "RUB",
        isLoading: false,
    }),
    getters: {
        formattedCurrencies: (state) => {
            return Object.entries(state.currencies).map(([key, value]) => {
                const [from, to] = key.toUpperCase().split("-");
                return {
                    from,
                    to,
                    value,
                } as CurrencyType;
            }
            );
        }
    },
    actions: {
        async getCurrencies() {
            this.isLoading = true;
            currencyApi<Object>("/currency").then((data: Object) => {
                this.currencies = data;
                this.isLoading = false;
            }).catch((error: Error) => {
                console.error("Error fetching currencies:", error);
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }
})