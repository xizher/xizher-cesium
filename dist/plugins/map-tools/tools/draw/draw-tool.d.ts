import { IObserverCallbackParams } from '@xizher/observer';
import { Entity } from 'cesium';
import WebMap from '../../../../web-map/web-map';
import BaseTool, { IBaseToolEvent, OnToolActivedParams, OnToolActivedReture, OnToolDeActivedParams, OnToolDeActivedReture } from '../../base-tool';
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
/** 绘图工具类 */
export declare class DrawTool<T extends IDrawToolEvent> extends BaseTool<T> {
    /** 屏幕事件处理器 */
    private _handler;
    /** 构造绘图工具对象 */
    constructor(webMap: WebMap);
    /**
     * 通过movement对象获取经纬度与高程值
     * @param movement movement对象
     */
    private _getLonLatHeightFromMovement;
    /** 初始化点绘制任务 */
    private _initDrawPointAction;
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
