const app = getApp();
Page({
  data: {

  },

  onShow: function () {
    let self = this;
    
    const userId = app.globalData.userId;

    wx.request({
      url: app.globalData.host + app.globalData.version + `users/${userId}`,
      method: 'GET',
      success(u) {
        const bookings = u.data.bookings;
      
        self.setData({
          bookings: bookings
        });
      }
    });
  },

  deleteBooking(e) {
    const data = e.currentTarget.dataset;
    console.log(data)

    wx.request({
      url: app.globalData.host + app.globalData.version + `bookings/${data}`,
      // url: `http://localhost:3000/` + app.globalData.version + `events/${data}`,
      method: 'DELETE',
      success() {
        wx.redirectTo({
          url: '/pages/activities/activities'
        });
      }
    });
  }
})