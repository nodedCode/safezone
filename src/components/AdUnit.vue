<template>
  <div class="ad-unit-wrapper" ref="adWrapper">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-0000000000000000"
         data-ad-slot="0000000000"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const adWrapper = ref(null);

onMounted(() => {
  try {
    if (typeof window !== 'undefined') {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  } catch (e) {
    console.warn('AdSense block failed to initialize', e);
  }
});
</script>

<style scoped>
.ad-unit-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
