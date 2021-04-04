import { UrlTemplateImageryProvider } from 'cesium'

/** 创建UrlTemplateImageryProvider对象 */
export function createUrlTemplateImageryProvider (url: string, options: UrlTemplateImageryProvider.ConstructorOptions = { url }) : UrlTemplateImageryProvider {
  return new UrlTemplateImageryProvider({
    url, ...options
  })
}
