// pages/create/create.js
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
    const userId = app.globalData.userId;
    // const userId = 1103;

    // Get api data
    wx.request({
      url: `http://yiqiwu.wogengapp.cn/api/v1/users/${userId}`,
      // url: `http://localhost:3000/api/v1/users/${userId}`
      method: 'GET',
      success(u) {
        const events = u.data.events;

        // Update local data
        self.setData({
          events: events
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

  },

  // New Band Submission
  bindSubmit: function (e) {

    wx.showToast({
      title: 'Submitting...',
      icon: 'loading',
      duration: 1500
    });

    console.log(e);

    const app = getApp();

    var activity_type = e.detail.value.activity_type;
    var description = e.detail.value.description;
    var end_time = e.detail.value.end_time;
    var start_time = e.detail.value.start_time;
    var location = e.detail.value.location;
    var user_id = app.globalData.userId;

    // Create new event/activity
    var event = {
      "activity_type": activity_type,
      "description": description,
      "end_time": end_time,
      "start_time": start_time,
      "location": location,
      "user_id": user_id
    };

    console.log(33, event);
    wx.request({
      url: 'https://yiqiwu.wogengapp.cn/api/v1/events',
      // url: `http://localhost:3000/api/v1/events`,
      method: 'POST',
      data: event,
      success(res) {
        console.log(res)
        wx.redirectTo({
          url: '/pages/create/create',
        })
      }
    })
    
    // set data on bands page and show
    // wx.navigateTo({
    //   url: '/pages/bands/bands'
    // });
  }
})