/**
 * Created by zhengguorong on 2016/11/21.
 */
export default class Element {
  constructor (ele = {}) {
    this.type = ele.type || 'pic'
    this.imgSrc = ele.imgSrc || ''
    this.left = ele.left || 0
    this.top = ele.top || 0
    this.width = ele.width || 0
    this.height = ele.height || 0
    this.animatedName = ele.animatedName
    this.duration = ele.duration
    this.delay = ele.delay
    this.playing = false
    this.opacity = ele.opacity || 100
    this.zindex = ele.zindex || 1
    this.transform = ele.transform || 0
    this.text = ele.text || ''
    this.iconKey = ele.iconKey || ''
    this.bg = ele.bg || ''
  }
}
