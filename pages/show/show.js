const app = getApp();
Page({
  data: {
    sc: '14'
  },

  onLoad: function (options) {
    let page = this;

    wx.request({
      url: app.globalData.host + app.globalData.version + `events/${options.id}`,
      method: 'GET',
      success(e) {
        let event = e.data;
        event["height"] = 60;
        event["width"] = 50;
        const mk = [e.data];
        const lt = event.latitude;
        const lg = event.longitude;
        page.setData({
          event: event,
          mk: mk,
          lt: lt,
          lg: lg
        });
      }
    });
  },

  bindSubmit(e) {
    let booking = {
      user_id: app.globalData.userId,
      event_id: this.data.event.id
    }
    wx.request({
      url: app.globalData.host + app.globalData.version + `users/${app.globalData.userId}/bookings`,
      method: 'POST',
      data: booking,
      success() {
        wx.switchTab({
          url: '/pages/activities/activities'
        });
      }
    })
  }
})