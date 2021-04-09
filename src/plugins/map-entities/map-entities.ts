import { Entity } from 'cesium'
import WebMapPlugin from '../../web-map-plugin/web-map-plugin'

/** 地图实体控制插件类 */
export class MapEntities extends WebMapPlugin<{

}> {

  //#region 构造函数

  /** 构造地图实体控制插件对象 */
  constructor () {
    super('mapEntities')
  }

  //#endregion

  //#region 公有方法

  /**
   * 添加实体对象
   * @param entity 实体
   * @returns this
   */
  public addEntities (entity: Entity) : this
  /**
   * 添加实体对象
   * @param entities 实体
   * @returns this
   */
  public addEntities (entities: Entity[]) : this
  /**
   * 添加实体对象
   * @param arg0 实体
   * @returns this
   */
  public addEntities (arg0: Entity | Entity[]) : this {
    Array.isArray(arg0)
      ? arg0.forEach(entity => this.entities_.add(entity))
      : this.entities_.add(arg0)
    return this
  }

  /**
   * 移除实体对象
   * @param entity 实体
   * @returns this
   */
  public removeEntities (entity: Entity) : this
  /**
   * 移除实体对象
   * @param entities 实体
   * @returns this
   */
  public removeEntities (entities: Entity[]) : this
  /**
   * 移除实体对象
   * @param arg0 实体
   * @returns this
   */
  public removeEntities (arg0: Entity | Entity[]) : this {
    Array.isArray(arg0)
      ? arg0.forEach(entity => this.entities_.remove(entity))
      : this.entities_.remove(arg0)
    return this
  }

  /**
   * 清空实体对象
   * @returns this
   */
  public clearEntities () : this {
    this.entities_.removeAll()
    return this
  }

  /**
   * 设置实体对象
   * @param entity 实体
   * @returns this
   */
  public setEntities (entity: Entity) : this
  /**
   * 设置实体对象
   * @param entities 实体
   * @returns this
   */
  public setEntities (entities: Entity[]) : this
  /**
   * 设置实体对象
   * @param arg0 实体
   * @returns this
   */
  public setEntities (arg0: Entity | Entity[]) : this {
    return this.clearEntities()
      // eslint-disable-next-line
      // @ts-ignore
      .addEntities(arg0)
  }

  //#endregion

}

export default MapEntities
