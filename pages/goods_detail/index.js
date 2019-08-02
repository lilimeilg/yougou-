// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import { getStorageCart, setStorageCart } from "../../utils/storage.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  // 全局变量 商品的完整信息
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.getGoodsDetail(options.goods_id);
  },
  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = res;
    // console.log(res);
    this.setData({
      //只存储需要用到的数据
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // 把全部的webp图片转换成jpg格式
        goods_introduce: res.goods_introduce.replace(/\.webp/g, ".jpg"),
        pics: res.pics
      }
    });
  },
  // 点击图片预览大图
  handlePreviewImage(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    // console.log(index);
    // urls是数组，需要预览的图片链接列表

    const urls = this.data.goodsObj.pics.map(v => v.pics_big);
    // console.log(urls);
    // 当前预览图片的路径
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    });
  },
  // 点击加入购物车
  handleCartAdd() {
    // 购物车要么是个完整的对象，要么是个空对象
    let cart = getStorageCart() || {};
    // 判断要添加的商品是否存在于购物车中
    // 如果属性是个数值不能直接用点的方式取值，会报错，需要用方括号代替点语法
    if (cart[this.GoodsInfo.goods_id]) {
      // 如果有就只需要增加数量
      cart[this.GoodsInfo.goods_id].num++;
    }else{
      // 第一次新增数据
      cart[this.GoodsInfo.goods_id] = this.GoodsInfo;
      cart[this.GoodsInfo.goods_id].num=1;
    }
    setStorageCart(cart)
    wx.showToast({
      title:"添加成功",
      icon: 'none',
      // true 用户无法操作页面的按钮 遮罩层 蒙版  
      mask: true
    })
  }
});
