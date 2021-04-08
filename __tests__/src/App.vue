<template>
<div>
  <div :id="id"></div>
  <div v-if="loaded">
    <BasemapControl />
    <TilesetControl />
  </div>
</div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { WebMap, MapCursor, Basemap, Map3dTile } from '../../dist'
import BasemapControl from './components/BasemapControl.vue'
import TilesetControl from './components/TilesetControl.vue'
export default {
  components: {
    BasemapControl,
    TilesetControl,
  },
  name: 'test',
  setup () {
    const id = 'ol-container'
    const webMap = new WebMap(id, {
      baseUrl: '/cesium/v1.79.1/Build/Cesium/',
      center: [113, 23]
    })
      .use(new Basemap())
      .use(new MapCursor())
      .use(new Map3dTile({
        tilesetITem: [
          { name: '局部楼层模型', url: '/cesium/3dtile/buildings/tileset.json' },
          { name: 'unknown', url: '/cesium/3dtile/unknown/tileset.json' },
          { name: 'unknown2', url: '/cesium/3dtile/unknown2/tileset.json' }
        ],
        defaultZoomTilesetName: '局部楼层模型'
      }))
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
