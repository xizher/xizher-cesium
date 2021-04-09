import BaseTool from './base-tool';
/** 移动基础工具类 */
export class AmountTool extends BaseTool {
    //#endregion
    //#region 构造函数
    /**
     * 构造向前方移动工具
     * @param viewer 视图对象
     * @param camera 相机对象
     * @param scene 场景对象
     */
    constructor(webMap) {
        super(webMap, true);
        this.amount_ = 50;
    }
    //#endregion
    //#region 公有方法
    /**
     * 设置移动量级
     * @param amount 量
     * @returns this
     */
    getAmount(amount) {
        this.amount_ = amount;
        return this;
    }
}
export default AmountTool;
