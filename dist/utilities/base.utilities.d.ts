import { UrlTemplateImageryProvider } from 'cesium';
/** 创建UrlTemplateImageryProvider对象 */
export declare function createUrlTemplateImageryProvider(url: string, options?: UrlTemplateImageryProvider.ConstructorOptions): UrlTemplateImageryProvider;
/**
 * 通过海拔高度计算缩放等级
 * @param height 海拔高度
 * @returns 缩放等级
 */
export declare function calculateZoomFromHeight(height: number): number;
/**
 * 通过缩放等级计算海拔高度
 * @param zoom 缩放等级
 * @returns 海拔高度
 */
export declare function clacualteHeightFromZoom(zoom: number): number;
