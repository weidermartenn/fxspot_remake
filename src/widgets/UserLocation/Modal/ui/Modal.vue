<template>
  <div
    v-if="props.modelValue"
    class="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50"
  >
    <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, toRefs } from "vue";
import { useLocationStore } from "@/widgets/UserLocation/model/store";

const locationStore = useLocationStore();
const { error, loading, forecastData, countryCode } = toRefs(locationStore);

// Получаем пропс modelValue через defineProps
const props = defineProps({
  modelValue: Boolean,
});

// Отправляем событие обновления состояния
const emit = defineEmits(["update:modelValue"]);

// Метод для закрытия модального окна
const closeModal = () => {
  emit("update:modelValue", false); // Закрытие окна
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
