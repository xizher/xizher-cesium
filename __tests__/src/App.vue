<template>
<div>
  <div :id="id"></div>
  <div v-if="loaded">
    <BasemapControl />
  </div>
</div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { WebMap, MapCursor, Basemap } from '../../dist'
import BasemapControl from './components/BasemapControl.vue'
export default {
  components: {
    BasemapControl,
  },
  name: 'test',
  setup () {
    const id = 'ol-container'
    const webMap = new WebMap(id, {
      baseUrl: '/cesium/v1.79.1/Build/Cesium/'
    })
      .use(new Basemap())
      .use(new MapCursor())
    const loaded = ref(false)
    const handler = webMap.on('loaded', () => {
      window.webMap = webMap
      loaded.value = true
    })
    onMounted(() => { webMap.mount() })
    onUnmounted(() => handler.remove())
    return {
      id,
      loaded,
    }
  }
}
</script>

<style>
#ol-container {
  height: 80vh;
  width: 100vw;
}
html,
body {
  padding: 0;
  margin: 0;
}
</style>
