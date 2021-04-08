import { Cartesian2, Cartesian3, Ellipsoid, Math as CesiumMath } from 'cesium';
import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
/** 地图相机插件类 */
export class MapCamera extends WebMapPlugin {
    //#region 构造函数
    /** 构造地图相机插件对象 */
    constructor() {
        super('mapCamera');
    }
    //#endregion
    //#region 公有方法
    /** 获取相机位置海拔高度 */
    getCameraHeight() {
        const { ellipsoid } = this.scene_.globe;
        return ellipsoid.cartesianToCartographic(this.camera_.position).height;
    }
    /** 获取相机位置经纬度 */
    getCameraLonLat() {
        const result = this.camera_.pickEllipsoid(new Cartesian3(this.viewer_.canvas.clientWidth / 2, this.viewer_.canvas.clientHeight / 2));
        const curPosition = Ellipsoid.WGS84.cartesianToCartographic(result);
        const lon = curPosition.longitude * 180 / Math.PI;
        const lat = curPosition.latitude * 180 / Math.PI;
        return [lon, lat];
    }
    /** 获取相机视野范围 */
    getCameraExtent() {
        const extent = {}; // eslint-disable-line
        const { ellipsoid } = this.scene_.globe;
        const { canvas } = this.scene_;
        const car3Lt = this.camera_.pickEllipsoid(new Cartesian2(0, 0), ellipsoid);
        const car3Rb = this.camera_.pickEllipsoid(new Cartesian2(canvas.width, canvas.height), ellipsoid);
        if (car3Lt && car3Rb) {
            const cartoLt = ellipsoid.cartesianToCartographic(car3Lt);
            const cartoRb = ellipsoid.cartesianToCartographic(car3Rb);
            extent.lonMin = CesiumMath.toDegrees(cartoLt.longitude);
            extent.latMax = CesiumMath.toDegrees(cartoLt.latitude);
            extent.lonMax = CesiumMath.toDegrees(cartoRb.longitude);
            extent.latMin = CesiumMath.toDegrees(cartoRb.latitude);
        }
        else if (!car3Lt && car3Rb) {
            let car3Lt2 = null;
            let yIndex = 0;
            do {
                yIndex <= canvas.height ? yIndex += 10 : canvas.height;
                car3Lt2 = this.camera_.pickEllipsoid(new Cartesian2(0, yIndex), ellipsoid);
            } while (!car3Lt2);
            const cartoLt2 = ellipsoid.cartesianToCartographic(car3Lt2);
            const cartoRb2 = ellipsoid.cartesianToCartographic(car3Rb);
            extent.lonMin = CesiumMath.toDegrees(cartoLt2.longitude);
            extent.latMax = CesiumMath.toDegrees(cartoLt2.latitude);
            extent.lonMax = CesiumMath.toDegrees(cartoRb2.longitude);
            extent.latMin = CesiumMath.toDegrees(cartoRb2.latitude);
        }
        extent.height = Math.ceil(this.camera_.positionCartographic.height);
        return extent;
    }
}
export default MapCamera;
