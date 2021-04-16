import { Entity } from 'cesium';
import WebMapPlugin from '../../web-map-plugin/web-map-plugin';
export declare type IEntity = Entity | Entity.ConstructorOptions;
/** 地图实体控制插件类 */
export declare class MapEntities extends WebMapPlugin<{}> {
    /** 构造地图实体控制插件对象 */
    constructor();
    /**
     * 添加实体对象
     * @param entity 实体
     * @returns this
     */
    addEntities(entity: IEntity): this;
    /**
     * 添加实体对象
     * @param entities 实体
     * @returns this
     */
    addEntities(entities: IEntity[]): this;
    /**
     * 移除实体对象
     * @param entity 实体
     * @returns this
     */
    removeEntities(entity: Entity): this;
    /**
     * 移除实体对象
     * @param entities 实体
     * @returns this
     */
    removeEntities(entities: Entity[]): this;
    /**
     * 清空实体对象
     * @returns this
     */
    clearEntities(): this;
    /**
     * 设置实体对象
     * @param entity 实体
     * @returns this
     */
    setEntities(entity: IEntity): this;
    /**
     * 设置实体对象
     * @param entities 实体
     * @returns this
     */
    setEntities(entities: IEntity[]): this;
}
export default MapEntities;
