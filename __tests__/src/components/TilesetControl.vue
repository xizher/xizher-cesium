<template>
  <div>
    <div>Tileset控制</div>
    <div
      v-for="(item, index) in tilesetList"
      :key="index"
    >
      <span>{{ item.name }}</span>
      <input type="checkbox" :checked="item.visible" @change="e => item.visible = e.target.checked">
      <button @click="item.zoom">zoom</button>
      <input type="number" min="0" max="1" step=".1" :value="item.opacity" @change="e => item.opacity = e.target.value">
    </div>
  </div>
</template>

<script setup>
import useTilesetList from '../../../dist/hooks/map-3d-tile.hooks'
const tilesetList = useTilesetList(window.webMap.map3dTile)

</script>

<style scoped>

</style>
