import { IObserverCallbackParams } from '@xizher/observer';
import { Entity, PointGraphics } from 'cesium';
import PolylineGraphics from 'cesium/Source/DataSources/PolylineGraphics';
import WebMap from '../../../../web-map/web-map';
import { MapCursorType } from '../../../map-cursor/map-cursor';
import BaseTool, { IBaseToolEvent, OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool';
import PolygonGraphics from 'cesium/Source/DataSources/PolygonGraphics';
export declare type OnDrawStartParams<T> = IObserverCallbackParams<'draw-start', T> & {
    lon: number;
    lat: number;
    height: number;
};
export declare type OnDrawMoveParams<T> = IObserverCallbackParams<'draw-move', T> & {
    entity: Entity;
};
export declare type OnDrawEndParams<T> = IObserverCallbackParams<'draw-end', T> & {
    entity: Entity;
};
export declare type OnDrawStartReture = Entity | false;
export declare type OnDrawMoveReture = Entity | false;
export declare type OnDrawEndReture = Entity | false;
export interface IDrawToolEvent extends IBaseToolEvent {
    'draw-start': {
        lon: number;
        lat: number;
        height: number;
    };
    'draw-move': {
        entity: Entity;
    };
    'draw-end': {
        entity: Entity;
    };
}
export interface IStyleOptions {
    point?: PointGraphics.ConstructorOptions;
    polyline?: PolylineGraphics.ConstructorOptions;
    polygon?: PolygonGraphics.ConstructorOptions;
}
export declare type DrawType = 'point' | 'polyline' | 'polygon';
export interface IDrawToolOptions {
    drawType?: DrawType;
}
/** 绘图工具类 */
export declare class DrawTool<T extends IDrawToolEvent> extends BaseTool<T> {
    /** 屏幕事件处理器 */
    private _handler;
    /** 绘制完成样式 */
    private _drawedOptions;
    /** 绘制过程样式 */
    private _drawingOptions;
    /** 绘制类型 */
    private _drawType;
    /** 绘制过程实体 */
    private _tempEntity;
    /** 是否贴地 */
    private _isClampToGround;
    /** 鼠标样式 */
    protected cursorType_: MapCursorType;
    /** 构造绘图工具对象 */
    constructor(webMap: WebMap, options?: IDrawToolOptions);
    /**
     * 通过movement对象获取经纬度与高程值
     * @param movement movement对象
     */
    private _getLonLatHeightFromMovement;
    /** 初始化绘制任务 */
    private _initDrawAction;
    /** 初始化点绘制任务 */
    private _initDrawPointAction;
    private _initDrawPolylineAction;
    private _initDrawPolygonAction;
    /** 重写：工具激活触发事件 */
    protected onToolActived_(e: OnToolActivedParams<this>): OnToolActivedReture;
    /** 重写：工具失活触发事件 */
    protected onToolDeActived_(e: OnToolDeActivedParams<this>): OnToolDeActivedReture;
    /** 开始绘制触发事件 */
    protected onDrawStart_(e: OnDrawStartParams<this>): OnDrawStartReture;
    /** 绘制移动触发事件 */
    protected onDrawMove_(e: OnDrawMoveParams<this>): OnDrawMoveReture;
    /** 绘制完成触发事件 */
    protected onDrawEnd_(e: OnDrawEndParams<this>): OnDrawEndReture;
}
export default DrawTool;
