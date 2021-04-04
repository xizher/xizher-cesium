import { Viewer, Color } from 'cesium'
import Observer from '@xizher/observer'
import { baseUtils } from '@xizher/js-utils'
import Basemap from '../plugins/basemap/basemap'
import MapCursor from '../plugins/map-cursor/map-cursor'
import WebMapPlugin from '../web-map-plugin/web-map-plugin'

/** 视图对象接口 */
export interface IViewer extends Viewer {
  $owner: WebMap
}

/** WebMap配置项接口 */
export interface IWebMapOptions extends Viewer.ConstructorOptions {
  baseUrl?: string
}

/** WebMap类 */
export class WebMap extends Observer<{
  'loaded': void
}> {

  //#region 公有属性（插件对象）

  basemap?: Basemap
  mapCursor?: MapCursor

  //#endregion

  //#region 私有属性

  /** 地图目标容器Id */
  private _targetDiv: string

  /** 视图对象 */
  private _viewer : IViewer

  /** 配置项 */
  private _options: IWebMapOptions = {
    baseUrl: '',
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
    this._viewer = Object.assign(new Viewer(this._targetDiv, this._options), { $owner: this })
    this._viewer.imageryLayers.removeAll()
    this._viewer.scene.globe.baseColor = new Color(0, 0, 0, 0)
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