Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:'',
    name:'',
    inputShowed: false,
    inputVal: "",
    code:'',
    goods: [{ 'id': 1, 'pic': 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIxQoibT3WvrjMawopu3yqSfpGvlAEVyvCFSy5CqHTZoghoWjWib9LK86GM10xsJbTWVVp5mKXf0CUA/132', 'name': '校园卡'},
      { 'id': 2, 'pic': 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIxQoibT3WvrjMawopu3yqSfpGvlAEVyvCFSy5CqHTZoghoWjWib9LK86GM10xsJbTWVVp5mKXf0CUA/132', 'name': '校园卡'},
      { 'id': 3, 'pic': 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIxQoibT3WvrjMawopu3yqSfpGvlAEVyvCFSy5CqHTZoghoWjWib9LK86GM10xsJbTWVVp5mKXf0CUA/132', 'name': '校园卡'}]
  },
  pushgoods: (e) => {
    wx.navigateTo({
      url: '../goods/goods',
    })
  },
  toDetailsTap: (e) =>{
    console.log(e)
    wx.navigateTo({
      url: '../goods-details/goods-details?id=' + e.currentTarget.dataset.id,
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  },
  onLoad() {
    this.setData({
      search: this.search.bind(this)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.login({
      success: (ret) => {
        console.log(ret)
        that.setData({
          code:ret.code
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
              }
            })
          },
          
        })
        
      }

    })
   
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})