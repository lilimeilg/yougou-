// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tabs:[
     {id:0,title:"综合",isActive:true},
     {id:1,title:"销量",isActive:false},
     {id:2,title:"价格",isActive:false},
   ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
}
  
})