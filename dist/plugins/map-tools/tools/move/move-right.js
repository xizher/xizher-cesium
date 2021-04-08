import AmountTool from '../../amount-tool';
/** 向右侧移动工具 */
export class MoveRightTool extends AmountTool {
    //#region 保护方法
    /** 重写：工具激活触发事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        this.camera_.moveRight(this.amount_);
        return true;
    }
}
export default MoveRightTool;
