const app = getApp();
Page({
  data: {
    array: ["Kites", "Dance", "Spinning Top", "Taichi", "Wushu", "Sword Dance", "Chinese Chess", "Water Calligraphy"],
    objectArray: [
      {
        id: 0,
        name: 'Kites'
      },
      {
        id: 1,
        name: 'Dance'
      },
      {
        id: 2,
        name: 'Spinning Top'
      },
      {
        id: 3,
        name: 'Taichi'
      },
      {
        id: 4,
        name: 'Wushu'
      },
       {
        id: 5,
        name: 'Sword Dance'
      },
      {
        id: 6,
        name: 'Chinese Chess'
      },
      {
        id: 7,
        name: 'Water Calligraphy'
      }
    ],
    index: 1
    // date: '2016-09-01',
    // time: '12:01'
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      start_time_only: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      end_time_only: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindOnTouchStart: function () {
    let page = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        if (res.name === "") {
          var name = "Custom location";
        } else {
          var name = res.name;
        };
        // var name = res.name;
        var address = res.address;
        page.setData({
          name: name,
          latitude: latitude,
          longitude: longitude
        })
      }
    })
  },
  
  getBookings: function () {
    let self = this;
    const userId = app.globalData.userId;

    wx.request({
      url: `${app.globalData.host}${app.globalData.version}users/${userId}`,
      method: 'GET',
      success(u) {
        const events = u.data.events;
        events.forEach(function (element) {
          element.date = element.date.slice(0, -6)
        });
        self.setData({
          events: events
        });
      }
    });
  },

  onLoad: function () {
    this.getBookings();
  },

  onShow: function () {
    this.getBookings();
  },

  // New Band Submission
  bindSubmit: function (e) {

    wx.showToast({
      title: 'Submitting...',
      icon: 'loading',
      duration: 1500
    });

    const app = getApp();

    var activity_type = e.detail.value.activity_type;
    var description = e.detail.value.description;
    var capacity = e.detail.value.capacity;
    var spots_filled = 0;
    var end_time = e.detail.value.date_only + " " + e.detail.value.end_time_only;
    var start_time = e.detail.value.date_only + " " + e.detail.value.start_time_only;
    var location = e.detail.value.location;
    if (e.detail.value.location==="") {
      var location = "custom location";
    } else {
      var location = e.detail.value.location;
    };
    var user_id = app.globalData.userId;
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;

    // Create new event/activity
    var photoArray = [
      "http://lc-odcccsle.cn-n1.lcfile.com/398e4917a0a7040b0954/rm7.jpg",
      "http://lc-OdCCcsLE.cn-n1.lcfile.com/84a06e45fb6b09ea1989/jing3.jpg",
      "http://lc-OdCCcsLE.cn-n1.lcfile.com/ce4b9e9c30044869fee4/jing4.jpg",
      "http://lc-OdCCcsLE.cn-n1.lcfile.com/2b06abe54ac0922fb8c8/zh5.jpg",
      "http://lc-OdCCcsLE.cn-n1.lcfile.com/2d91a7b7b04b0b8aaea9/zh1.jpg"
    ];
    var randomIndex = Math.floor(Math.random() * photoArray.length);
    var randomPhoto = photoArray[randomIndex];
    console.log("print the random photo", randomPhoto);
    var event = {
      "activity_type": activity_type,
      "description": description,
      "capacity": capacity,
      "spots_filled": spots_filled,
      "end_time": end_time,
      "start_time": start_time,
      "location": location,
      "user_id": user_id,
      "latitude": latitude,
      "longitude": longitude,
      "photo": randomPhoto
    };

    wx.request({
      url: `${app.globalData.host}${app.globalData.version}events`,
      method: 'POST',
      data: event,
      success(res) {
        wx.reLaunch({
          url: '/pages/create/create',
        })
      }
    })
  },

  deleteEvent(e) {
    const data = e.currentTarget.dataset;
    console.log(data)

    wx.request({
      url: `${app.globalData.host}${app.globalData.version}events/${data.event}`,
      method: 'DELETE',
      success() {
        wx.reLaunch({
          url: '/pages/create/create'
        });
      }
    });
  }
})