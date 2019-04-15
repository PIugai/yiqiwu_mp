const app = getApp();
Page({
  data: {

  },

  onShow: function () {
    let self = this;
    
    const userId = app.globalData.userId;

    wx.request({
      url: app.globalData.host + app.globalData.version + `users/${userId}`,
      // url: `http://localhost:3000/api/v1/users/${userId}`,
      method: 'GET',
      success(u) {
        const bookings = u.data.bookings;
      
        self.setData({
          bookings: bookings
        });
      }
    });
  }
})