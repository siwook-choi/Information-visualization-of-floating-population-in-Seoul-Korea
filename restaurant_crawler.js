

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


const d3 = require('d3-fetch');
var name_list = [];
d3.json("./code.json").then(function (p) {
    console.log(p);
    p.forEach(function (data) {
        name_list.push({ id: data.H_DNG_CD, name: data.DO_NM + data.CT_NM + data.H_DNG_NM });
    });
});

console.log(name_list);


let food_data = [];
const puppeteer = require('puppeteer');
//name_list.forEach(function (address) {
    address = {id: 1110530, name:"서울종로구사직동"};
    let food_number = {};
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
//});

var food_json = JSON.parse(food_data);
var write_file = new File("food.json");
write_file.open("w");
write_file.write(food_json);
write_file.close();