/**
 * Created by zhengguorong on 2016/11/29.
 */
import Vue from 'vue'
import PicElement from 'src/components/PicElement'
import Element from 'src/model/Element'

// 挂载元素并返回已渲染的文本的工具函数
function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el.textContent
}

describe('PicElement', () => {
  const element = new Element()
  it('正确传递prop', () => {
    expect(getRenderedText(PicElement, {
      element: element
    })).toBe('<div>hello</div>')
  })
})
