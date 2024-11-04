<template>
  <div class="fixed top-5 right-5 space-y-2 z-50">
    <transition-group name="fade" tag="div">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        class="flex items-center space-x-2 p-4 bg-primary/90 backdrop-blur-sm text-red-700 rounded-lg shadow-md"
      >
        <i class="fa-solid fa-xmark text-xl"></i>
        <span>{{ notification }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRef } from "vue";

const props = defineProps({
  error: {
    type: String,
    default: null,
  },
});

const notifications = ref<string[]>([]);

watch(toRef(props, "error"), (newError) => {
  if (newError) {
    notifications.value.push(newError);

    setTimeout(() => {
      notifications.value.shift();
    }, 5000);

    if (notifications.value.length > 5) {
      notifications.value.shift();
    }
  }
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
