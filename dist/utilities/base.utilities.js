import { UrlTemplateImageryProvider } from 'cesium';
/** 创建UrlTemplateImageryProvider对象 */
export function createUrlTemplateImageryProvider(url, options = { url }) {
    return new UrlTemplateImageryProvider({
        url, ...options
    });
}
