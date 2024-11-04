<template>
  <section
    class="p-2 rounded-md flex flex-row items-center justify-center"
    :style="{ width: containerWidth }"
  >
    <!-- Ошибка -->
    <Notification :error="error" />
    <div v-if="error" class="flex justify-center items-center px-20 gap-2">
      <span>NO</span>
      <img :src="sadcloud" alt="sadcloud" class="w-14 h-12" />
      <span>WEATHER</span>
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="flex justify-center items-center px-20">
      <div class="loader"></div>
    </div>

    <!-- Данные о погоде -->
    <button
      v-if="weatherData && !loading && !error"
      class="flex flex-row gap-10 justify-between items-center px-2 cursor-pointer"
    >
      <div ref="cityContainer" class="flex flex-col">
        <div class="flex flex-row gap-2 items-center">
          <img
            v-if="countryCode"
            :src="`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`"
            :alt="countryCode"
          />
          <p>{{ city }}</p>
        </div>
        <div class="flex flex-row items-center gap-2">
          <i class="fa-solid fa-temperature-three-quarters"></i>
          <p
            v-if="temp !== '--'"
            class="flex flex-row justify-center items-center"
          >
            {{ temp }}°C
          </p>
          <p v-else>Температура неизвестна</p>
        </div>
      </div>
      <img :src="condition_icon" :alt="condition_icon" class="w-12" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, toRefs } from "vue";
import { useLocationStore } from "@/widgets/UserLocation/Minimal/model/store";
import Notification from "@/shared/Notification/ui/Notification.vue";
import sadcloud from "@/app/assets/sadcloud.svg";

const locationStore = useLocationStore();
const { city, temp, condition_icon, error, loading, weatherData, countryCode } =
  toRefs(locationStore);
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
});
</script>

<style scoped></style>
