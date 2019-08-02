/**
 * 获取商品的分类数据
 */
export const getStorage=()=>{
    return wx.getStorageSync("cates")
}
/**
 * 把商品分类数据存储到本地中
 * @param {Object} obj 要存入的信息
 */
export const setStorageCates=(obj)=>{
    wx.setStorageSync("cates",obj)
}