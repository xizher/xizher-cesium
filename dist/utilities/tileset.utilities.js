import { Cartesian3, Cartographic, Matrix4 } from 'cesium';
/**
 * 设置Tileset偏移高度
 * @param tileset tileset对象
 * @param height 偏移高度
 */
export function setTilesetOffsetHeight(tileset, height) {
    const cartographic = Cartographic.fromCartesian(tileset.boundingSphere.center);
    const surface = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    const offset = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, height);
    const translation = Cartesian3.subtract(offset, surface, new Cartesian3());
    tileset.modelMatrix = Matrix4.fromTranslation(translation);
}
