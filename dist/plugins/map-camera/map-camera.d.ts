import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
/** 地图相机插件类 */
export declare class MapCamera extends WebMapPlugin<{}> {
    /** 构造地图相机插件对象 */
    constructor();
    /** 获取相机位置海拔高度 */
    getCameraHeight(): number;
    /** 获取相机位置经纬度 */
    getCameraLonLat(): [number, number];
    /** 获取相机视野范围 */
    getCameraExtent(): {
        lonMin: number;
        latMin: number;
        lonMax: number;
        latMax: number;
        height: number;
    };
}
export default MapCamera;
