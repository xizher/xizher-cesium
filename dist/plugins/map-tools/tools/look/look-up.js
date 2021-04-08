import AmountTool from '../../amount-tool';
/** 向上方看工具 */
export class LookUpTool extends AmountTool {
    //#region 保护方法
    /** 重写：工具激活触发事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        this.camera_.lookDown(this.amount_);
        return true;
    }
}
export default LookUpTool;
