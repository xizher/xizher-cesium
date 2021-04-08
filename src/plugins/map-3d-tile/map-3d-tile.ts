import { baseUtils } from '@xizher/js-utils'
import {
  Cesium3DTileset,
  Cesium3DTileStyle,
} from 'cesium'
import WebMapPlugin from '../../web-map-plugin/web-map-plugin'
import WebMap from '../../web-map/web-map'

export interface ITilesetOptions {
  name: string
  url: string
}

export interface IMap3dTileOptions {
  tilesetITem?: ITilesetOptions[]
  defaultZoomTilesetName?: string
}

/** 3dTile插件类 */
export class Map3dTile extends WebMapPlugin<{
  'change:visible': { visible: boolean, tilesetName: string, tileset: Cesium3DTileset }
  'change:opacity': { opacity: number, tilesetName: string, tileset: Cesium3DTileset }
}> {

  //#region 私有属性

  /** 配置项 */
  private _options: IMap3dTileOptions = {
    tilesetITem: []
  }

  private _tilesetPool: Map<string, Cesium3DTileset> = new Map()

  //#endregion

  //#region getter

  public get tilesetNames () : string[] {
    return [...this._tilesetPool.keys()]
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造3dTile插件对象
   * @param options 配置项
   */
  constructor (options: IMap3dTileOptions = {}) {
    super('map3dTile')
    baseUtils.$extend(true, this._options, options)
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : this {
    this._options.tilesetITem.forEach(item => this._initTileset(item))
    return this
  }

  /** 初始化Tileset */
  private _initTileset (tilesetOptions: ITilesetOptions) : this {
    const { name, url } = tilesetOptions
    const tileset = new Cesium3DTileset({ url })
    tileset.readyPromise.then(() => {
      this.scene_.primitives.add(tileset)
      if (name === this._options.defaultZoomTilesetName) {
        this.viewer_.flyTo(tileset)
      }
    })
    this._tilesetPool.set(name, tileset)
    return this
  }

  //#endregion

  //#region 公有方法

  /** 重写：安装插件 */
  public installPlugin (webMap: WebMap) : this {
    return super.installPlugin(webMap)._init()
  }

  /**
   * 通过名称获取tileset对象
   * @param name tileset名称
   * @returns tileset对象
   */
  public getTilesetByName (name: string) : Cesium3DTileset | null {
    if (!this._tilesetPool.has(name)) {
      return null
    }
    return this._tilesetPool.get(name)
  }

  public getNameByTileset (tileset: Cesium3DTileset) : string | null {
    const arr = [...this._tilesetPool.entries()]
    for (let i = 0; i < arr.length; i++) {
      const [name, item] = arr[i]
      if (tileset === item) {
        return name
      }
    }
    return null
  }

  /**
   * 设置tileset可见性
   * @param name tileset名称
   * @param visible 可见性
   */
  public setTilesetVisible (name: string, visible: boolean) : this
  /**
   * 设置tileset可见性
   * @param tileset tileset对象
   * @param visible 可见性
   */
  public setTilesetVisible (tileset: Cesium3DTileset, visible: boolean) : this
  /**
   * 设置tileset可见性
   * @param arg0 tileset对象或名称
   * @param visible 可见性
   */
  public setTilesetVisible (arg0: string | Cesium3DTileset, visible: boolean) : this {
    const tileset = typeof arg0 === 'string'
      ? this.getTilesetByName(arg0)
      : arg0
    tileset.show = visible
    this.fire('change:visible', {
      visible, tileset,
      tilesetName: typeof arg0 === 'string' ? arg0 : this.getNameByTileset(tileset)
    })
    return this
  }

  /**
   * 设置tileset透明度
   * @param name tileset名称
   * @param opacity 不可透明度
   */
  public setTilesetOpacity (name: string, opacity: number) : this

  /**
   * 设置tileset透明度
   * @param tileset tileset对象
   * @param opacity 不可透明度
   */
  public setTilesetOpacity (tileset: Cesium3DTileset, opacity: number) : this

  /**
   * 设置tileset透明度
   * @param arg0 tileset对象或名称
   * @param opacity 不可透明度
   */
  public setTilesetOpacity (arg0: string | Cesium3DTileset, opacity: number) : this {
    const tileset = typeof arg0 === 'string'
      ? this.getTilesetByName(arg0)
      : arg0
    tileset.style = new Cesium3DTileStyle({
      color: `color('rgba(255, 255, 255, ${opacity})')`
    })
    this.fire('change:opacity', {
      opacity, tileset,
      tilesetName: typeof arg0 === 'string' ? arg0 : this.getNameByTileset(tileset)
    })
    return this
  }

  /**
   * 缩放至tileset
   * @param name tileset名称
   */
  public zoomToTileset (name: string) : this
  /**
   * 缩放至tileset
   * @param tileset tileset对象
   */
  public zoomToTileset (tileset: Cesium3DTileset) : this
  /**
   * 缩放至tileset
   * @param arg0 tileset对象或名称
   */
  public zoomToTileset (arg0: string | Cesium3DTileset) : this {
    const tileset = typeof arg0 === 'string'
      ? this.getTilesetByName(arg0)
      : arg0
    this.viewer_.flyTo(tileset)
    return this
  }

  //#endregion

}

export default Map3dTile
