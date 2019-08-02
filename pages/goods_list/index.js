// pages/goods_list/index.js
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tabs:[
     {id:0,title:"综合",isActive:true},
     {id:1,title:"销量",isActive:false},
     {id:2,title:"价格",isActive:false},
   ],
   goodsList:[]
  },
  // 全局接口参数
 QueryParams:{
   query:"",//搜索关键字
   cid:"",//商品分类页面传递过来的分类id
   pagenum:1,//当前页码
   pagesize:10//每页显示条数
 },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad 页面开始加载的时候触发  形参中可以获取到页面的url参数
  // 小程序页面加载的时候，可以通过options获取到上一个页面标签的属性以及属性值
  onLoad: function (options) {
    console.log(options);
    this.QueryParams.cid=options.cid
    this.getGoodsList()
  },
// 改变tabs标签的选中效果
handleTitleChange(e){
  // 接收子组件传递过来的数据
  const {index}=e.detail
  // console.log(index);
  // 获取源数组
  let {tabs}=this.data
  // 判断点击的索引跟子组件传递的索引是否一致，是的话就修改isactive的值
  tabs.forEach((v,i)=>{
    i===index?v.isActive=true:v.isActive=false
  });
  // 修改了data需要重新赋值
  this.setData({tabs})
},
getGoodsList(){
  request({url:"/goods/search",data:this.QueryParams}).then(res=>{
    console.log(res);
    this.setData({
      goodsList:res.goods
    })
  })
}
  
})