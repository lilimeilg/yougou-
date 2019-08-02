//1. 封装request 防止陷入回调地域。同时提取公共的url和修改返回值
// 2.封装一个正在加载中的提示效果
// 同时发送异步请求的个数
let ajaxTimes=0
export const request=(params)=>{
    wx.showLoading({
        title: "数据正在加载……",
    });
      ajaxTimes++
    // 提前公共路径
    const baseUrl = "https://api.zbztb.cn/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            // 成功后返回的result改为result.data.messgae
            success:(result)=>{
                resolve(result.data.message)
            },
            fail:(error)=>{
                reject(error)
            },
            // 无论成功或者失败都会进行的回调函数
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes===0){
                    // 请求全部回来了就隐藏加载中的提示
                    wx.hideLoading();
                      
                }
            }
        })
    })
}