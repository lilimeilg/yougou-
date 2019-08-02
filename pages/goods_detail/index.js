// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGoodsDetail(options.goods_id);
  },
  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } });
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
    const {index}=e.currentTarget.dataset
    // console.log(index);
    // urls是数组，需要预览的图片链接列表

    const urls=this.data.goodsObj.pics.map(v=>v.pics_big)
    // console.log(urls);
    // 当前预览图片的路径
    const current =urls[index]
    wx.previewImage({
      current,
      urls
    })
  }
});
