import { Viewer } from 'cesium';
import Observer from '@xizher/observer';
import Basemap from '../plugins/basemap/basemap';
import MapCursor from '../plugins/map-cursor/map-cursor';
import WebMapPlugin from '../web-map-plugin/web-map-plugin';
/** 视图对象接口 */
export interface IViewer extends Viewer {
    $owner: WebMap;
}
/** WebMap配置项接口 */
export interface IWebMapOptions extends Viewer.ConstructorOptions {
    baseUrl?: string;
}
/** WebMap类 */
export declare class WebMap extends Observer<{
    'loaded': void;
}> {
    basemap?: Basemap;
    mapCursor?: MapCursor;
    /** 地图目标容器Id */
    private _targetDiv;
    /** 视图对象 */
    private _viewer;
    /** 配置项 */
    private _options;
    get targetDiv(): string;
    get viewer(): IViewer;
    /**
     * 构造WebMap对象
     * @param targetDiv 地图容器Id
     * @param options 配置项
     */
    constructor(targetDiv: string, options?: IWebMapOptions);
    /** 初始化 */
    private _init;
    /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
    use<T>(plugin: WebMapPlugin<T>): WebMap;
    /**
     * 挂载WebMap
     */
    mount(): WebMap;
}
export default WebMap;