Page({
  data: {
    lt: "31.232065",
    lg: "121.470645",
    sc: '14'
  },

  onLoad: function (options) {
    let page = this;

    wx.request({
      // url: `http://yiqiwu.wogengapp.cn/api/v1/events/${options.id}`,
      // url: `http://localhost:3000/api/v1/events/${options.id}`,
      url: `http://yiqiwu.wogengapp.cn/api/v1/events/33`,
      method: 'GET',
      success(e) {
        const event = e.data;
        const mk = [e.data]
        console.log(event)
        console.log(mk)
        page.setData({
          event: event,
          mk: mk
        });
      }
    });
  }
})