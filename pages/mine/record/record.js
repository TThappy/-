var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.url + '/api/pushrecords/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      data: {
        openId: wx.getStorageSync("openId")
      },
      method: "GET",
      success(res) {
        console.log(res.data)
        for(var  i = 0;i < res.data.length;i++){
          res.data[i]['upTime'] = util.formatTime(res.data[i]['upTime'], "y-m-d h:m")
          res.data[i]['goodsImg'] = app.globalData.url + res.data[i]['goodsImg']
        }
        that.setData({
          records:res.data
        })
        console.log(res.data)
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