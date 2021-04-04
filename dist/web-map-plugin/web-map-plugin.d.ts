import Observer from '@xizher/observer';
import WebMap, { IViewer } from '../web-map/web-map';
/** WebMap插件类 */
declare class WebMapPlugin<T> extends Observer<T> {
    /** 插件对象名 */
    private _pluginName;
    /** 视图对象 */
    protected viewer_: IViewer;
    get pluginName(): string;
    /**
     * 构造WebMap插件对象
     * @param pluginName 插件对象名
     */
    constructor(pluginName: string);
    /**
     * 安装插件
     * @param webMap WebMap对象
     * @returns this
     */
    installPlugin(webMap: WebMap): this;
}
export default WebMapPlugin;
