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
      icon: "cuIcon-newsfill",
      dataList:[]
    },
    {
      title:"钥匙",
      icon:"cuIcon-lock",
      dataList: []
    },
    {
      title:"书籍",
      icon:"cuIcon-form",
      dataList: []
    },
    {
      title:"包",
      icon:"cuIcon-goods",
      dataList: []
    },
    {
      title:"证件",
      icon:"cuIcon-vipcard",
      dataList: []
    },
    {
      title: "手机",
      icon: "cuIcon-mobile",
      dataList: []
    },
    {
      title:"其它",
      icon:"cuIcon-favor",
      dataList: []
    }

    ]
  },
  
  lifetimes:{
   created(){
     var that = this;
     
   }
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
              method: 'POST',
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

    }),
      wx.request({
        url: 'http://127.0.0.1:8000/api/goods/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
        },
        method: 'GET',
        success(res) {
          
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i]['kind'] == '校园卡')
              that.data.navs[0]['dataList'].push(res.data[i]) 
            if (res.data[i]['kind'] == '钥匙')
              that.data.navs[1]['dataList'].push(res.data[i])
            if (res.data[i]['kind'] == '书籍')
              that.data.navs[2]['dataList'].push(res.data[i])
            if (res.data[i]['kind'] == '包')
              that.data.navs[3]['dataList'].push(res.data[i])
            if (res.data[i]['kind'] == '证件')
              that.data.navs[4]['dataList'].push(res.data[i])
            if (res.data[i]['kind'] == '手机')
              that.data.navs[5]['dataList'].push(res.data[i])
            if (res.data[i]['kind'] == '其它')
              that.data.navs[6]['dataList'].push(res.data[i])
          }
          console.log(that.data.navs)
          that.setData({
            navs: that.data.navs
          })
        }
        

      }) 
    
    wx.hideLoading()
  },
  methods: {
    onLoad:function(){
      var that = this;
      
    },
    tabSelect(e) {
      console.log(e)
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    toGoodsDetail(e){
      wx.navigateTo({
        url: '/pages/shop/goods-details/goods-details?goodsId=' + e.currentTarget.dataset.id,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
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

