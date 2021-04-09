import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
import BaseTool from './base-tool';
import MoveForwardTool from './tools/move/move-forward';
import MoveBackwardTool from './tools/move/move-backward';
import MoveUpTool from './tools/move/move-up';
import MoveDownTool from './tools/move/move-down';
import MoveLeftTool from './tools/move/move-left';
import MoveRightTool from './tools/move/move-right';
import LookUpTool from './tools/look/look-up';
import LookDownTool from './tools/look/look-down';
import LookLeftTool from './tools/look/look-left';
import LookRightTool from './tools/look/look-right';
import DrawTool from './tools/draw/draw-tool';
/** 地图工具链 */
export class MapTools extends WebMapPlugin {
    //#endregion
    //#region 构造函数
    /** 构造地图工具链对象 */
    constructor() {
        super('mapTools');
        //#region 私有方法
        /** 工具池 */
        this._toolPool = new Map();
        /** 当前激活工具的Key */
        this._activedKey = 'default';
    }
    //#endregion
    //#region getter
    get activedKey() {
        return this._activedKey;
    }
    //#endregion
    //#region 私有方法
    /** 初始化 */
    _init() {
        this._toolPool
            .set('default', new BaseTool(this.viewer_.$owner))
            .set('move-forward', new MoveForwardTool(this.viewer_.$owner))
            .set('move-backward', new MoveBackwardTool(this.viewer_.$owner))
            .set('move-up', new MoveUpTool(this.viewer_.$owner))
            .set('move-down', new MoveDownTool(this.viewer_.$owner))
            .set('move-left', new MoveLeftTool(this.viewer_.$owner))
            .set('move-right', new MoveRightTool(this.viewer_.$owner))
            .set('look-up', new LookUpTool(this.viewer_.$owner))
            .set('look-down', new LookDownTool(this.viewer_.$owner))
            .set('look-left', new LookLeftTool(this.viewer_.$owner))
            .set('look-right', new LookRightTool(this.viewer_.$owner))
            .set('draw-point', new DrawTool(this.viewer_.$owner));
        document.onkeydown = evt => {
            const code = evt.keyCode;
            switch (code) {
                case 38:
                    this.setMapTool('move-forward');
                    break;
                case 40:
                    this.setMapTool('move-backward');
                    break;
                case 37:
                    this.setMapTool('move-left');
                    break;
                case 39:
                    this.setMapTool('move-right');
                    break;
                case 87:
                    this.setMapTool('move-up');
                    break;
                case 83:
                    this.setMapTool('move-down');
                    break;
                case 65:
                    this.setMapTool('look-left');
                    break;
                case 68:
                    this.setMapTool('look-right');
                    break;
                case 81:
                    this.setMapTool('look-up');
                    break;
                case 69:
                    this.setMapTool('look-down');
                    break;
                default:
                    break;
            }
        };
    }
    //#endregion
    //#region 公有方法
    /** 重写：插件安装方法 */
    installPlugin(webMap) {
        super.installPlugin(webMap);
        this._init();
        return this;
    }
    /**
     * 设置工具
     * @param toolKey 工具Key
     */
    setMapTool(toolKey) {
        if (!this._toolPool.has(toolKey)) {
            return this;
        }
        const tool = this._toolPool.get(toolKey);
        if (tool.isOnceTool) {
            this.fire('change', {
                previousKey: this._activedKey,
                currentKey: this._activedKey,
                executeKey: toolKey,
                isOnceTool: true
            });
            tool.active();
            return this;
        }
        [...this._toolPool.values()].map(t => {
            if (t !== tool) {
                t.deactive();
            }
        });
        this.fire('change', {
            previousKey: this._activedKey,
            currentKey: toolKey,
            executeKey: toolKey,
            isOnceTool: false
        });
        this._activedKey = toolKey;
        tool.active();
        return this;
    }
    /**
     * 创建自定义工具
     * @param key 工具Key
     * @param tool 工具对象
     */
    createCustomTool(key, tool) {
        this._toolPool.set(key, tool);
        return this;
    }
    /**
     * 检查是否存在工具
     * @param key 工具Key
     */
    hasTool(key) {
        return this._toolPool.has(key);
    }
    /**
     * 移除工具
     * @param key 工具Key
     */
    deleteTool(key) {
        this._toolPool.has(key) && this._toolPool.delete(key);
        if (this._activedKey === key) {
            this.setMapTool('default');
        }
        return this;
    }
    /**
     * 获取工具
     * @param key 工具Key
     */
    getTool(key) {
        if (!this._toolPool.has(key)) {
            return null;
        }
        return this._toolPool.get(key);
    }
}
export default MapTools;
