import { IObserverCallbackParams } from '@xizher/observer'
import { Entity, Cartesian3, Cartographic, Color, ScreenSpaceEventHandler, ScreenSpaceEventType, PointGraphics, PolygonHierarchy, ClassificationType, ArcType, HeightReference } from 'cesium'
import PolylineGraphics from 'cesium/Source/DataSources/PolylineGraphics'
import WebMap from '../../../../web-map/web-map'
import { MapCursorType } from '../../../map-cursor/map-cursor'
import BaseTool, { IBaseToolEvent, OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool'
import ext from '@xizher/js-ext'
import PolygonGraphics from 'cesium/Source/DataSources/PolygonGraphics'

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

export interface IStyleOptions {
  point?: PointGraphics.ConstructorOptions
  polyline?: PolylineGraphics.ConstructorOptions
  polygon?: PolygonGraphics.ConstructorOptions
}

export type DrawType = 'point' | 'polyline' | 'polygon'

export interface IDrawToolOptions {
  drawType?: DrawType
}

/** 绘图工具类 */
export class DrawTool<T extends IDrawToolEvent> extends BaseTool<T> {

  //#region 私有属性

  /** 屏幕事件处理器 */
  private _handler: ScreenSpaceEventHandler

  /** 绘制完成样式 */
  private _drawedOptions: IStyleOptions = {
    point: {
      color: Color.RED,
      pixelSize: 12,
    },
    polyline: {
      width: 4,
      material: Color.RED,
    },
    polygon: {
      material: Color.RED.withAlpha(.5),
      outline: true,
      outlineColor: Color.RED,
      outlineWidth: 4,
    },
  }

  /** 绘制过程样式 */
  private _drawingOptions: IStyleOptions = {
    polyline: {
      width: 8,
      material: Color.RED.withAlpha(.5)
    },
    polygon: {
      material: Color.RED.withAlpha(.3),
      outline: true,
      outlineColor: Color.RED.withAlpha(.5),
      outlineWidth: 4,
    },
  }

  /** 绘制类型 */
  private _drawType: DrawType = 'point'

  /** 绘制过程实体 */
  private _tempEntity: Entity

  /** 是否贴地 */
  private _isClampToGround = true

  //#endregion

  //#region 保护属性

  /** 鼠标样式 */
  protected cursorType_: MapCursorType = 'draw'

  //#endregion

  //#region 构造函数

  /** 构造绘图工具对象 */
  constructor (webMap: WebMap, options: IDrawToolOptions = {}) {
    super(webMap)

    const { drawType } = options
    drawType && (this._drawType = drawType)

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

  /** 初始化绘制任务 */
  private _initDrawAction () : this {
    const type = this._drawType
    switch (type) {
      case 'point':
        this._initDrawPointAction()
        break
      case 'polyline':
        this._initDrawPolylineAction()
        break
      case 'polygon':
        this._initDrawPolygonAction()
        break
      default:
        break
    }
    return this
  }

  /** 初始化点绘制任务 */
  private _initDrawPointAction () : this {
    this._handler.setInputAction(movement => {
      const [lon, lat, height] = this._getLonLatHeightFromMovement(movement)
      this.fire('draw-start', { lon, lat, height })
      const entity = new Entity({
        position: Cartesian3.fromDegrees(lon, lat, height),
        point: this._drawedOptions.point
      })
      this.fire('draw-end', { entity })
    }, ScreenSpaceEventType.LEFT_CLICK)
    return this
  }

  private _initDrawPolylineAction () : this {
    let positions = []
    this._handler.setInputAction(movement => {
      const [lon, lat, height] = this._getLonLatHeightFromMovement(movement)
      positions.push(Cartesian3.fromDegrees(lon, lat, height))
      if (positions.length === 0) {
        this.fire('draw-start', { lon, lat, height })
      }
    }, ScreenSpaceEventType.LEFT_CLICK)
    this._handler.setInputAction(movement => {
      if (positions.length > 0) {
        const [lon, lat, height] = this._getLonLatHeightFromMovement({
          position: movement.endPosition
        })
        const entity = new Entity({
          polyline: {
            positions: [...positions, Cartesian3.fromDegrees(lon, lat, height)],
            clampToGround: this._isClampToGround,
            ...this._drawingOptions.polyline,
          }
        })
        this.fire('draw-move', { entity })
      }
    }, ScreenSpaceEventType.MOUSE_MOVE)
    this._handler.setInputAction(() => {
      const entity = new Entity({
        polyline: {
          positions,
          clampToGround: this._isClampToGround,
          ...this._drawedOptions.polyline
        }
      })
      positions = []
      this.fire('draw-end', { entity })
    }, ScreenSpaceEventType.RIGHT_CLICK)
    return this
  }

  private _initDrawPolygonAction () : this {
    let positions = []
    this._handler.setInputAction(movement => {
      const [lon, lat, height] = this._getLonLatHeightFromMovement(movement)
      positions.push(Cartesian3.fromDegrees(lon, lat, height))
      if (positions.length === 0) {
        this.fire('draw-start', { lon, lat, height })
      }
    }, ScreenSpaceEventType.LEFT_CLICK)
    this._handler.setInputAction(movement => {
      if (positions.length > 1) {
        const [lon, lat, height] = this._getLonLatHeightFromMovement({
          position: movement.endPosition
        })
        const entity = new Entity({
          polygon: {
            hierarchy: new PolygonHierarchy([...positions, Cartesian3.fromDegrees(lon, lat, height)]),
            ...this._drawingOptions.polygon,
          },
        })
        this.fire('draw-move', { entity })
      }
    }, ScreenSpaceEventType.MOUSE_MOVE)
    this._handler.setInputAction(() => {
      const entity = new Entity({
        polygon: {
          hierarchy: new PolygonHierarchy(positions),
          ...this._drawedOptions.polygon
        }
      })
      positions = []
      this.fire('draw-end', { entity })
    }, ScreenSpaceEventType.RIGHT_CLICK)
    return this
  }

  //#endregion

  //#region 保护方法

  /** 重写：工具激活触发事件 */
  protected onToolActived_ (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived_(e)) {
      return false
    }
    const { mapCursor } = this.viewer_.$owner
    if (mapCursor) {
      mapCursor.setCursor(this.cursorType_)
    } else {
      console.warn('绘图工具需要WebMap类实例挂载MapCursor插件类实例')
    }
    this._handler = new ScreenSpaceEventHandler(this.scene_.canvas)
    this._initDrawAction()
    return true
  }

  /** 重写：工具失活触发事件 */
  protected onToolDeActived_ (e: OnToolDeActivedParams<this>) : OnToolDeActivedReture {
    if (!super.onToolDeActived_(e)) {
      return false
    }
    const { mapCursor } = this.viewer_.$owner
    if (mapCursor) {
      mapCursor.setCursor('default')
    } else {
      console.warn('绘图工具需要WebMap类实例挂载MapCursor插件类实例')
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
    this._tempEntity && this.entities_.remove(this._tempEntity)
    this._tempEntity = e.entity
    this.entities_.add(this._tempEntity)
  }

  /** 绘制完成触发事件 */
  protected onDrawEnd_ (e: OnDrawEndParams<this>) : OnDrawEndReture {
    if (!this.actived) {
      return false
    }
    this._tempEntity && this.entities_.remove(this._tempEntity)
    this.entities_.add(e.entity)
  }

  //#endregion

}

export default DrawTool
