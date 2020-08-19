//收藏排行前10，长按通知进入（iOS13以下通知中心不支持）
let url = $request.url
let regex = /vmid=(\d*)/
let vmid = regex.exec(url)
let mid = vmid[1]
let api = `https://api.bilibili.com/x/space/arc/search?pn=1&ps=10&order=stow&keyword=&mid=${mid}`
$httpClient.get(api, (error, response, body) => {
  if (error) {
    $done({})
  }
  else {
    console.log(body)
    body = JSON.parse(body)
    let info = ""
    body['data']['list']['vlist'].forEach((element, index) => {
      index++
      let scheme = `bilibili://av/${element['aid']}`
      info += index + ": " + element['title'] + "\n" + scheme + "\n"
    })
    $notification.post('', '', info)
    $done({})
  }
})
