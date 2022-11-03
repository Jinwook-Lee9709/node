const app = require("../app");
const schedule = require('node-schedule')
const Cafe = require("../src/models/Cafe");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    // const rule = new schedule.RecurrenceRule();
    // rule.hour = 22;
    // rule.tz = 'Asia/Seoul';
    // const job = schedule.scheduleJob(rule, async function(){
    //     const cafe = new Cafe();
    //     const response = await cafe.safe_stock_update();
    //     console.log("코드실행");

    // });
    console.log("서버 가동");
});
