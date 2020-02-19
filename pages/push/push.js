var util = require('../../utils/util.js');
var app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    picker: [],
    time: '',
    date: '',
    modalName: null,
    textareaBValue: '',
    imgList: [],
    index:null,
    modalName: null
  },
  attached() {
    console.log("success")
    var date = new Date()
    var month = date.getMonth() + 1
    var that = this;
    that.setData({
      date: date.getFullYear() + '-' + month + '-' + date.getDate(),
      time: date.getHours() + ':' + date.getMinutes()
    })
    wx.request({
      url: app.globalData.url + '/api/goodstag/',
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      method:'GET',
      success(res){
        for(var i = 0;i < res.data.length;i++){
          that.data.picker.push(res.data[i]['kind'])
        }
        that.setData({
          picker:that.data.picker
        })

      }

    })
    wx.hideLoading()
  },
  methods: {
    formSubmit1: function (e) {
      var that = this;
      //异步封装
      var user =  new Promise(function(resolve,reject){
        wx.request({
          url: app.globalData.url + '/api/user/',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
          },
          method: 'GET',
          data: {
            openId: wx.getStorageSync("openId")
          },
          success(res) {
            resolve(res)
          },
          fail(err){
            reject(err)
          }
        })
      })
      user.then(res=>{
        console.log('成功')
        console.log(res)
        if (res.data.identify == '0') {
          //没有进行实名认证
         
          wx.showModal({
            title: '未认证',
            content: '您未进行认证,请点击确定进行认证',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/mine/identify/identify',
                })
              }
              else {
                return
              }
            }
          })
        }
        else if (res.data.identify == '1') {
          //已经实名认证
          var img_test = (that.data.imgList.length !== 0) 
          if (!that.data.textareaBValue || !that.data.index ||!img_test) {
            wx.showModal({
              title: '信息不完整',
              content: '请填写描述和类别',
            })
          }
          wx.uploadFile({
            url: app.globalData.url + '/api/goods/',
            filePath: that.data.imgList[0],
            name: 'img',
            header: {
              "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
            },
            formData: {
              kind: that.data.picker[that.data.index],
              missTime: that.data.date + ' ' + that.data.time,
              missPlace: that.data.textareaBValue,
              openid_user_id: wx.getStorageSync("openId")
            },
            success(res) {
              wx.showToast({
                title: '物品投放成功',
                duration:1000
              })
              setTimeout(function(){
                wx.navigateTo({
                  url: '/pages/nav/nav',
                })
              },1000)
              
            }
          })

        }
      })
      
      
     
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
        title: '删除照片',
        content: '确定要删除吗？',
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
    PickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      })
    },
    DateChange(e) {
      console.log(e);
      this.setData({
        date: e.detail.value
      })
    },
    TimeChange(e) {
      console.log(e);
      this.setData({
        time: e.detail.value
      })
    },
    textareaBInput(e) {
      console.log(e);
      this.setData({
        textareaBValue: e.detail.value
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
  },
  showModal(e) {

  },
  hideModal(e) {

  },
  showQrcode() {

  },
}
)
