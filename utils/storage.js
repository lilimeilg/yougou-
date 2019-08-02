/**
 * 获取商品的分类数据
 */
export const getStorageCates=()=>{
    return wx.getStorageSync("cates")
}
/**
 * 把商品分类数据存储到本地中
 * @param {Object} obj 要存入的信息
 */
export const setStorageCates=(obj)=>{
    wx.setStorageSync("cates",obj)
}
/**
 * 设置加入购物车
 * @param {Object} obj 
 */
export const setStorageCart = (obj) => {
    wx.setStorageSync("cart", obj);
  }
  /**
   * 获取购物车数据
   */
  export const getStorageCart = () => {
    return wx.getStorageSync("cart");
  }