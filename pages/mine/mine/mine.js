Component({
  options: {
    addGlobalClass: true,
  },
  data: {
   
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
