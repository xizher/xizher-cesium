import { Viewer, Color } from 'cesium';
import Observer from '@xizher/observer';
import { baseUtils } from '@xizher/js-utils';
/** WebMap类 */
export class WebMap extends Observer {
    //#endregion
    //#region 构造函数
    /**
     * 构造WebMap对象
     * @param targetDiv 地图容器Id
     * @param options 配置项
     */
    constructor(targetDiv, options = {}) {
        super();
        /** 配置项 */
        this._options = {
            baseUrl: '',
            animation: false,
            infoBox: false,
            timeline: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            vrButton: false,
            homeButton: false,
            navigationHelpButton: false,
            navigationInstructionsInitiallyVisible: false,
            geocoder: false,
            sceneModePicker: false,
            selectionIndicator: false,
            creditContainer: 'credit-container',
        };
        this._targetDiv = targetDiv;
        baseUtils.$extend(true, this._options, options);
    }
    //#endregion
    //#region getter
    get targetDiv() {
        return this._targetDiv;
    }
    get viewer() {
        return this._viewer;
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        // eslint-disable-next-line
        // @ts-ignore
        window.CESIUM_BASE_URL = this._options.baseUrl;
        baseUtils.loadCss(`${this._options.baseUrl}Widgets/widgets.css`);
        const div = document.createElement('div');
        div.setAttribute('id', this._options.creditContainer);
        div.style.display = 'none';
        document.body.append(div);
        this._viewer = Object.assign(new Viewer(this._targetDiv, this._options), { $owner: this });
        this._viewer.imageryLayers.removeAll();
        this._viewer.scene.globe.baseColor = new Color(0, 0, 0, 0);
    }
    //#endregion
    //#region 公有方法
    /**
   * 挂载插件
   * @param plugin WebMap插件对象
   */
    use(plugin) {
        this[plugin.pluginName] = plugin;
        return this;
    }
    /**
     * 挂载WebMap
     */
    mount() {
        this._init();
        for (const prop in this) {
            if (this[prop]['pluginName']) {
                // eslint-disable-next-line
                // @ts-ignore
                this[prop].installPlugin(this);
            }
        }
        this.fire('loaded');
        return this;
    }
}
export default WebMap;