//app.js
App({
  onLaunch: function () {
    const host = 'https://yiqiwu.shanghaiwogeng.com/'
    console.log('processing to login')
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log("getting result from rails api")
            console.log(res)
            this.globalData.userId = res.data.userId;
          }
        })
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  wx.redirectTo({
                    url: '/pages/main/main',
                  })

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                    wx.switchTab({
                      url: '/pages/main/main',
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})