// pages/cart/index.js
import { getSetting,openSetting,chooseAddress } from "../../utils/asyncWx";
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
// 获取收货地址
//   handleChooseAddress(){
// //  1.获取用户对小程序的授权信息
// wx.getSetting({
//   success:(res1)=>{
//     // 成功获取了用户的收取信息
//     const scopeAddress=res1.authSetting['scope.address']
//     // 用户授权过或者从未调用过收货地址
//     if(scopeAddress===true||scopeAddress===undefined){
//       // 调用收货地址
//       wx.chooseAddress({
//      success:(res2)=>{
//        console.log(res2);
//      }
//       })
//     }else{
//       // 用户曾经拒绝授权获取收货地址
//       wx.openSetting({
//         success:()=>{
//           // 再次调用收获地址
//           wx.chooseAddress({
//             success:(res3)=>{
//               console.log(res3);
//             }
//           })
//         }
//       })
//     }
//   }
// })
// }
async handleChooseAddress(){
  const res1=await getSetting()
  const scopeAddress=res1.authSetting['scope.address']
  // 对授权信息进行判断
  if(scopeAddress===true||scopeAddress===undefined){
    // 2.1直接调用获取收货地址的api
    const res2=await chooseAddress();
    console.log(res2);
  }else{
    // 2.2 诱导用户 打开授权页面
    await openSetting();
    // 2.3 获取收货地址
    const res2=await chooseAddress();
    console.log(res2);
  }
}
})