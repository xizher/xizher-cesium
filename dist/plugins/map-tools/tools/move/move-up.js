import AmountTool from '../../amount-tool';
/** 向高处移动工具 */
export class MoveUpTool extends AmountTool {
    //#region 保护方法
    /** 重写：工具激活触发事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        this.camera_.moveUp(this.amount_);
        return true;
    }
}
export default MoveUpTool;
