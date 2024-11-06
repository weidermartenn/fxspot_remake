<template>
  <section
    class="p-2 rounded-md flex items-center justify-center"
    :style="{ width: containerWidth }"
  >
    <!-- Ошибка -->
    <Notification :error="error" />
    <div v-if="error" class="flex justify-center items-center gap-2">
      <span>NO</span>
      <img :src="sadcloud" alt="sadcloud" class="w-14 h-12" />
      <span>WEATHER</span>
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="flex justify-center items-center px-20">
      <div class="loader"></div>
    </div>

    <!-- Данные о погоде -->
    <section v-show="!loading && !error && isVisible" class="animate-fade-in">
      <button
        v-if="weatherData && !loading && !error"
        @click="isModalOpen = true"
        class="flex flex-row md:flex-row gap-6 justify-between items-center px-4 py-2 w-full max-w-md bg-emerald-900 hover:bg-emerald-800 transition duration-300 cursor-pointer rounded-md"
      >
        <!-- Город и страна -->
        <div ref="cityContainer" class="flex flex-col">
          <div class="flex items-center gap-2">
            <img
              v-if="countryCode"
              :src="`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`"
              :alt="countryCode"
              class="w-4 h-3"
            />
            <p class="text-base font-medium">
              {{ weatherData.location.name || "Неизвестный город" }}
            </p>
          </div>
          <div class="flex items-center gap-2 text-gray-300">
            <i class="fa-solid fa-temperature-three-quarters"></i>
            <p
              v-if="weatherData.current.temp_c !== undefined"
              class="text-sm font-medium"
            >
              {{ weatherData.current.temp_c }} °C
            </p>
            <p v-else class="text-sm">Температура неизвестна</p>
          </div>
        </div>
        <!-- Иконка состояния погоды -->
        <img
          :src="weatherData.current.condition.icon"
          alt="Иконка погоды"
          class="w-12 h-12"
        />
      </button>
    </section>
    <Transition name="modal" mode="out-in">
      <Modal v-if="isModalOpen" v-model="isModalOpen" key="modal" />
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, toRefs } from "vue";
import { useLocationStore } from "@/widgets/UserLocation/model/store";
import Notification from "@/shared/Notification/ui/Notification.vue";
import sadcloud from "@/app/assets/sadcloud.svg";
import Modal from "../../Modal/ui/Modal.vue";

const isModalOpen = ref(false);

const isVisible = ref(false);

const locationStore = useLocationStore();
const { error, loading, weatherData, countryCode } = toRefs(locationStore);
const containerWidth = ref("auto");
const cityContainer = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

const setupResizeObserver = () => {
  if (cityContainer.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          containerWidth.value = `${entry.contentRect.width + 40}px`;
        }
      }
    });
    resizeObserver.observe(cityContainer.value);
  }
};

onBeforeMount(() => {
  if (resizeObserver && cityContainer.value) {
    resizeObserver.unobserve(cityContainer.value);
  }
});

onMounted(() => {
  locationStore.fetchWeatherByIP();
  setupResizeObserver();
  isVisible.value = true;
});
</script>

<style scoped>
.flow-in {
  animation: flow-in 0.5s ease-in-out;
}

@keyframes flow-in {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
