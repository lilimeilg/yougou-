// pages/index/index.js
// 引入封装和的request
import { request } from "../../request/index.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 分类导航数据
    navCatList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSwiperList();
    this.getNavCatList();
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" }).then(result => {
      // console.log(result);
      this.setData({
        swiperList: result
      });
    })
  },
  // 获取分类导航的数据
  getNavCatList() {
    request({ url: "/home/catitems" }).then(result => {
      this.setData({
        navCatList: result
      });
    });
  },
  // 获取楼层数据
getFloorList(){
request({url:"/home/floordata"}).then(result=>{
  // console.log(result);
  this.setData({
    floorList:result
  })
})
}
});
