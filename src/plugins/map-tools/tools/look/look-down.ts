import { OnToolActivedParams, OnToolActivedReture } from '../../base-tool'
import AmountTool from '../../amount-tool'

/** 向下方看工具 */
export class LookDownTool extends AmountTool {

  //#region 保护方法

  /** 重写：工具激活触发事件 */
  protected onToolActived_ (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived_(e)) {
      return false
    }
    this.camera_.lookUp(this.amount_)
    return true
  }

  //#endregion

}

export default LookDownTool
