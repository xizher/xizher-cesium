import { reactive, onUnmounted, watch } from 'vue'
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile'

export interface IUseMap3dTile {
  name: string
  visible: boolean
  opacity: number
  zoom () : void
}

function useMap3dTile (map3dTile: Map3dTile) : IUseMap3dTile[] {

  const tilesetList = reactive<IUseMap3dTile[]>(map3dTile.tilesetNames.map(
    name => {
      const tileset = map3dTile.getTilesetByName(name)
      return {
        name,
        visible: tileset.show,
        opacity: 1,
        zoom () {
          map3dTile.zoomToTileset(name)
        }
      }
    }
  ))
  for (let i = 0; i < tilesetList.length; i++) {
    const item = tilesetList[i]
    watch(() => item.visible, visible => {
      map3dTile.setTilesetVisible(item.name, visible)
    })
    watch(() => item.opacity, opacity => {
      map3dTile.setTilesetOpacity(item.name, opacity)
    })
  }
  {
    const handler = map3dTile.on('change:visible', e => {
      tilesetList.find(item => item.name === e.tilesetName).visible = e.visible
    })
    onUnmounted(() => handler.remove())
  } {
    const handler = map3dTile.on('change:opacity', e => {
      tilesetList.find(item => item.name === e.tilesetName).opacity = e.opacity
    })
    onUnmounted(() => handler.remove())
  }
  return tilesetList

}

export default useMap3dTile
