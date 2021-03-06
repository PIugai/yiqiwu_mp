const app = getApp();
Page({

  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 5000,
    sc: '18',
    map: true,
    selectionMade: false,
    tab: true,
    filter: ["Kites", "Dance", "Spinning Top", "Taichi", "Wushu", "Sword Dance", "Chinese Chess", "Water Calligraphy"],
    showFilter: false,
    wxFilter: [
      { activity: "All", active: "", src: "/image/filter-all.png" },
      { activity: "Kites", active: "-inactive", src: "/image/filter-kite.png" },
      { activity: "Dance", active: "-inactive", src: "/image/filter-dance2.png" },
      { activity: "Spinning Top", active: "-inactive", src: "/image/filter-tops.png" },
      { activity: "Taichi", active: "-inactive", src: "/image/filter-taichi.png" },
      { activity: "Wushu", active: "-inactive", src: "/image/filter-wushu.png" },
      { activity: "Sword Dance", active: "-inactive", src: "/image/filter-sword_dance.png" },
      { activity: "Chinese Chess", active: "-inactive", src: "/image/filter-chinese_chess.png" },
      { activity: "Water Calligraphy", active: "-inactive", src: "/image/filter-water_calligraphy.png" }
    ]
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
        events.forEach(function (element) {
          element.date = element.date.slice(0, -6)
        });
        events.forEach((event) => {
          event["height"] = 60;
          event["width"] = 50;
          event["iconPath"] = event.iconPathYellow;
        });

        page.setData({
          events: events,
          filteredEvents: events
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
    const filteredEvents = this.data.filteredEvents;
    let event = filteredEvents.find(filteredEvents => filteredEvents.id === e.markerId)
    const selectionMade = true
    event.iconPath = event.iconPathRed
    for (var i = filteredEvents.length - 1; i >= 0; i--) {
      if (filteredEvents[i].id === event.id) {
        filteredEvents[i].iconPath = event.iconPath;
      } else {
        filteredEvents[i].iconPath = filteredEvents[i].iconPathYellow;
      }
    };

    this.setData({
      event: event,
      selectionMade: selectionMade,
      filteredEvents: filteredEvents
    })

  },

// navigate to show page
  showEvent(e) {
    const event_id = e.currentTarget.dataset.event;

    wx.navigateTo({
      url: `../show/show?id=${event_id}`
    });
  },

  selectEvent(e) {

    this.autoplay = false;
    console.log(this.autoplay);

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
  },

  // filter by activity
  showFilter() {
    let showFilter = this.data.showFilter;
    showFilter = (showFilter === false)
    console.log(showFilter)

    this.setData({
      showFilter: showFilter
    })
  },

  filterActivity(e) {
    // receive bindtap information
    const activity = e.currentTarget.dataset.activity;
    let filter = this.data.filter;

    // build array of filtered events
    if (activity === "All") {
      filter = ["Kites", "Dance", "Spinning Top", "Taichi", "Wushu", "Sword Dance", "Chinese Chess", "Water Calligraphy"];
    } else if ((activity !== "All") && (filter.length === 8)) {
      filter = [activity];
    } else if (filter.includes(activity)) {
      for (var i = filter.length - 1; i >= 0; i--) {
        if (filter[i] === activity) {
          filter.splice(i, 1);
        };
      };
    } else {
      filter.push(activity);
    };

    // change class of filter buttons when selected / deselected
    const wxFilter = this.data.wxFilter;
    for (var i = wxFilter.length - 1; i >= 0; i--) {
      if (activity === "All") {
        wxFilter[i].active = "-inactive";
        wxFilter[0].active = ""
      } else if (filter.includes(wxFilter[i].activity)) {
        wxFilter[i].active = "";
      } else {
        wxFilter[i].active = "-inactive";
      };
    };

    // translate array of filtered events to markers on map
    const events = this.data.events
    const filteredEvents = []
    events.forEach((event) => {
      if (filter.includes(event.activity_type)) {
        filteredEvents.push(event);
      };
    })

    this.setData({
      filter: filter,
      filteredEvents: filteredEvents,
      wxFilter: wxFilter
    })
  }
})