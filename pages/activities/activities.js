const app = getApp();
Page({
  data: {

  },

  onShow: function () {
    let self = this;
    
    const userId = app.globalData.userId;

    wx.request({
      url: `${app.globalData.host}${app.globalData.version}users/${userId}`,
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

    wx.request({
      url: `${app.globalData.host}${app.globalData.version}bookings/${data.booking}?event_id=${data.event}`,
      method: 'DELETE',
      success() {
        wx.reLaunch({
          url: '/pages/activities/activities'
        });
      }
    });
  }
})