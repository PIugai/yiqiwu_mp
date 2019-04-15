const app = getApp();
Page({

  data: {
    sc: '18',
    map: true,
    selectionMade: false
  },

  onLoad: function (options) {
    let page = this;
    wx.request({
      url: `${app.globalData.host}${app.globalData.version}events`,
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
      type: 'wgs84', 
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        page.setData({
          lt: 31.222142320234745,
          lg: 121.44583483234406,
          // lt: latitude,
          // lg: longitude,
          speed: speed,
          accuracy: accuracy
        })
      },
    })
  },
  
  // preview event when pin is tapped
  markertap(e) {
    const mk = this.data.mk;
    const event = mk.find(mk => mk.id === e.markerId)
    const selectionMade = true

    this.setData({
      event: event,
      selectionMade: selectionMade
    })
  },

// navigate to show page
  showEvent(e) {
    const event_id = e.currentTarget.dataset.event;

    wx.navigateTo({
      url: `../show/show?id=${event_id}`
    });
  },

// toggle between map view and list view
  selectMap() {
    const map = true;

    this.setData({
      map: map
    })
  },

  selectList() {
    const map = false;

    this.setData({
      map: map
    })
  }
})