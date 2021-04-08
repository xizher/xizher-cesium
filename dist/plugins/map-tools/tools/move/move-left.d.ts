import { OnToolActivedParams, OnToolActivedReture } from '../../base-tool';
import AmountTool from '../../amount-tool';
/** 向左侧移动工具 */
export declare class MoveLeftTool extends AmountTool {
    /** 重写：工具激活触发事件 */
    protected onToolActived_(e: OnToolActivedParams<this>): OnToolActivedReture;
}
export default MoveLeftTool;
