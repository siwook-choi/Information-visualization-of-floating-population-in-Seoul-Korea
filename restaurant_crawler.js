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
data = fs.readFileSync(filePath, { encoding: 'utf-8' });

var jsonData = JSON.parse(data);
jsonData.forEach(function (d) {
    name_list.push({ id: d["H_DNG_CD"], name: d["DO_NM"] + d["CT_NM"] + d["H_DNG_NM"] });
});


var food_data = [];
const puppeteer = require('puppeteer');
var request_count = 0;
var chrome_count = 0;

getData();
async function getData() {
    for (address of name_list) {
        var food_object = { 'id': address.id };
        food_data.push(food_object);
        for (food of enum_food) {

            searchUrl(food, address, food_object);
            async function searchUrl(food, address, food_object) {
                var url = "https://store.naver.com/restaurants/list?filterId=r09110115&menu="
                    + food.id + "&query=" + address.name + "%20%EB%A7%9B%EC%A7%91";
                if (chrome_count > 9) {
                    setTimeout(() => { searchUrl(food, address, food_object) }, 50);
                    return;
                }
                try {
                    chrome_count += 1;
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto(url);

                    const text = await page.evaluate(() => document.body.innerHTML);
                    var int_start = text.indexOf('<em class="count">') + 18;
                    var restaurant_num = parseInt(text.substr(int_start, 7).replace(/,/g, ""));

                    await browser.close();
                    request_count += 1;
                    food_object[["menu_" + food.id]] = restaurant_num;
                    chrome_count -= 1;

                    console.log(request_count);
                } catch (e) {
                    console.log(e);
                    food_object[["menu_" + food.id]] = -1;
                    request_count += 1;
                    chrome_count -= 1;
                    console.log(request_count);
                }
            };

        };
    };
}

var timerId = setInterval(checkFinished, 1000);

function checkFinished() {
    if (request_count == name_list.length * enum_food.length) {
        console.log(food_data);
        fs.writeFile('food_data.json', JSON.stringify(food_data, null, '\t'), (err) => {
            if (err)
                console.log(err);
        })
        clearInterval(timerId);
    }
}