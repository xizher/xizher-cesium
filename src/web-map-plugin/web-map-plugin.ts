import Observer from '@xizher/observer'
import WebMap, { ICamera, IEntities, IScene, IViewer } from '../web-map/web-map'

/** WebMap插件类 */
class WebMapPlugin<T> extends Observer<T> {

  //#region 私有属性

  /** 插件对象名 */
  private _pluginName: string

  //#endregion

  //#region 保护属性

  /** 视图对象 */
  protected viewer_ : IViewer

  /** 相机对象 */
  protected camera_ : ICamera

  /** 场景对象 */
  protected scene_ : IScene

  /** 实体对象 */
  protected entities_ : IEntities

  //#endregion

  //#region getter

  public get pluginName () : string {
    return this._pluginName
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap插件对象
   * @param pluginName 插件对象名
   */
  constructor (pluginName: string) {
    super()
    this._pluginName = pluginName
  }

  //#endregion

  //#region 公有方法

  /**
   * 安装插件
   * @param webMap WebMap对象
   * @returns this
   */
  public installPlugin (webMap: WebMap) : this {
    this.viewer_ = webMap.viewer
    this.camera_ = webMap.camera
    this.scene_ = webMap.scene
    this.entities_ = webMap.entities
    return this
  }

  //#endregion

}

export default WebMapPlugin
