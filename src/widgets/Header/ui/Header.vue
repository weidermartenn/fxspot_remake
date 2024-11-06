<template>
  <header class="sticky w-full h-[75px] flex items-center justify-between px-4 shadow-sm shadow-zinc-900 z-auto">
    <a
      href="/"
      class="hoverimage flow-in w-[160px] flex items-center"
      alt=""
      @mouseover="showText = true"
      @mouseleave="showText = false"
      v-show="isVisible"
    >
      <img :src="logo" loading="lazy"/>
      <Transition name="translate">
        <span v-if="showText" class="text-3xl">FXSpot</span>
      </Transition>
    </a>
    <slot/>
    <div class="flex items-center gap-4">
      <a href="https://github.com/weidermartenn/fxspot_remake" target="_blank">
        <i class="fa-brands fa-github text-3xl"></i>
      </a>
      <span class="text-xl">v1.0.0</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import logo from "@/app/assets/fxlogo.svg";
import Minimal from "@/widgets/UserLocation/Minimal/ui/Minimal.vue";

const isVisible = ref(false);
const showText = ref(false);

onMounted(() => {
  isVisible.value = true;
})
</script>

<style scoped>
.flow-in {
  animation: flowIn 0.5s ease;
}

@keyframes flowIn {
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
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
