const app = getApp();
Page({

  data: {
    imgUrls: [
      'https://www.lbhf.gov.uk/sites/default/files/newsarticle/older-lady-1132px.jpg',
      'https://d1o50x50snmhul.cloudfront.net/wp-content/uploads/2017/03/07101859/gettyimages-510224104.jpg',
      'https://im0-tub-com.yandex.net/i?id=efef2177dad4eb0e3c175ec88163a625&n=13'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 5000,
    sc: '18',
    map: true,
    selectionMade: false
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  onLoad: function (options) {
    let page = this;
    wx.request({
      url: `${app.globalData.host}${app.globalData.version}events`,
      method: 'GET',
      success(e) {
        const events = e.data.events;
        console.log(events)
        events.forEach((event) => {
          event["height"] = 60;
          event["width"] = 50;
        });

        page.setData({
          mk: events
        });
      }
    });

    wx.getLocation({
      events: null,
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
    console.log(mk)
    const event = mk.find(mk => mk.id === e.markerId)
    const selectionMade = true

    this.setData({
      event: event,
      selectionMade: selectionMade
    })

    setTimeout
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