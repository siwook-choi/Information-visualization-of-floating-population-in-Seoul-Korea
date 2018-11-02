var enum_food = [
    { id: 1, name: "韓国料理" },
    { id: 2, name: "洋食" },
    { id: 3, name: "アジア料理" },
    { id: 4, name: "和食" },
    { id: 5, name: "中国料理" },
    { id: 6, name: "屋台料理" },
    { id: 7, name: "カフェ" },
    { id: 8, name: "バイキング" },
    { id: 9, name: "etc" }
];

var fs = require('fs');
var path = require('path');
filePath = path.join(__dirname, 'code.json');

var name_list = [];
fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
        var jsonData = JSON.parse(data);
        jsonData.forEach(function (d) {
            name_list.push({ id: d["H_DNG_CD"], name: d["DO_NM"] + d["CT_NM"] + d["H_DNG_NM"] });
        });
    }
    else {
        console.log(err);
    }
    console.log(name_list);
    var food_data = [];
    const puppeteer = require('puppeteer');
    //name_list.forEach(function (address) {
    address = { id: 1110530, name: "서울종로구사직동" };
    var food_number = {};
    enum_food.forEach(function (food) {
        var url = "https://store.naver.com/restaurants/list?filterId=r09110115&menu="
            + food.id + "&query=" + address.address + "%20%EB%A7%9B%EC%A7%91";

        food_number["H_DNG_CD"] = address.id;
        (async () => {

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            const text = await page.evaluate(() => document.body.innerHTML);
            var int_start = text.indexOf('<em class="count">') + 18;
            var restaurant_num = parseInt(text.substr(int_start, 7).replace(/,/g, ""));

            food_number[food.id] = restaurant_num;

            await browser.close();
        })();
    });
    food_data.push(food_number);
    console.log(food_data);
    //});
});