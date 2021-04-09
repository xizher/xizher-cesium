import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
/** 地图实体控制插件类 */
export class MapEntities extends WebMapPlugin {
    //#region 构造函数
    /** 构造地图实体控制插件对象 */
    constructor() {
        super('mapEntities');
    }
    /**
     * 添加实体对象
     * @param arg0 实体
     * @returns this
     */
    addEntities(arg0) {
        Array.isArray(arg0)
            ? arg0.forEach(entity => this.entities_.add(entity))
            : this.entities_.add(arg0);
        return this;
    }
    /**
     * 移除实体对象
     * @param arg0 实体
     * @returns this
     */
    removeEntities(arg0) {
        Array.isArray(arg0)
            ? arg0.forEach(entity => this.entities_.remove(entity))
            : this.entities_.remove(arg0);
        return this;
    }
    /**
     * 清空实体对象
     * @returns this
     */
    clearEntities() {
        this.entities_.removeAll();
        return this;
    }
    /**
     * 设置实体对象
     * @param arg0 实体
     * @returns this
     */
    setEntities(arg0) {
        return this.clearEntities()
            // eslint-disable-next-line
            // @ts-ignore
            .addEntities(arg0);
    }
}
export default MapEntities;
