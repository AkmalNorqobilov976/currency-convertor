import { computed } from "vue";

export const navbarItems = computed(() => [
    { name: 'Главная', path: '/' },
    { name: 'Конвертация', path: '/convert' }
  ]);