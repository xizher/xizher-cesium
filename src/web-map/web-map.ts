import {
  Viewer,
  Color,
  Camera,
  Cartesian3,
  Scene,
  createWorldTerrain,
} from 'cesium'
import Observer from '@xizher/observer'
import { baseUtils } from '@xizher/js-utils'
import Basemap from '../plugins/basemap/basemap'
import MapCursor from '../plugins/map-cursor/map-cursor'
import WebMapPlugin from '../web-map-plugin/web-map-plugin'
import { clacualteHeightFromZoom } from '../utilities/base.utilities'
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile'
import MapTools from '../plugins/map-tools/map-tools'
import MapCamera from '../plugins/map-camera/map-camera'

/** 视图对象接口 */
export interface IViewer extends Viewer {
  $owner: WebMap
}

/** 相机对象接口 */
export interface ICamera extends Camera {
  $owner: WebMap
}
/** 相机场景接口 */
export interface IScene extends Scene {
  $owner: WebMap
}

/** WebMap配置项接口 */
export interface IWebMapOptions extends Viewer.ConstructorOptions {
  baseUrl?: string
  center?: [number, number]
  zoom?: number
}

/** WebMap类 */
export class WebMap extends Observer<{
  'loaded': void
}> {

  //#region 公有属性（插件对象）

  basemap?: Basemap
  mapCursor?: MapCursor
  map3dTile?: Map3dTile
  mapTools?: MapTools
  mapCamera?: MapCamera

  //#endregion

  //#region 私有属性

  /** 地图目标容器Id */
  private _targetDiv: string

  /** 视图对象 */
  private _viewer : IViewer

  /** 视图对象 */
  private _camera : ICamera

  /** 场景对象 */
  private _scene: IScene

  /** 配置项 */
  private _options: IWebMapOptions = {
    baseUrl: 'https://cesium.com/downloads/cesiumjs/releases/1.80/Build/Cesium/',
    center: [0, 0],
    zoom: 3,
    animation: false,
    infoBox: false,
    timeline: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    homeButton: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    geocoder: false,
    sceneModePicker: false,
    selectionIndicator: false,
    creditContainer: 'credit-container',
  }

  //#endregion

  //#region getter

  public get targetDiv () : string {
    return this._targetDiv
  }

  public get viewer () : IViewer {
    return this._viewer
  }

  public get camera () : ICamera {
    return this._camera
  }

  public get scene () : IScene {
    return this._scene
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap对象
   * @param targetDiv 地图容器Id
   * @param options 配置项
   */
  constructor (targetDiv: string, options: IWebMapOptions = {}) {
    super ()
    this._targetDiv = targetDiv
    baseUtils.$extend(true, this._options, options)
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  private _init () : void {
    // eslint-disable-next-line
    // @ts-ignore
    window.CESIUM_BASE_URL = this._options.baseUrl
    baseUtils.loadCss(`${this._options.baseUrl}Widgets/widgets.css`)

    const div = document.createElement('div')
    div.setAttribute('id', this._options.creditContainer as string)
    div.style.display = 'none'
    document.body.append(div)

    this._viewer = Object.assign(new Viewer(this._targetDiv, {
      ...this._options,
      terrainProvider: createWorldTerrain()
    }), { $owner: this })
    this._viewer.imageryLayers.removeAll()
    this._viewer.scene.globe.baseColor = new Color(0, 0, 0, 0)

    this._camera = Object.assign(this._viewer.camera, { $owner: this })
    const height = clacualteHeightFromZoom(this._options.zoom)
    const [lon, lat] = this._options.center
    this._camera.flyTo({
      destination: Cartesian3.fromDegrees(lon, lat, height),
      duration: 3
    })

    this._scene = Object.assign(this._viewer.scene, { $owner: this })
  }

  //#endregion

  //#region 公有方法

  /**
 * 挂载插件
 * @param plugin WebMap插件对象
 */
  public use <T> (plugin: WebMapPlugin<T>) : WebMap {
    this[plugin.pluginName] = plugin
    return this
  }

  /**
   * 挂载WebMap
   */
  public mount () : WebMap {
    this._init()
    for (const prop in this) {
      if (this[prop]['pluginName']) {
        // eslint-disable-next-line
        // @ts-ignore
        this[prop].installPlugin(this)
      }
    }
    this.fire('loaded')
    return this
  }

  //#endregion

}

export default WebMap
