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
    var phone_test = (/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e.detail.value.phone))
    var studentNo_test = (/^(\d{10})|(\d{10}[T])$/.test(e.detail.value.studentNo))
    var img_test = (that.data.imgList.length !== 0) 
    if (!phone_test && studentNo_test && img_test){
      wx.showToast({
        title: '手机号码有误',
        icon: 'none',
        image: '',
        duration: 1500,
      })
    }
    else if (phone_test && !studentNo_test && img_test){
      wx.showToast({
        title: '学号有误',
        icon:'none',
        duration:1500
      })
    }
    else if (phone_test && studentNo_test && !img_test) {
      wx.showToast({
        title: '未上传图片',
        icon: 'none',
        duration: 1500
      })
    }
    else if (!phone_test && !studentNo_test && img_test){
      wx.showToast({
        title: '学号和手机号有误',
        icon:'none',
        duration:1500
      })
    }
    else if (phone_test && !studentNo_test && !img_test) {
      wx.showToast({
        title: '学号有误且未上传图片',
        icon: 'none',
        duration: 1500
      })
    }
    else if (!phone_test && studentNo_test && !img_test) {
      wx.showToast({
        title: '手机号有误且未上传图片',
        icon: 'none',
        duration: 1500
      })
    }
    else if (!phone_test && !studentNo_test && !img_test) {
      wx.showToast({
        title: '学号和手机号有误且未上传图片',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      //表单校验成功,再验证图片
      that.setData({
        actual_name: e.detail.value.actual_name,
        studentNo: e.detail.value.studentNo,
        phone: e.detail.value.phone
      })
      wx.getFileSystemManager().readFile({
        filePath: that.data.imgList[0], //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success(res){
          wx.request({
            url: app.globalData.url + '/api/form/',
            method:'POST',
            header:{
              "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId"),
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data:{
              base64:res.data
            },
            success(res){
              if (res.data == false){
                //没有人脸
                wx.showToast({
                  title: '图片中没有人脸信息',
                  icon: 'none',
                  duration: 1500
                })
              }
              else{
                wx.uploadFile({
                  url: app.globalData.url + '/api/form',
                  filePath: that.data.imgList[0],
                  name: 'img',
                  header: {
                    "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
                  },
                  formData: {
                    openId: wx.getStorageSync("openId")
                  }
                })
                var submit = new Promise(function (resolve, reject) {
                  wx.uploadFile({
                    url: app.globalData.url + '/api/identity/',
                    filePath: that.data.imgList[0],
                    name: 'img',
                    header: {
                      "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
                    },
                    formData: {
                      actual_name: e.detail.value.actual_name,
                      studentNo: e.detail.value.studentNo,
                      phone: e.detail.value.phone,
                      openId: wx.getStorageSync("openId")
                    },
                    success(res) {
                      resolve(res)

                    }
                  })
                })
                submit.then(res => {
                  wx.showToast({
                    title: '认证成功',
                    duration: 2000
                  })
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/nav/nav',
                    })
                  }, 2000)

                })
              }
            }
          })
        } 
      })
      
      
    }
    
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
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
      content: '确定删除？',
      cancelText: '取消',
      confirmText: '确定',
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