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
    ]
  },

  // binding the activity selector data
  bindPickerChange: function (e) {
    console.log('picker sent selection change, the value brought is', e.detail.value, e)
    this.setData({
      index: e.detail.value
    })
  },

  onShow: function () {
    let self = this;
    const userId = app.globalData.userId;

    wx.request({
      url: app.globalData.host + app.globalData.version + `users/${userId}`,
      method: 'GET',
      success(u) {
        const events = u.data.events;

        self.setData({
          events: events
        });
      }
    });
  },

  // New Band Submission
  bindSubmit: function (e) {

    wx.showToast({
      title: 'Submitting...',
      icon: 'loading',
      duration: 1500
    });

    console.log(e);

    const app = getApp();

    var activity_type = e.detail.value.activity_type;
    var description = e.detail.value.description;
    var end_time = e.detail.value.end_time;
    var start_time = e.detail.value.start_time;
    var location = e.detail.value.location;
    var user_id = app.globalData.userId;

    // Create new event/activity
    var event = {
      "activity_type": activity_type,
      "description": description,
      "end_time": end_time,
      "start_time": start_time,
      "location": location,
      "user_id": user_id
    };

    console.log(33, event);
    wx.request({
      url: app.globalData.host + app.globalData.version + `events`,
      method: 'POST',
      data: event,
      success(res) {
        console.log(res)
        wx.reLaunch({
          url: '/pages/create/create',
        })
      }
    })
  }
})