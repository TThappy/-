Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    code: '',
    TabCur: 0,
    scrollLeft: 0,
    navs:[{
      title:"校园卡",
      icon: "cuIcon-newsfill"
    },
    {
      title:"钥匙",
      icon:"cuIcon-lock"
    },
    {
      title:"书籍",
      icon:"cuIcon-form"
    },
    {
      title:"包",
      icon:"cuIcon-goods"
    },
    {
      title:"证件",
      icon:"cuIcon-vipcard"
    },
    {
      title: "手机",
      icon: "cuIcon-mobile"
    },
    {
      title:"其它",
      icon:"cuIcon-favor"
    }

    ]
  },
  attached() {
    console.log("success")
    var that = this;
    wx.login({
      success: (ret) => {
        console.log(ret)
        that.setData({
          code: ret.code
        })
        wx.getUserInfo({
          success: (res) => {
            wx.request({
              url: 'http://127.0.0.1:8000/api/user/',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: 'GET',
              data: {
                vxName: res.userInfo.nickName,
                vxImage: res.userInfo.avatarUrl,
                code: ret.code
              },
              success(res){
                wx.setStorageSync("openId", res.data['openId'])
              }
            })
          },

        })

      }

    })
    wx.hideLoading()
  },
  methods: {
    tabSelect(e) {
      console.log(e)
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
  },
  showModal(e) {

  },
  hideModal(e) {

  },
  showQrcode() {

  },
})

