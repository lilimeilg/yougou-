// pages/category/index.js
import { request } from "../../request/index.js";
import { getStorageCates, setStorageCates } from "../../utils/storage.js";

// 让小程序中支持es7的async语法
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //  左侧菜单数据
    leftMenuList: [],
    // 右侧菜单数据
    rightGoodsList: [],
    currentIndex: 0,
    // 右侧滚动条的距离，设置滚动条位置置顶
    scrollTop: 0
  },
  // 添加全局变量，保存数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getCatList()
    // 不能在页面加载的时候就调用方法，必须是页面加载完成后点击之后才加载这个事件
    //  this.handleMenuChange()
    // 添加本地存储效果
    // 发送请求之前先判断本地存储是否有数据，有的话就直接读取数据，没有的话就发送请求。默认值是空字符串或者null
    // 获取本地存储的值
    let cates = getStorageCates();
    if (!cates) {
      // 没有数据
      this.getCatList();
    } else {
      // 有数据，判断时间是否过期
      if (Date.now() - cates.time > 1000 * 20) {
        // 过期了就重新加载数据
        this.getCatList();
      } else {
        // 数据没有过期，直接使用
        this.Cates = cates.data;
        let leftMenuList = this.Cates.map((v, i) => ({
          cat_name: v.cat_name,
          cat_id: v.cat_id
        }));
        let rightGoodsList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightGoodsList
        });
      }
    }
  },
  // 获取分类数据
  // getCatList() {
  //   request({ url: "/categories" }).then(result => {
  //     // console.log(result);
  //     // 给全局变量赋值
  //     this.Cates = result;
  //     // 数组过滤，只留下分类名称和id
  //     // 把接口的数据存入到本地存储中,data就是存储的数据，就是返回值
  //     wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})

  //     let leftMenuList = this.Cates.map((v, i) => ({
  //       cat_name: v.cat_name,
  //       cat_id: v.cat_id
  //     }));
  //     let rightGoodsList = this.Cates[0].children;
  //     // console.log(rightGoodsList);
  //     this.setData({
  //       leftMenuList,
  //       rightGoodsList
  //     });
  //   });
  // },
  // 使用async获取分类数据
  async getCatList() {
    // 发送请求并接收返回值
    const result = await request({ url: "/categories" });
    // 给全局参数 赋值
    this.Cates = result;
    // 把接口的数据存入到本地存储中
    setStorageCates({ time: Date.now(), data: this.Cates });
    // map 返回新数组
    let leftMenuList = this.Cates.map((v, i) => ({
      cat_name: v.cat_name,
      cat_id: v.cat_id
    }));

    let rightGoodsList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightGoodsList
    });
  },
  // 左侧菜单的点击激活选中事件
  handleMenuChange(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    // console.log(index);
    let rightGoodsList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightGoodsList,
      scrollTop: 0
    });
  }
});
