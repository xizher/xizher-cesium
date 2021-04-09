import WebMap from '../../web-map/web-map';
import BaseTool from './base-tool';
/** 移动基础工具类 */
export declare class AmountTool extends BaseTool {
    protected amount_: number;
    /**
     * 构造向前方移动工具
     * @param viewer 视图对象
     * @param camera 相机对象
     * @param scene 场景对象
     */
    constructor(webMap: WebMap);
    /**
     * 设置移动量级
     * @param amount 量
     * @returns this
     */
    getAmount(amount: number): this;
}
export default AmountTool;
