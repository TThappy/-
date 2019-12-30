var app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    picker: ['校园卡', '钥匙', '书籍','包','证件','手机','其它'],
    time: '12:00',
    date: '2018-12-25',
    modalName: null,
    textareaBValue: '',
    imgList: [],
    index:null
  },
  attached() {
    console.log("success")
    var that = this;
    wx.hideLoading()
  },
  methods: {
    randomString:function(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for(i = 0; i<len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　     }
　　return pwd;
    },
    formSubmit1: function (e) {
      var that = this;
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
          console.log("物品创建成功")
          wx.navigateTo({
            url: '/pages/nav/nav',
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
    }
  },
  showModal(e) {

  },
  hideModal(e) {

  },
  showQrcode() {

  },
}
)
