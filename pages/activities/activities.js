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
    console.log(e.currentTarget.dataset)

    wx.request({
      url: app.globalData.host + app.globalData.version + `bookings/${data.booking}`,
      // url: `http://localhost:3000/` + app.globalData.version + `bookings/${data.booking}`,
      method: 'DELETE',
      success() {
        wx.reLaunch({
          url: '/pages/activities/activities'
        });
      }
    });
  }
})