# anti-feiyoung-app
ANTI 系列，客户端。采用 AutoJS 生成，不涉及密码，密码来自抓包。

> 首先说明已经无法使用了
> 原因有两个：
> 1. 自动抓包服务端已经🈚了
> 2. 程序中某些参数已经过时

主要有参考价值的内容就是一个登录流程。
1. 向 `baidu.com` 发送请求，`user-agent` 比较[特殊]()
    - 有互联网访问时获得正常百度网页
    - 在校园网封锁下（自动重定），就会得到 `登陆用的链接`、 `登陆用的时间戳`
2. 向 `登陆用的链接` 发送请求
    ```js
    {
      headers: {
        "User-Agent": "CDMA+WLAN(Maod)",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body:
        "UserName=%21%5EAdcm0" +
        phone +
        "&Password=" +
        cipherForToday +
        "&AidcAuthAttr1=" +
        timeStamp +
        "&AidcAuthAttr3=keuyGQlK&AidcAuthAttr4=zrDgXllCChyJHjwkcRwhygP0&AidcAuthAttr5=kfe1GQhXdGqOFDteego5zwP9IsNoxX7djTWspPrYm1A%3D%3D&AidcAuthAttr6=5Ia4cQhDfXSFbTtUDGY1yx8%3D&AidcAuthAttr7=6ZWiVlwdNiHMXCpOagQv2w2MQs0ohTWJnTu8qK5OibhCydTpTxkI88wadKPWby%2F2PKCVaZUxglbBs96%2FtmLE89M8AJ6y28o7qolpFep%2FcYFFRLd7H4MAMrDUMRO0F%2B93jh14fiAZYmtk9hdp%2BZ5w%2BjMQUoV4TCtM9VJ07XQwxlMVg%2F0YKrS1s3hXAstdQ1fvdSn3nAVGgdxc%2BJQDrQ%3D%3D&AidcAuthAttr8=jPSyBQxVaXWTQWUaakluj06scJ98nyqCyX7y%2FLUk1OkXiNjkXhVGvJhyTuLDaCPhK%2FOFJttlxxiVqNKupnDXkp9%2BR9D9j8p2j5h8FOxoatMaGu0oRdk%3D&AidcAuthAttr15=kfKxBwE%3D&AidcAuthAttr22=kA%3D%3D&AidcAuthAttr23=07DhVF0KNw%3D%3D&createAuthorFlag=0"
    }
    ```
3. 最后得到结果
