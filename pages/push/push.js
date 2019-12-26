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
    formSubmit: function (e) {
      console.log(e)
      var that = this
      that.setData({
        
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
