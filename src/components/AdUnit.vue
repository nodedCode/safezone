<template>
  <div class="ad-unit-wrapper" ref="adWrapper">
    <!-- HalalSpark script will be dynamically injected here -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  placementId: {
    type: String,
    required: true
  },
  adType: {
    type: String,
    default: 'banner'
  }
});

const adWrapper = ref(null);

onMounted(() => {
  try {
    if (adWrapper.value) {
      // For Vue SPAs, we must dynamically create the script element
      // because native <script> tags inside templates are not executed.
      const script = document.createElement('script');
      script.src = `https://ads.halalspark.co.uk/get-ad-script-${props.adType}?placement_id=${props.placementId}&domain=https://safezone.nodedcode.studio&_v=3.0`;
      script.async = true;
      adWrapper.value.appendChild(script);
    }
  } catch (e) {
    console.error('Ad initialization failed:', e);
  }
});
</script>

<style>
/* 
  Global overrides for HalalSpark Ad injection.
  We don't use 'scoped' because the ad HTML is injected dynamically 
  and wouldn't inherit the scoped data attributes.
*/
.ad-unit-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Force the dynamically injected HalalSpark containers to fill the space */
.ad-unit-wrapper > div,
.ad-unit-wrapper iframe {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
}

/* Ensure the actual ad image scales responsively without cropping */
.ad-unit-wrapper img {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
}
</style>
