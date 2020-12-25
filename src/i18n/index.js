import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  // 对象中是语言的 key
  en: {
    // 里面是句子的key
    hello: 'hello'
  },
  cn: {
    hello: '你好'
  }
}

export default new VueI18n({
  // locale 指定当前激活的默认语言
  // messages 指定字典
  locale: 'cn',
  messages
})
