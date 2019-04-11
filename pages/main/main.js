Page({

  data: {
    lt: "31.232065",
    lg: "121.470645",
    sc: '14'
  },

  onLoad: function (options) {
    let page = this;
    wx.request({
      url: "http://yiqiwu.wogengapp.cn/api/v1/events",
      // url: "http://localhost:3000/api/v1/events",
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

    let that = this
    wx.getLocation({    events: null,
      type: 'wgs84', // **1
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({ latitude, longitude, speed, accuracy })
      },
    })
      // wx.chooseLocation({
      //   success: function (res) {
      //     console.log(res)
      //   }
      // }),
      // // wx.openLocation({
      // //   latitude: 30.64242,
      // //   longitude: 104.04311,
      // //   scale: 28
      // // })
  },
  markertap(e) {
    const mk = this.data.mk;
    const event = mk.find(mk => mk.id === e.markerId)

    this.setData({
      event: event
    })
  },

  showEvent(e) {
    const event_id = e.currentTarget.dataset.event;

    wx.navigateTo({
      url: `../show/show?id=${event_id}`
    });
  }
})