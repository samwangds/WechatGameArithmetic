let instance
const version = wx.getSystemInfoSync().SDKVersion

/**
 * 版本兼容
 */
export default class VersionCompat {
  constructor() {
    if ( instance )
      return instance

    instance = this 
  }

  getMenuButtonBoundingClientRect(){
    console.log(version)
    if (this.geVersion('2.3.0')) {
     return wx.getMenuButtonBoundingClientRect()
    } else {
     return undefined 
    }
  }

  setUserCloudStorage(object) {
    if (this.geVersion('1.9.92')){
      wx.setUserCloudStorage(object)
    }else{
      object.fail()
      object.complete()
    }
  }

  getUserCloudStorage(object) {
    if (this.geVersion('1.9.92')) {
      wx.getUserCloudStorage(object)
    } else {
      object.fail()
      object.complete()
    }
  }

// great or equals version
  geVersion(targerVersion) {
    return this.compareVersion(version, targerVersion) >= 0
  }


  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  }
 



  
 
}
