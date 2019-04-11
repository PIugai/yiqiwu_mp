const app = getApp();
Page({
  data: {
    sc: '14'
  },

  onLoad: function (options) {
    let page = this;

    wx.request({
      url: `http://yiqiwu.wogengapp.cn/api/v1/events/${options.id}`,
      // url: `http://localhost:3000/api/v1/events/${options.id}`,
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
      url: `https://yiqiwu.wogengapp.cn/api/v1/users/${app.globalData.userId}/bookings`,
       // url: `http://localhost:3000/api/v1/users/${app.globalData.userId}/bookings`,
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