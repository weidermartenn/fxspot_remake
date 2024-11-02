<template>
  <div class="min-h-screen">
    <Header>
      <Minimal />
    </Header>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Header from '@/widgets/Header/ui/Header.vue'
import Minimal from '@/widgets/UserLocation/Minimal/ui/Minimal.vue';
</script>

<style scoped>

</style>