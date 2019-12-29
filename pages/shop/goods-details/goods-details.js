
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsId:null,
    dataList:[],
  },
  // 领取物品
  getGoodsTap:function(e){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    that.setData({
      goodsId:options.goodsId
    })
    wx.request({
      url: 'http://127.0.0.1:8000/api/goodsdetail/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      data:{
        goodsId:that.data.goodsId
      },
      method:"GET",
      success(res){
        res.data['missTime'] = util.formatTime(res.data['missTime'],"y-m-d h:m")
        res.data['upTime'] = util.formatTime(res.data['upTime'], "y-m-d h:m")
        that.setData({
          dataList:res.data
        })
        console.log(that.data.dataList)
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