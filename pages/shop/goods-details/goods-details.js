var util = require('../../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsId: null,
    dataList: [],
  },
  // 领取物品
  getGoodsTap: function(e) {

  },
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], //从相册选择
      success(res) {
        console.log(res.tempFilePaths[0])
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success(res) {
            wx.request({
              url: app.globalData.url + '/api/faceConfirm/',
              method: 'POST',
              header: {
                "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId"),
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                base64: res.data,
                openid: wx.getStorageSync('openId'),
                goodsId: that.data.goodsId
              },
              success(res) {
                console.log(res)
                if (res.data.score > 70){
                  console.log('人脸对比成功')
                }
              },
            })
          },
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this
    that.setData({
      goodsId: options.goodsId
    })
    wx.request({
      url: app.globalData.url + '/api/goodsdetail/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      data: {
        goodsId: that.data.goodsId
      },
      method: "GET",
      success(res) {
        res.data['missTime'] = util.formatTime(res.data['missTime'], "y-m-d h:m")
        res.data['upTime'] = util.formatTime(res.data['upTime'], "y-m-d h:m")
        res.data['goodsImg'] = app.globalData.url + res.data['goodsImg']
        that.setData({
          dataList: res.data
        })
        console.log(that.data.dataList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})