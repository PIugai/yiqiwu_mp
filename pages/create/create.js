const app = getApp();
Page({
  data: {

  },

  onShow: function () {
    let self = this;
    const userId = app.globalData.userId;

    wx.request({
      url: app.globalData.host + app.globalData.version + `users/${userId}`,
      // url: `http://localhost:3000/api/v1/users/${userId}`
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
      // url: `http://localhost:3000/api/v1/events`,
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