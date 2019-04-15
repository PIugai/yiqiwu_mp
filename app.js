App({
  onLaunch: function () {
    const host = this.globalData.host
    console.log('processing to login')
    wx.login({
      success: (res) => {
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            this.globalData.userId = res.data.userId;
          }
        })
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  this.globalData.userInfo = res.userInfo
                  wx.redirectTo({
                    url: '/pages/main/main',
                  })

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
    host: `https://yiqiwu.wogengapp.cn/`,
    version: `api/v1/`
  }
})