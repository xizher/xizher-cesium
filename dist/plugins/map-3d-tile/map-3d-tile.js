import { baseUtils } from '@xizher/js-utils';
import { Cesium3DTileset, Cesium3DTileStyle, } from 'cesium';
import { setTilesetOffsetHeight } from '../../utilities/tileset.utilities';
import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
/** 3dTile插件类 */
export class Map3dTile extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /**
     * 构造3dTile插件对象
     * @param options 配置项
     */
    constructor(options = {}) {
        super('map3dTile');
        //#region 私有属性
        /** 配置项 */
        this._options = {
            tilesetITem: []
        };
        this._tilesetPool = new Map();
        baseUtils.$extend(true, this._options, options);
    }
    //#endregion
    //#region getter
    get tilesetNames() {
        return [...this._tilesetPool.keys()];
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this._options.tilesetITem.forEach(item => this._initTileset(item));
        return this;
    }
    /** 初始化Tileset */
    _initTileset(tilesetOptions) {
        const { name, url } = tilesetOptions;
        const tileset = new Cesium3DTileset({ url });
        tileset.readyPromise.then(() => {
            this.scene_.primitives.add(tileset);
            if (name === this._options.defaultZoomTilesetName) {
                this.viewer_.flyTo(tileset);
            }
            if (tilesetOptions.offsetHeight) {
                setTilesetOffsetHeight(tileset, tilesetOptions.offsetHeight);
            }
        });
        this._tilesetPool.set(name, tileset);
        return this;
    }
    //#endregion
    //#region 公有方法
    /** 重写：安装插件 */
    installPlugin(webMap) {
        return super.installPlugin(webMap)._init();
    }
    /**
     * 通过名称获取tileset对象
     * @param name tileset名称
     * @returns tileset对象
     */
    getTilesetByName(name) {
        if (!this._tilesetPool.has(name)) {
            return null;
        }
        return this._tilesetPool.get(name);
    }
    getNameByTileset(tileset) {
        const arr = [...this._tilesetPool.entries()];
        for (let i = 0; i < arr.length; i++) {
            const [name, item] = arr[i];
            if (tileset === item) {
                return name;
            }
        }
        return null;
    }
    /**
     * 设置tileset可见性
     * @param arg0 tileset对象或名称
     * @param visible 可见性
     */
    setTilesetVisible(arg0, visible) {
        const tileset = typeof arg0 === 'string'
            ? this.getTilesetByName(arg0)
            : arg0;
        tileset.show = visible;
        this.fire('change:visible', {
            visible, tileset,
            tilesetName: typeof arg0 === 'string' ? arg0 : this.getNameByTileset(tileset)
        });
        return this;
    }
    /**
     * 设置tileset透明度
     * @param arg0 tileset对象或名称
     * @param opacity 不可透明度
     */
    setTilesetOpacity(arg0, opacity) {
        const tileset = typeof arg0 === 'string'
            ? this.getTilesetByName(arg0)
            : arg0;
        tileset.style = new Cesium3DTileStyle({
            color: `color('rgba(255, 255, 255, ${opacity})')`
        });
        this.fire('change:opacity', {
            opacity, tileset,
            tilesetName: typeof arg0 === 'string' ? arg0 : this.getNameByTileset(tileset)
        });
        return this;
    }
    /**
     * 缩放至tileset
     * @param arg0 tileset对象或名称
     */
    zoomToTileset(arg0) {
        const tileset = typeof arg0 === 'string'
            ? this.getTilesetByName(arg0)
            : arg0;
        this.viewer_.flyTo(tileset);
        return this;
    }
}
export default Map3dTile;
