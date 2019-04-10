// pages/activities/activities.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    let self = this;

    // Toggle below two comment/uncomment until login works
    const userId = 2
    // const userId = app.globalData.userId;

    // Get api data
    wx.request({
      url: `http://yiqiwu.wogengapp.cn/api/v1/users/${userId}`,
      method: 'GET',
      success(u) {
        const bookings = u.data.bookings;
      
        // Update local data
        self.setData({
          bookings: bookings
        });
      }
    });
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

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})