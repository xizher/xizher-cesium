import Observer, { IObserverCallbackParams } from '@xizher/observer'
import WebMap, { IViewer, ICamera, IScene, IEntities } from '../../web-map/web-map'

export type OnToolActivedParams<T> = IObserverCallbackParams<'tool-actived', T>
export type OnToolDeActivedParams<T> = IObserverCallbackParams<'tool-deactived', T>
export type OnToolActivedReture = boolean
export type OnToolDeActivedReture = boolean

export interface IBaseToolEvent { // eslint-disable-line @typescript-eslint/ban-types
  'tool-actived': void // 工具打开
  'tool-deactived': void // 工具关闭
}

/** 基础工具类 */
export class BaseTool<T extends IBaseToolEvent = {
  'tool-actived': void
  'tool-deactived': void
}> extends Observer<T> {

  //#region 私有方法

  /** 是否为一次性工具 */
  private _isOnceTool: boolean

  /** 工具是否为激活状态 */
  private _actived = false

  //#endregion

  //#region 保护属性

  /** 视图对象 */
  protected viewer_: IViewer

  /** 相机对象 */
  protected camera_: ICamera

  /** 场景对象 */
  protected scene_: IScene

  /** 实体对象 */
  protected entities_: IEntities

  //#endregion

  //#region getter

  public get isOnceTool () : boolean {
    return this._isOnceTool
  }

  public get actived () : boolean {
    return this._actived
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造基础工具对象
   * @param map 地图对象
   * @param view 视图对象
   * @param isOnceTool 是否为一次性工具，默认为否
   */
  constructor (webMap: WebMap, isOnceTool = false) {
    super()
    this.viewer_ = webMap.viewer
    this.camera_ = webMap.camera
    this.scene_ = webMap.scene
    this.entities_ = webMap.entities
    this._isOnceTool = isOnceTool

    this.on('tool-actived', e => this.onToolActived_(e))
    this.on('tool-deactived', e => this.onToolDeActived_(e))
  }

  //#endregion

  //#region 保护方法


  /** 工具激化处理事件 */
  protected onToolActived_ (e: OnToolActivedParams<this>) : OnToolActivedReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (!this._actived) {
      return false
    }
    return true
  }

  /** 工具失活处理事件 */
  protected onToolDeActived_ (e: OnToolDeActivedParams<this>) : OnToolDeActivedReture { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (!this._actived) {
      return false
    }
    this._actived = false
    return true
  }

  //#endregion

  //#region 公有方法

  /** 激活工具 */
  public active () : this {
    if (this._actived) {
      return this
    }
    this._actived = true
    this.fire('tool-actived')
    if (this._isOnceTool) {
      this.deactive()
    }
    return this
  }

  /** 接触工具激活状态 */
  public deactive () : this {
    if (!this._actived) {
      return this
    }
    this.fire('tool-deactived')
    return this
  }

  //#endregion

}

export default BaseTool
