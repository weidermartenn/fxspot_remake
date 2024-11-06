<template>
  <div
    v-if="props.modelValue"
    class="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50"
  >
    <section class="relative bg-primary p-4 rounded-md basis-1/2 h-1/2">
      <i
        @click="closeModal"
        class="fa-solid fa-xmark absolute top-2 right-4 text-emerald-900 hover:text-emerald-800 text-2xl cursor-pointer"
      ></i>
    </section>
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
