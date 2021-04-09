import Observer, { IObserverCallbackParams } from '@xizher/observer';
import WebMap, { IViewer, ICamera, IScene, IEntities } from '../../web-map/web-map';
export declare type OnToolActivedParams<T> = IObserverCallbackParams<'tool-actived', T>;
export declare type OnToolDeActivedParams<T> = IObserverCallbackParams<'tool-deactived', T>;
export declare type OnToolActivedReture = boolean;
export declare type OnToolDeActivedReture = boolean;
export interface IBaseToolEvent {
    'tool-actived': void;
    'tool-deactived': void;
}
/** 基础工具类 */
export declare class BaseTool<T extends IBaseToolEvent = {
    'tool-actived': void;
    'tool-deactived': void;
}> extends Observer<T> {
    /** 是否为一次性工具 */
    private _isOnceTool;
    /** 工具是否为激活状态 */
    private _actived;
    /** 视图对象 */
    protected viewer_: IViewer;
    /** 相机对象 */
    protected camera_: ICamera;
    /** 场景对象 */
    protected scene_: IScene;
    /** 实体对象 */
    protected entities_: IEntities;
    get isOnceTool(): boolean;
    get actived(): boolean;
    /**
     * 构造基础工具对象
     * @param map 地图对象
     * @param view 视图对象
     * @param isOnceTool 是否为一次性工具，默认为否
     */
    constructor(webMap: WebMap, isOnceTool?: boolean);
    /** 工具激化处理事件 */
    protected onToolActived_(e: OnToolActivedParams<this>): OnToolActivedReture;
    /** 工具失活处理事件 */
    protected onToolDeActived_(e: OnToolDeActivedParams<this>): OnToolDeActivedReture;
    /** 激活工具 */
    active(): this;
    /** 接触工具激活状态 */
    deactive(): this;
}
export default BaseTool;
