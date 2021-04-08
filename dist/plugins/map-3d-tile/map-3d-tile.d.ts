import { Cesium3DTileset } from 'cesium';
import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
import WebMap from '../../web-map/web-map';
export interface ITilesetOptions {
    name: string;
    url: string;
}
export interface IMap3dTileOptions {
    tilesetITem?: ITilesetOptions[];
    defaultZoomTilesetName?: string;
}
/** 3dTile插件类 */
export declare class Map3dTile extends WebMapPlugin<{
    'change:visible': {
        visible: boolean;
        tilesetName: string;
        tileset: Cesium3DTileset;
    };
    'change:opacity': {
        opacity: number;
        tilesetName: string;
        tileset: Cesium3DTileset;
    };
}> {
    /** 配置项 */
    private _options;
    private _tilesetPool;
    get tilesetNames(): string[];
    /**
     * 构造3dTile插件对象
     * @param options 配置项
     */
    constructor(options?: IMap3dTileOptions);
    /** 初始化 */
    private _init;
    /** 初始化Tileset */
    private _initTileset;
    /** 重写：安装插件 */
    installPlugin(webMap: WebMap): this;
    /**
     * 通过名称获取tileset对象
     * @param name tileset名称
     * @returns tileset对象
     */
    getTilesetByName(name: string): Cesium3DTileset | null;
    getNameByTileset(tileset: Cesium3DTileset): string | null;
    /**
     * 设置tileset可见性
     * @param name tileset名称
     * @param visible 可见性
     */
    setTilesetVisible(name: string, visible: boolean): this;
    /**
     * 设置tileset可见性
     * @param tileset tileset对象
     * @param visible 可见性
     */
    setTilesetVisible(tileset: Cesium3DTileset, visible: boolean): this;
    /**
     * 设置tileset透明度
     * @param name tileset名称
     * @param opacity 不可透明度
     */
    setTilesetOpacity(name: string, opacity: number): this;
    /**
     * 设置tileset透明度
     * @param tileset tileset对象
     * @param opacity 不可透明度
     */
    setTilesetOpacity(tileset: Cesium3DTileset, opacity: number): this;
    /**
     * 缩放至tileset
     * @param name tileset名称
     */
    zoomToTileset(name: string): this;
    /**
     * 缩放至tileset
     * @param tileset tileset对象
     */
    zoomToTileset(tileset: Cesium3DTileset): this;
}
export default Map3dTile;
