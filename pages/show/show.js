const app = getApp();
Page({
  data: {
    lt: "31.232065",
    lg: "121.470645",
    sc: '14'
  },

  onLoad: function (options) {
    let page = this;

    wx.request({
      url: `http://yiqiwu.wogengapp.cn/api/v1/events/${options.id}`,
      // url: `http://localhost:3000/api/v1/events/${options.id}`,
      method: 'GET',
      success(e) {
        const event = e.data;
        const mk = [e.data]
        page.setData({
          event: event,
          mk: mk
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
      url: `http://yiqiwu.wogengapp.cn/api/v1/users/${app.globalData.userId}/bookings`,
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