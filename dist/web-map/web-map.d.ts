import { Viewer, Camera, Scene, EntityCollection } from 'cesium';
import Observer from '@xizher/observer';
import Basemap from '../plugins/basemap/basemap';
import MapCursor from '../plugins/map-cursor/map-cursor';
import WebMapPlugin from '../web-map-plugin/web-map-plugin';
import Map3dTile from '../plugins/map-3d-tile/map-3d-tile';
import MapTools from '../plugins/map-tools/map-tools';
import MapCamera from '../plugins/map-camera/map-camera';
import MapEntities from '../plugins/map-entities/map-entities';
/** 视图对象接口 */
export interface IViewer extends Viewer {
    $owner: WebMap;
}
/** 相机对象接口 */
export interface ICamera extends Camera {
    $owner: WebMap;
}
/** 相机场景接口 */
export interface IScene extends Scene {
    $owner: WebMap;
}
/** 实体对象接口 */
export interface IEntities extends EntityCollection {
    $owner: WebMap;
}
/** WebMap配置项接口 */
export interface IWebMapOptions extends Viewer.ConstructorOptions {
    baseUrl?: string;
    center?: [number, number];
    zoom?: number;
    debug?: boolean;
    debugName?: string;
}
/** WebMap类 */
export declare class WebMap extends Observer<{
    'loaded': void;
}> {
    basemap?: Basemap;
    mapCursor?: MapCursor;
    map3dTile?: Map3dTile;
    mapTools?: MapTools;
    mapCamera?: MapCamera;
    mapEntities?: MapEntities;
    /** 地图目标容器Id */
    private _targetDiv;
    /** 视图对象 */
    private _viewer;
    /** 视图对象 */
    private _camera;
    /** 场景对象 */
    private _scene;
    private _entities;
    /** 配置项 */
    private _options;
    get targetDiv(): string;
    get viewer(): IViewer;
    get camera(): ICamera;
    get scene(): IScene;
    get entities(): IEntities;
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
