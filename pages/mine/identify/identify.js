var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    actual_name:'',
    studentNo:'',
    phone:'',
    imgList: [],
    identify:''
  },
  formSubmit: function (e){
    console.log(e);
    var that = this
    console.log(that.data.imgList)
    that.setData({
      actual_name: e.detail.value.actual_name,
      studentNo: e.detail.value.studentNo,
      phone:e.detail.value.phone
    })
    wx.request({
      url: app.globalData.url + '/api/identity/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie":"JSESSIONID="+wx.getStorageSync("sessionId")
      },
      method: 'POST',
      data: {
        actual_name: e.detail.value.actual_name,
        studentNo: e.detail.value.studentNo,
        phone: e.detail.value.phone,
        openId:wx.getStorageSync("openId")
      },
      success(res) {
        console.log("urlok")
        wx.navigateTo({
          url: '/pages/nav/nav',
        })
      }
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.url+'/api/user/',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openId")
      },
      success(res) {
        that.setData({
          identify:res.data.identify
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