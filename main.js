"ui";

var color = "#4390E6";
const urlGetNum = "l24g972742.zicp.vip:16358/numInQuery";
const urlPostAccount = "l24g972742.zicp.vip:16358/account";
const loginPerformer = require("./loginPerformer");

ui.layout(
  <frame>
    <vertical>
      <appbar>
        <toolbar id="toolbar" title="Anti Feiyoung" bg="#4390E6" />
        <tabs id="tabs" bg="#4390E6" />
      </appbar>
      <viewpager id="viewpager">
        <vertical>
          <text text="注意" textSize="20sp" margin="20 20" textColor="black" />
          <text
            text="1. 🌟如果点击按钮无反应，多次点按会导致程序卡死，请在设置中设置允许显示悬浮窗！具体方法自行百度，这个问题会在后续版本修复。"
            textSize="16sp"
            margin="40 5"
            textColor="black"
          />
          <text
            text="2. 🌟一键发射【悬浮窗权限】----一键让路由器有网"
            textSize="16sp"
            margin="40 5"
            textColor="black"
          />
          <text
            text="3. 🌟获取燃料【悬浮窗权限】----提交账号密码，再次提交可以查看队列位置和获取并保存专用密码"
            textSize="16sp"
            margin="40 5"
            textColor="black"
          />
          <text
            text="->  查询队列长度【悬浮窗权限】----查询总共有多少人在排队"
            textSize="16sp"
            margin="40 5"
          />
          <text
            text="4. 🌟高级模式【悬浮窗权限】----一些手动操作"
            textSize="16sp"
            margin="40 5"
            textColor="black"
          />
          <text
            text="->  登陆【悬浮窗权限】----通过直拨密码和账号登陆"
            textSize="16sp"
            margin="40 5"
          />
          <text
            text="->  手动导入 ----通过剪贴板导入密码"
            textSize="16sp"
            margin="40 5"
          />
        </vertical>
        <frame>
          <img
            id="launch"
            w="100"
            h="100"
            layout_gravity="center"
            src="file://./src/rocket.png"
          />
          <horizontal gravity="center" marginTop="300">
            <progressbar
              id="progress"
              w="300"
              style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"
            />
          </horizontal>
        </frame>
        <frame>
          <button
            id="refreshNum"
            w="*"
            h="50"
            style="Widget.AppCompat.Button.Colored"
            text="查询队列长度"
            bg="#4390E6"
            textColor="#ffffff"
            margin="10 10 10 10"
          />
          <horizontal margin="50 200 50 10">
            <text text="手机号" />
            <input w="200" id="phone" singleLine="true" />
          </horizontal>
          <horizontal margin="50 300 50 10">
            <text text="宽带密码" />
            <input w="200" id="password" singleLine="true" />
          </horizontal>
          <button
            id="postData"
            w="*"
            h="50"
            style="Widget.AppCompat.Button.Colored"
            text="提交"
            bg="#4390E6"
            textColor="#ffffff"
            margin="10 400 10 10"
          />
        </frame>
        <frame>
          <horizontal margin="50 100 50 10">
            <text text="手机号" />
            <input w="200" id="phoneLoginManually" singleLine="true" />
          </horizontal>
          <horizontal margin="50 200 50 10">
            <text text="直拨密码" />
            <input w="200" id="passwordLoginManually" singleLine="true" />
          </horizontal>
          <button
            id="launchManually"
            w="*"
            h="50"
            style="Widget.AppCompat.Button.Colored"
            text="登陆"
            bg="#4390E6"
            textColor="#ffffff"
            margin="10 300 10 10"
          />
          <button
            id="loadManually"
            w="*"
            h="50"
            style="Widget.AppCompat.Button.Borderless.Colored"
            text="手动导入"
            margin="10 420 10 10"
          />
          <horizontal gravity="center" marginTop="300">
            <progressbar
              id="progress"
              w="300"
              style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"
              loyout_gravity="center"
            />
          </horizontal>
        </frame>
        <vertical>
          <text
            text="版本发布"
            textSize="20sp"
            margin="20 20"
            textColor="black"
          />
          <button
            id="download"
            gravity="left"
            h="70"
            style="Widget.AppCompat.Button.Borderless.Colored"
            text="以微云文件夹形式发布，前往选择最新版本安装"
            textSize="16sp"
            margin="40 0"
          />
          <text text="关于" textSize="20sp" margin="20 0" textColor="black" />
          <text id="about" margin="40 10" />
          <button
            id="sendEmail"
            gravity="left"
            h="50"
            style="Widget.AppCompat.Button.Borderless.Colored"
            text="发送邮件"
            textSize="16sp"
            margin="40 0"
          />
          <text
            text="请开发者爆肝"
            textSize="20sp"
            margin="20 0"
            textColor="black"
          />
          <img
            src="file://./src/coffee.png"
            margin="20 0"
            scaleType="centerInside"
          />
        </vertical>
      </viewpager>
    </vertical>
  </frame>,
);

/**
 * Init Data
 */

/**
 * Define UI
 */

ui.about.setText(
  "1. 本软件仅供测试使用\n2. 本软件由Younntone公益开发，如果你通过购买获得，说明你被坑了！\n3. 本软件不提供任何使用保障，有建议或者BUG反馈可以发邮件给开发者。\n",
);

activity.setSupportActionBar(ui.toolbar);

ui.statusBarColor(color);

ui.viewpager.setTitles(["说明", "一键发射", "获取燃料", "高级模式", "关于"]);

ui.tabs.setupWithViewPager(ui.viewpager);

/**
 * Button Action
 */

// Check version
ui.download.click(function() {
  app.openUrl("https://share.weiyun.com/5Zg68Nc");
});

// Send email
ui.sendEmail.click(function() {
  app.sendEmail({
    email: "younntone@gmail.com",
    subject: "Anti Feiyoung APP 反馈/建议",
  });
});

// * Launch
ui.launch.click(function() {
  let date = new Date();
  let account = storages.create("account");
  let ciphers = account.get("ciphers");
  let phone = account.get("phone");
  if (ciphers) {
    loginPerformer(phone, ciphers[date.getDate()] - 1);
  } else {
    alert("提示", "油箱空空，请前往获取燃料！");
  }
});

// * Get query lenght
ui.refreshNum.click(function() {
  let code = 0;
  let request = threads.start(function() {
    let res = http.get(urlGetNum);
    let result = res.body.json();
    code = res.statusCode;
    alert("队列长度", "队列中还有 " + result.code + " 位");
    let initStorage = storages.create("rawAccount");
    let phone = new String();
    let password = new String();
    for (let index = 0; index < 11; index++) {
      var element = initStorage.get("phone").mText[index];
      phone = phone.concat(element);
    }
    for (let index = 0; index < 6; index++) {
      var element = initStorage.get("password").mText[index];
      password = password.concat(element);
    }
    setText(0, phone);
    setText(1, password);
  });
  request.join(3000);
  if (code === 0) {
    request.interrupt();
    toast("服务器连接超时！");
  }
});

// * Commit accuont
ui.postData.click(function() {
  let code = 0;
  let request = threads.start(function() {
    let res = http.post(urlPostAccount, {
      phone: ui.phone.getText(),
      password: ui.password.getText(),
    });

    let result = res.body.json();
    code = res.statusCode;

    if (result.code === 0) {
      let storage = storages.create("account");
      storage.put("phone", result.data.phone);
      storage.put("ciphers", result.data.ciphers);
    } else if (result.code === 1 || result.code === -1) {
      let storage = storages.create("rawAccount");
      storage.put("phone", ui.phone.getText());
      storage.put("password", ui.password.getText());
    }
    alert("提交账号", result.message);
  });
  request.join(3000);
  if (code === 0) {
    request.interrupt();
    toast("服务器连接超时！");
  }
});

// * Launch manually
ui.launchManually.click(function() {
  let phone = ui.phoneLoginManually.getText();
  let cipher = ui.passwordLoginManually.getText();
  if (phone && cipher) {
    loginPerformer(phone, cipher);
  } else {
    toast("请填写正确的是手机号和密码！");
  }
});

// * Load Manually
ui.loadManually.click(function() {
  toast("TODO");
});
