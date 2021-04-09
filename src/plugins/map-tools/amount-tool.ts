import WebMap from '../../web-map/web-map'
import BaseTool from './base-tool'

/** 移动基础工具类 */
export class AmountTool extends BaseTool {

  //#region 保护属性

  protected amount_: number

  //#endregion

  //#region 构造函数

  /**
   * 构造向前方移动工具
   * @param viewer 视图对象
   * @param camera 相机对象
   * @param scene 场景对象
   */
  constructor (webMap: WebMap) {
    super(webMap, true)
    this.amount_ = 50
  }

  //#endregion

  //#region 公有方法

  /**
   * 设置移动量级
   * @param amount 量
   * @returns this
   */
  public getAmount (amount: number) : this {
    this.amount_ = amount
    return this
  }

  //#endregion

}

export default AmountTool
