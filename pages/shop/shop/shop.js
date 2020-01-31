var app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    code: '',
    TabCur: 0,
    scrollLeft: 0,
    navs:[],
    kind:[]
  },
  
  lifetimes:{
   created(){
     var that = this;
     
   }
 },
  attached() {
    console.log("success")
    var that = this;
    wx.request({
      url: app.globalData.url + '/api/goodstag/',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          that.data.navs.push({
            title:res.data[i]['kind'],
            icon:res.data[i]['icon'],
            dataList:[]  
          })
          that.data.kind.push(res.data[i]['kind'])
        }
        that.setData({
          navs: that.data.navs,
          kind:that.data.kind
        })
        console.log(that.data.kind)
      }

    })
      wx.request({
        url: app.globalData.url + '/api/goods/',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
        },
        method: 'GET',
        success(res) {
          console.log(res.data)
          //存入物品数据
          for (var i = 0; i < res.data.length; i++) {
            var index = that.data.kind.indexOf(res.data[i]['kind']['kind'])
            that.data.navs[index]['dataList'].push(res.data[i])   
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

