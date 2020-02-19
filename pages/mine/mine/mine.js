var app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
   identity:''
  },
  attached() {
    console.log("success")
    var that = this;
    wx.getUserInfo({
      success: (res) => {
        that.setData({
          name: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
        wx.request({
          url: app.globalData.url + '/api/user/',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
          },
          method: 'GET',
          data: {
            openId: wx.getStorageSync("openId")
          },
          success(res) {
            if(res.data.identify == '0'){
              //未认证
              that.setData({
                identity:"未认证"
              })
            }
            else{
              //已认证
              that.setData({
                identity: "已认证"
              })
            }
          }
        })
      }
    })
    wx.hideLoading()
  },
  methods: {
   
    },
    showModal(e) {
     
    },
    hideModal(e) {
      
    },
    showQrcode() {
      
    },
  }
)
