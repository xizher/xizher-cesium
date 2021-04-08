import { UrlTemplateImageryProvider } from 'cesium';
/** 创建UrlTemplateImageryProvider对象 */
export function createUrlTemplateImageryProvider(url, options = { url }) {
    return new UrlTemplateImageryProvider({
        url, ...options
    });
}
/**
 * 通过海拔高度计算缩放等级
 * @param height 海拔高度
 * @returns 缩放等级
 */
export function calculateZoomFromHeight(height) {
    const cosin = ((Math.cos(Math.PI / 180 * (85.362 / 2))) / (Math.sin(Math.PI / 180 * (85.362 / 2))));
    const zoom = Math.log2((cosin * 591657550.5) / (40 * height)) + 2.5;
    return zoom;
}
/**
 * 通过缩放等级计算海拔高度
 * @param zoom 缩放等级
 * @returns 海拔高度
 */
export function clacualteHeightFromZoom(zoom) {
    const cosin = ((Math.cos(Math.PI / 180 * (85.362 / 2))) / (Math.sin(Math.PI / 180 * (85.362 / 2))));
    const firstPartOfEq = (.05 * ((591657550.5 / (Math.pow(2, (zoom - 2.5)))) / 2));
    const height = (firstPartOfEq) * cosin;
    return height;
}
