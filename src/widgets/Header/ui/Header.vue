<template>
  <header class="h-[75px] flex items-center px-4">
    <a
      href="/"
      class="hoverimage w-[160px] flex items-center"
      alt=""
      @mouseover="showText = true"
      @mouseleave="showText = false"
    >
      <img :src="logo" />
      <Transition name="translate">
        <span v-if="showText" class="text-3xl">FXSpot</span>
      </Transition>
    </a>
    <UserLocation />
    <div class="ml-auto flex items-center gap-4">
      <a href="https://github.com/weidermartenn/fxspot_remake" target="_blank">
        <i class="fa-brands fa-github text-3xl"></i>
      </a>
      <span class="text-xl">v1.0.0</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import logo from "@/app/assets/fxlogo.svg";
import UserLocation from "@/widgets/UserLocation/ui/UserLocation.vue";

const showText = ref(false);
</script>

<style scoped>
.hoverimage {
  transition: transform 0.3s ease;
}

.hoverimage:hover {
  transform: translateX(-5px);
}

.translate-enter-active,
.translate-leave-active {
  transition: all 0.3s ease;
}

.translate-enter-from,
.translate-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.translate-enter-to,
.translate-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
