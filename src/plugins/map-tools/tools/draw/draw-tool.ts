import { IObserverCallbackParams } from '@xizher/observer'
import { Entity, Cartesian3, Cartographic, Color, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium'
import WebMap from '../../../../web-map/web-map'
import BaseTool, { IBaseToolEvent, OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool'

export type OnDrawStartParams<T> = IObserverCallbackParams<'draw-start', T> & { lon: number, lat: number, height: number }
export type OnDrawMoveParams<T> = IObserverCallbackParams<'draw-move', T> & { entity: Entity }
export type OnDrawEndParams<T> = IObserverCallbackParams<'draw-end', T> & { entity: Entity }
export type OnDrawStartReture = Entity | false
export type OnDrawMoveReture = Entity | false
export type OnDrawEndReture = Entity | false

export interface IDrawToolEvent extends IBaseToolEvent {
  'draw-start': { lon: number, lat: number, height: number }
  'draw-move': { entity: Entity }
  'draw-end': { entity: Entity }
}

/** 绘图工具类 */
export class DrawTool<T extends IDrawToolEvent> extends BaseTool<T> {

  //#region 私有属性

  /** 屏幕事件处理器 */
  private _handler: ScreenSpaceEventHandler

  //#endregion

  //#region 构造函数

  /** 构造绘图工具对象 */
  constructor (webMap: WebMap) {
    super(webMap)

    this.on('draw-start', e => this.onDrawStart_(e))
    this.on('draw-move', e => this.onDrawMove_(e))
    this.on('draw-end', e => this.onDrawEnd_(e))
  }

  //#endregion

  //#region 私有方法

  /**
   * 通过movement对象获取经纬度与高程值
   * @param movement movement对象
   */
  private _getLonLatHeightFromMovement (movement: any) : [number, number, number] { // eslint-disable-line
    const position = this.scene_.pickPosition(movement.position)
    const { longitude, latitude, height } = Cartographic.fromCartesian(position)
    const lon = longitude / Math.PI * 180
    const lat = latitude / Math.PI * 180
    return [lon, lat, height]
  }

  /** 初始化点绘制任务 */
  private _initDrawPointAction () : this {
    this._handler.setInputAction(movement => {
      const [lon, lat, height] = this._getLonLatHeightFromMovement(movement)
      this.fire('draw-start', { lon, lat, height })
      const entity = new Entity({
        position: Cartesian3.fromDegrees(lon, lat, height),
        point: {
          color: Color.RED,
          pixelSize: 18
        }
      })
      this.fire('draw-end', { entity })
    }, ScreenSpaceEventType.LEFT_CLICK)
    return this
  }

  //#endregion

  //#region 保护方法

  /** 重写：工具激活触发事件 */
  protected onToolActived_ (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived_(e)) {
      return false
    }
    this._handler = new ScreenSpaceEventHandler(this.scene_.canvas)
    this._initDrawPointAction()
    return true
  }

  /** 重写：工具失活触发事件 */
  protected onToolDeActived_ (e: OnToolDeActivedParams<this>) : OnToolDeActivedReture {
    if (!super.onToolDeActived_(e)) {
      return false
    }
    this._handler.destroy()
    return true
  }

  /** 开始绘制触发事件 */
  protected onDrawStart_ (e: OnDrawStartParams<this>) : OnDrawStartReture {
    if (!this.actived) {
      return false
    }
    // TODO
  }

  /** 绘制移动触发事件 */
  protected onDrawMove_ (e: OnDrawMoveParams<this>) : OnDrawMoveReture {
    if (!this.actived) {
      return false
    }
    // TODO
  }

  /** 绘制完成触发事件 */
  protected onDrawEnd_ (e: OnDrawEndParams<this>) : OnDrawEndReture {
    if (!this.actived) {
      return false
    }
    this.entities_.add(e.entity)
  }

  //#endregion

}

export default DrawTool
