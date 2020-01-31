//app.js
App({
  getSession: function () {
    var that = this;
    console.log(2)
    wx.login({
      success: (ret) => {
        console.log(ret)
        wx.getUserInfo({
          success: (res) => {
            wx.request({
              url: this.globalData.url+'/api/auth/',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: 'POST',
              data: {
                vxName: res.userInfo.nickName,
                vxImage: res.userInfo.avatarUrl,
                code: ret.code
              },
              success(res) {
                wx.setStorageSync("sessionId", res.data["session_key"]);
                wx.setStorageSync("openId", res.data['openid']);
              }
            })
          },

        })

      }

    })
  },
  refresh:function(){
    var that=this;
    setInterval(that.getSession,20*60*1000)
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    this.getSession();
    this.refresh();
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url: "http://127.0.0.1:8000"
  }
})