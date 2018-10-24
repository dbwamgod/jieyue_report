// export default {
// 	getDateYMD(val) {
// 	            var now = new Date(),
// 	                y = now.getFullYear(),
// 	                m = ("0" + (now.getMonth() + 1)).slice(-2),
// 	                d = now.getDate()+val;
// 	                //d = ("0" + now.getDate()).slice(-2)+val;
// 	            return y + "-" + m + "-" + d
// 	},
// }

export default function MapLoader () {   // <-- 原作者这里使用的是module.exports,在webpack环境下可能会导致一个错误
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'http://webapi.amap.com/maps?v=1.3&callback=initAMap&key=yourkey'
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}
