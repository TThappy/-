//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    'userInfo':false
  },
  //事件处理函数
  bindgetuserinfo(e){ //点击进入程序设计
    wx.getUserInfo({ //调用授权
      success: (res) =>{
        this.setData({
          userInfo:true
        });
        wx.switchTab({
          url: '../shop/shop',
        })
      },
      fail:(res) =>{
        console.log("fail")
      }
    })
  },
  onLoad: function () {
    wx.authorize({ 
      scope: 'scope.userInfo'
    })
    wx.getSetting({
      success:(res) => {
        console.log(res.authSetting)
        if(res.authSetting['scope.userInfo']){
          wx.switchTab({
            url: '../shop/shop',
          })
        }
      },
      fail:(res) => {
        console.log('未授权')
      }
    })
  }
})