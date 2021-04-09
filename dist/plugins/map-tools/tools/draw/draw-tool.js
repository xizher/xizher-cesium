import { Entity, Cartesian3, Cartographic, Color, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import BaseTool from '../../base-tool';
/** 绘图工具类 */
export class DrawTool extends BaseTool {
    //#endregion
    //#region 构造函数
    /** 构造绘图工具对象 */
    constructor(webMap) {
        super(webMap);
        this.on('draw-start', e => this.onDrawStart_(e));
        this.on('draw-move', e => this.onDrawMove_(e));
        this.on('draw-end', e => this.onDrawEnd_(e));
    }
    //#endregion
    //#region 私有方法
    /**
     * 通过movement对象获取经纬度与高程值
     * @param movement movement对象
     */
    _getLonLatHeightFromMovement(movement) {
        const position = this.scene_.pickPosition(movement.position);
        const { longitude, latitude, height } = Cartographic.fromCartesian(position);
        const lon = longitude / Math.PI * 180;
        const lat = latitude / Math.PI * 180;
        return [lon, lat, height];
    }
    /** 初始化点绘制任务 */
    _initDrawPointAction() {
        this._handler.setInputAction(movement => {
            const [lon, lat, height] = this._getLonLatHeightFromMovement(movement);
            this.fire('draw-start', { lon, lat, height });
            const entity = new Entity({
                position: Cartesian3.fromDegrees(lon, lat, height),
                point: {
                    color: Color.RED,
                    pixelSize: 18
                }
            });
            this.fire('draw-end', { entity });
        }, ScreenSpaceEventType.LEFT_CLICK);
        return this;
    }
    //#endregion
    //#region 保护方法
    /** 重写：工具激活触发事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        this._handler = new ScreenSpaceEventHandler(this.scene_.canvas);
        this._initDrawPointAction();
        return true;
    }
    /** 重写：工具失活触发事件 */
    onToolDeActived_(e) {
        if (!super.onToolDeActived_(e)) {
            return false;
        }
        this._handler.destroy();
        return true;
    }
    /** 开始绘制触发事件 */
    onDrawStart_(e) {
        if (!this.actived) {
            return false;
        }
        // TODO
    }
    /** 绘制移动触发事件 */
    onDrawMove_(e) {
        if (!this.actived) {
            return false;
        }
        // TODO
    }
    /** 绘制完成触发事件 */
    onDrawEnd_(e) {
        if (!this.actived) {
            return false;
        }
        this.entities_.add(e.entity);
    }
}
export default DrawTool;
