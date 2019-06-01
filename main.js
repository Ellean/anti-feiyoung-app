"ui";

var color = "#4390E6";
const urlGetNum = "192.168.111.128:4000/numInQuery";
const urlPostAccount = "192.168.111.128:4000/account";

ui.layout(
  <frame>
    <vertical>
      <appbar>
        <toolbar id="toolbar" title="Anti Feiyoung" bg="#4390E6" />
        <tabs id="tabs" bg="#4390E6" />
      </appbar>
      <viewpager id="viewpager">
        <frame>
          <img
            id="launch"
            w="100"
            h="100"
            layout_gravity="center"
            src="file://./src/rocket.png"
          />
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
            margin="10"
          />
          <horizontal margin="50 100 50 10">
            <text text="手机号" />
            <input w="200" id="phone" singleLine="true" />
          </horizontal>
          <horizontal margin="50 200 50 10">
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
            margin="10 300 10 10"
          />
        </frame>
        <frame>
          <text text="第二页内容" textColor="red" textSize="16sp" />
        </frame>
      </viewpager>
    </vertical>
  </frame>
);

/**
 * Init Data
 */

/**
 * Define UI
 */

activity.setSupportActionBar(ui.toolbar);

ui.emitter.on("create_options_menu", menu => {
  menu.add("关于");
});

ui.emitter.on("options_item_selected", (e, item) => {
  switch (item.getTitle()) {
    case "关于":
      alert("关于", "本软件仅供测试使用！");
      break;
  }
  e.consumed = true;
});

ui.statusBarColor(color);

ui.viewpager.setTitles(["一键发射", "获取燃料", "高级模式"]);

ui.tabs.setupWithViewPager(ui.viewpager);

/**
 * Button Action
 */
// TODO Complete the launch function
ui.launch.click(function() {
  let storage = storages.create("account");
  if (storage) {
    alert("警告", "火箭还没有造完！");
  } else {
    alert("提示", "并没有油让你发射，请前往获取燃料！");
  }
});

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

// TODO Check phone number locally
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
