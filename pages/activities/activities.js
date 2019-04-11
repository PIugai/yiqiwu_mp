// pages/activities/activities.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  onShow: function () {
    let self = this;
    
    const userId = app.globalData.userId;

    // Get api data
    wx.request({
      url: `https://yiqiwu.wogengapp.cn/api/v1/users/${userId}`,
      // url: `http://localhost:3000/api/v1/users/${userId}`,
      method: 'GET',
      success(u) {
        const bookings = u.data.bookings;
      
        // Update local data
        self.setData({
          bookings: bookings
        });
      }
    });
  }
})