import { OnToolActivedParams, OnToolActivedReture } from '../../base-tool'
import AmountTool from '../../amount-tool'

/** 向左側看工具 */
export class LookLeftTool extends AmountTool {

  //#region 保护方法

  /** 重写：工具激活触发事件 */
  protected onToolActived_ (e: OnToolActivedParams<this>) : OnToolActivedReture {
    if (!super.onToolActived_(e)) {
      return false
    }
    this.camera_.lookRight(this.amount_)
    return true
  }

  //#endregion

}

export default LookLeftTool
