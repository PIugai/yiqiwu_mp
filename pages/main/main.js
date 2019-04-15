const app = getApp();
Page({

  data: {
    sc: '14',
    map: true,
    selection_blank: true,
    selection_true: false
  },

  onLoad: function (options) {
    let page = this;
    wx.request({
      url: app.globalData.host + app.globalData.version + `events`,
      method: 'GET',
      success(e) {
        const events = e.data.events;
        events.forEach((event) => {
          event["height"] = 60;
          event["width"] = 50;
        });

        page.setData({
          mk: events
        });
      }
    });

    wx.getLocation({    events: null,
      type: 'wgs84', // **1
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        page.setData({
          lt: latitude,
          lg: longitude,
          speed: speed,
          accuracy: accuracy
        })
      },
    })
  },
  
  markertap(e) {
    const mk = this.data.mk;
    const event = mk.find(mk => mk.id === e.markerId)
    const selection_blank = false
    const selection_true = true

    this.setData({
      event: event,
      selection_blank: selection_blank,
      selection_true: selection_true
    })
  },

  showEvent(e) {
    const event_id = e.currentTarget.dataset.event;

    wx.navigateTo({
      url: `../show/show?id=${event_id}`
    });
  },

  selectMap() {
    const map = true;
    const list = false;

    this.setData({
      map: map,
      list: list
    })
  },

  selectList() {
    const map = false;
    const list = true;

    this.setData({
      map: map,
      list: list
    })
  }
})