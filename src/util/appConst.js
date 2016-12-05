/**
 * Created by huangxueying on 2016/11/30.
 */
const envs = {
  dev: {
    mall: 'http://localhost:3000',
    rogon: 'http://tmallapi.bluemoon.com.cn/moonRegion',
    wash: 'http://tmallapi.bluemoon.com.cn/washMall'
  },
  mock: {
    mall: 'http://tmallapi.bluemoon.com.cn/moonMall-gateway',
    rogon: 'http://tmallapi.bluemoon.com.cn/moonRegion',
    wash: 'http://192.168.236.1:9002/mockjsdata/33/washMall'
  },
  prod: {
    mall: '',
    rogon: '',
    wash: ''
  }
}

const env = 'dev'

export const APP_MALL_API_URL = envs[env].mall
export const APP_ROGON_API_URL = envs[env].rogon
export const APP_WASH_API_URL = envs[env].wash
