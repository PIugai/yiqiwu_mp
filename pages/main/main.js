// pages/main/main.js
Page({

  /**
   * Page initial data
   */
  data: {
    lt: "31.232065",
    lg: "121.470645",
    sc: '14',
    mk: [ 
      {
      iconPath: "/image/wushu.png", // **1
      id: 0,
      latitude: 31.219614,
      longitude: 121.443877,
      width: 40,
      height: 40,
      cardImg : '/image/wushu-card.png',
        callout: { content: "Wushu", fontSize: 15, color: "#000000", padding: 10 }
    },
      {
        iconPath: "/image/toulou.png", // **1
        id: 1,
        latitude: 31.218000,
        longitude: 121.4800,
        width: 40,
        height: 40,
        cardImg: '/image/tops-card.png',
        callout: { content: "Spinning tops", fontSize: 15, color: "#000000", padding: 10 }
      },
      {
        iconPath: "/image/kite.png", // **1
        id: 2,
        latitude: 31.24000,
        longitude: 121.4800,
        width: 40,
        height: 40,
        cardImg: '/image/kites-card.png',
        callout: { content: "Kites", fontSize: 15, color: "#000000", padding: 10 }
      }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    // wx.getLocation({
    //   type: 'wgs84', // **1
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //     that.setData({ latitude, longitude, speed, accuracy })
    //   },
    // }),
      // wx.chooseLocation({
      //   success: function (res) {
      //     console.log(res)
      //   }
      // }),
      // wx.openLocation({
      //   latitude: 30.64242,
      //   longitude: 104.04311,
      //   scale: 28
      // })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },
  markertap(e) {
    console.log(e.markerId);
    let cardImg;
    let mk = this.data.mk;
    let mkImg = mk[e.markerId].cardImg
    console.log(mkImg);
    this.setData({
      cardImg: mkImg
    })


  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})