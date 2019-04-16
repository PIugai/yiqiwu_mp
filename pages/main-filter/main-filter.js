const app = getApp();
Page({
  data: {
    sc: '18',
    map: true,
    selectionMade: false,
    filter: ["Kites", "Dance", "Spinning Top", "Taichi", "Wushu", "Sword Dance", "Chinese Chess", "Water Calligraphy"],
    showFilter: false,
    // wxFilter: [
    //   { key: "all", activity: "All", active: "button-filter-inactive" },
    //   { key: "kites", activity: "Kites", active: "button-filter-inactive", src: "/image/filter-kite.png" },
    //   { key: "dance", activity: "Dance", active: "button-filter-inactive", src: "/image/filter-dance2.png" },
    //   { key: "spinningTop", activity: "Spinning Top", active: "button-filter-inactive", src: "/image/filter-tops.png" },
    //   { key: "taichi", activity: "Taichi", active: "button-filter-inactive", src: "/image/filter-taichi.png" },
    //   { key: "wushu", activity: "Wushu", active: "button-filter-inactive", src: "/image/filter-wushu.png" },
    //   { key: "swordDance", activity: "Sword Dance", active: "button-filter-inactive", src: "/image/filter-sword_dance.png" },
    //   { key: "chineseChess", activity: "Chinese Chess", active: "button-filter-inactive", src: "/image/filter-chinese_chess.png" },
    //   { key: "waterCalligraphy", activity: "Water Calligraphy", active: "button-filter-inactive", src: "/image/filter-water_calligraphy.png" }
    // ],
    // FIX THIS CODE
    colouredAll: true,
    colouredKites: false,
    colouredDance: false,
    colouredSpinning: false,
    colouredTaichi: false,
    colouredWushu: false,
    colouredSword: false,
    colouredChinese: false,
    colouredWater: false,
    allClass: "button-filter",
    kitesClass: "button-filter-inactive",
    danceClass: "button-filter-inactive",
    spinningClass: "button-filter-inactive",
    taichiClass: "button-filter-inactive",
    wushuClass: "button-filter-inactive",
    swordClass: "button-filter-inactive",
    chineseClass: "button-filter-inactive",
    waterClass: "button-filter-inactive",
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
    const events = this.data.events;
    const event = events.find(events => events.id === e.markerId)
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
  },

  // filter by activity
  showFilter() {
    let showFilter = this.data.showFilter;
    showFilter = (showFilter === false)

    this.setData({
      showFilter: showFilter
    })
  },

  filterActivity(e) {
    const activity = e.currentTarget.dataset.activity;
    let filter = this.data.filter;
    
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

    // if filter.includes(activity)

    // FIX THIS CODE
    let colouredAll = this.data.colouredAll;
    let colouredKites = this.data.colouredKites;
    let colouredDance = this.data.colouredDance;
    let colouredSpinning = this.data.colouredSpinning;
    let colouredTaichi = this.data.colouredTaichi;
    let colouredWushu = this.data.colouredWushu;
    let colouredSword = this.data.colouredSword;
    let colouredChinese = this.data.colouredChinese;
    let colouredWater = this.data.colouredWater;

    let allClass = this.data.allClass;
    let kitesClass = this.data.kitesClass;
    let danceClass = this.data.danceClass;
    let spinningClass = this.data.spinningClass;
    let taichiClass = this.data.taichiClass;
    let wushuClass = this.data.wushuClass;
    let swordClass = this.data.swordClass;
    let chineseClass = this.data.chineseClass;
    let waterClass = this.data.waterClass;

    if (activity === "All") {
      colouredAll = (colouredAll === false);
      kitesClass = "button-filter-inactive";
      danceClass = "button-filter-inactive";
      spinningClass = "button-filter-inactive";
      taichiClass = "button-filter-inactive";
      wushuClass = "button-filter-inactive";
      swordClass = "button-filter-inactive";
      chineseClass = "button-filter-inactive";
      waterClass = "button-filter-inactive";
      if (colouredAll === true) {
        allClass = "button-filter";
      } else {
        allClass = "button-filter-inactive";
      };
    };
    if (activity === "Kites") {
      colouredKites = (colouredKites === false);
      allClass = "button-filter-inactive";
      if (colouredKites === true) {
        kitesClass = "button-filter";
      } else {
        kitesClass = "button-filter-inactive";
      };
    };
    if (activity === "Dance") {
      colouredDance = (colouredDance === false);
      allClass = "button-filter-inactive";
      if (colouredDance === true) {
        danceClass = "button-filter";
      } else {
        danceClass = "button-filter-inactive";
      };
    };
    if (activity === "Spinning Top") {
      colouredSpinning = (colouredSpinning === false);
      allClass = "button-filter-inactive";
      if (colouredSpinning === true) {
        spinningClass = "button-filter";
      } else {
        spinningClass = "button-filter-inactive";
      };
    };
    if (activity === "Taichi") {
      colouredTaichi = (colouredTaichi === false);
      allClass = "button-filter-inactive";
      if (colouredTaichi === true) {
        taichiClass = "button-filter";
      } else {
        taichiClass = "button-filter-inactive";
      };
    };
    if (activity === "Wushu") {
      colouredWushu = (colouredWushu === false);
      allClass = "button-filter-inactive";
      if (colouredWushu === true) {
        wushuClass = "button-filter";
      } else {
        wushuClass = "button-filter-inactive";
      };
    };
    if (activity === "Sword Dance") {
      colouredSword = (colouredSword === false);
      allClass = "button-filter-inactive";
      if (colouredSword === true) {
        swordClass = "button-filter";
      } else {
        swordClass = "button-filter-inactive";
      };
    };
    if (activity === "Chinese Chess") {
      colouredChinese = (colouredChinese === false);
      allClass = "button-filter-inactive";
      if (colouredChinese === true) {
        chineseClass = "button-filter";
      } else {
        chineseClass = "button-filter-inactive";
      };
    };
    if (activity === "Water Calligraphy") {
      colouredWater = (colouredWater === false);
      allClass = "button-filter-inactive";
      if (colouredWater === true) {
        waterClass = "button-filter";
      } else {
        waterClass = "button-filter-inactive";
      };
    };

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
      colouredAll: colouredAll,
      allClass: allClass,
      colouredKites: colouredKites,
      kitesClass: kitesClass,
      colouredDance: colouredDance,
      danceClass: danceClass,
      colouredSpinning: colouredSpinning,
      spinningClass: spinningClass,
      colouredTaichi: colouredTaichi,
      taichiClass: taichiClass,
      colouredWushu: colouredWushu,
      wushuClass: wushuClass,
      colouredSword: colouredSword,
      swordClass: swordClass,
      colouredChinese: colouredChinese,
      chineseClass: chineseClass,
      colouredWater: colouredWater,
      waterClass: waterClass
    })
  }
})