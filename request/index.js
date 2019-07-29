// 封装request 防止陷入回调地域。同时提取公共的url和修改返回值
export const request=(params)=>{
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
            }
        })
    })
}