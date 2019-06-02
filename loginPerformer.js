var urlToGetNextUrl = "baidu.com";
var urlToGetSessionid =
  "192.168.43.183:8001/?userip=100.64.47.23&wlanacname&nasip=59.175.245.222&usermac=8c-85-90-7c-99-28 ";
var urlToLogin =
  "192.168.43.183:8001/wispr_auth.jsp?sessionid=108974259&aidcauthtype=0&usermac=8c-85-90-7c-99-28&wlanacname=059.175.245.222&wlanuserip=100.64.47.23";
var timeStamp = "";

const service = (phone, cipherForToday) => {
  threads.start(function() {
    ui.run(() => {
      ui.progress.setProgress(0);
    });
    var code = 0;
    http.get(
      urlToGetNextUrl,
      {
        headers: {
          "User-Agent": "CDMA+WLAN(Maod)",
        },
      },
      function handleNextUrlRes(res) {
        code = 1;
        let url = res.url;
        if (url == "http://baidu.com/") {
          alert(
            "提示",
            "你已连接互联网！请尝试：\n1. 关闭数据流量\n2. 连接需要联网的路由器",
          );
        } else {
          code = 2;
          urlToGetSessionid = res.url.toString();
          ui.run(() => {
            ui.progress.setProgress(33);
          });
        }
      },
    );
    sleep(2000);
    if (code === 0) {
      alert(
        "提示",
        "无法连接电信服务器！请检查：\n1. 网线是否插在路由器的 WAN 口和 AP 的 LAN 口\n2. 尝试把网线直连 AP 的 LAN 和 电脑，电脑是否能够获取到 IP（表现可能是弹出电信的网页）\n3. 以上都无效请联系电信检查线路",
      );
    } else if (code === 2) {
      http.get(
        urlToGetSessionid,
        {
          headers: {
            "User-Agent": "CDMA+WLAN(Maod)",
          },
        },
        function handleSessionRes(res) {
          let body = res.body.string();
          urlToLogin = body.split("<![CDATA[")[1].split("]]")[0];
          timeStamp = body
            .split("<AidcAuthAttr1>")[1]
            .split("</AidcAuthAttr1>")[0];
          ui.run(() => {
            ui.progress.setProgress(66);
          });
        },
      );
      sleep(2000);
      http.request(
        urlToLogin,
        {
          headers: {
            "User-Agent": "CDMA+WLAN(Maod)",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          body:
            "UserName=%21%5EAdcm0" +
            phone +
            "&Password=" +
            cipherForToday +
            "&AidcAuthAttr1=" +
            timeStamp +
            "&AidcAuthAttr3=keuyGQlK&AidcAuthAttr4=zrDgXllCChyJHjwkcRwhygP0&AidcAuthAttr5=kfe1GQhXdGqOFDteego5zwP9IsNoxX7djTWspPrYm1A%3D%3D&AidcAuthAttr6=5Ia4cQhDfXSFbTtUDGY1yx8%3D&AidcAuthAttr7=6ZWiVlwdNiHMXCpOagQv2w2MQs0ohTWJnTu8qK5OibhCydTpTxkI88wadKPWby%2F2PKCVaZUxglbBs96%2FtmLE89M8AJ6y28o7qolpFep%2FcYFFRLd7H4MAMrDUMRO0F%2B93jh14fiAZYmtk9hdp%2BZ5w%2BjMQUoV4TCtM9VJ07XQwxlMVg%2F0YKrS1s3hXAstdQ1fvdSn3nAVGgdxc%2BJQDrQ%3D%3D&AidcAuthAttr8=jPSyBQxVaXWTQWUaakluj06scJ98nyqCyX7y%2FLUk1OkXiNjkXhVGvJhyTuLDaCPhK%2FOFJttlxxiVqNKupnDXkp9%2BR9D9j8p2j5h8FOxoatMaGu0oRdk%3D&AidcAuthAttr15=kfKxBwE%3D&AidcAuthAttr22=kA%3D%3D&AidcAuthAttr23=07DhVF0KNw%3D%3D&createAuthorFlag=0",
        },
        function handleSessionRes(res) {
          toast(
            res.body
              .string()
              .split("<ReplyMessage>")[1]
              .split("</ReplyMessage>")[0],
          );
          ui.run(() => {
            ui.progress.setProgress(100);
          });
        },
      );
    }
  });
};

module.exports = service;
