import AmountTool from '../../amount-tool';
/** 向下方看工具 */
export class LookDownTool extends AmountTool {
    //#region 保护方法
    /** 重写：工具激活触发事件 */
    onToolActived_(e) {
        if (!super.onToolActived_(e)) {
            return false;
        }
        this.camera_.lookUp(this.amount_);
        return true;
    }
}
export default LookDownTool;
