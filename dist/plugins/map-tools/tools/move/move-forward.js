import AmountTool from '../../amount-tool';
/** 向前方移动工具 */
export class MoveForwardTool extends AmountTool {
    //#region 保护方法
    /** 重写：工具激活触发事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        this.camera_.moveForward(this.amount_);
        return true;
    }
}
export default MoveForwardTool;
