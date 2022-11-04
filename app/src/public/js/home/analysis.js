const weekJsonData = document.getElementById("weekJsonData").value;
const weekSumJsonData = document.getElementById("weekSumJsonData").value;
const weekData = JSON.parse(weekJsonData);
const weekSumData = JSON.parse(weekSumJsonData);

const today = new Date();
let weekForm = []; // ['10-29', '10-30', '10-31', '11-1', ... , '11-4']
makeWeekForm(weekForm, today);
let weekTotalSales = [0,0,0,0,0,0,0];
calWeekTotalSales(weekData, weekForm, weekTotalSales);


// 일주일간 총 매출 계산 weekTotalSales
function calWeekTotalSales(weekData, weekForm, weekTotalSales){
    for(let i = 0; i < weekData.length; i++){
        //날짜 변환 like this -> '11-4'
        let date = new Date(Date.parse(weekData[i].in_date));
        date = (date.getMonth()+1).toString() + "-" + date.getDate().toString();
        for(let j = 0; j < weekForm.length; j++){
            if(weekForm[j] === date){ // weekTotalSales 의 j번째에 값을 계산
                weekTotalSales[j] += weekData[i].price * weekData[i].SUM;
            }
        }
    }
}

// ['10-29', '10-30', '10-31', '11-1', ... , '11-4'] weekForm
function makeWeekForm(weekForm, today){
    const time = new Date(today);
    time.setDate(time.getDate() - 6);
    for(let i = 0; i < 7; i++){
        const date = (time.getMonth()+1).toString() + "-" + time.getDate().toString();
        weekForm[i] = date;
        time.setDate(time.getDate() + 1);
    }
}

function test1(){
    console.log(weekData);
    console.log(weekForm);
    console.log(today);
    console.log(weekSumData);
    console.log(weekTotalSales);
}
test1();



// ------------  일주일간 총 매출 ------------------

document.addEventListener("DOMContentLoaded", () => {
    new ApexCharts(document.querySelector("#weekTotalSalesChart"), {
        series: [{
        name: "총 매출",
        data: weekTotalSales
        }],
        chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
        },
        markers: {
        size: 5
        },
        dataLabels: {
        enabled: false
        },
        stroke: {
        curve: 'straight',
        width: 4
        },
        grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
        },
        xaxis: {
        categories: weekForm,
        }
    }).render();
});



// -----------최근 일주일간 상품 별 판매 비율 ----------

const productNames = [];
const TotalSales = [];

for(let i = 0; i < weekSumData.length; i++){
    productNames[i] = weekSumData[i].p_name;
    TotalSales[i] = weekSumData[i].SUM;
}

document.addEventListener("DOMContentLoaded", () => {
    new ApexCharts(document.querySelector("#SalesRatioChart"), {
      series: TotalSales,
      chart: {
        height: 350,
        type: 'pie',
        toolbar: {
          show: true
        }
      },
      labels: productNames
    }).render();
});



// -----------일주일간 상품별 판매량-----------

let weekProductSales = new Object();
calWeekProductSales(weekData, weekForm, weekProductSales);
console.log(weekProductSales);

function calWeekProductSales(weekData, weekForm, weekProductSales){
    for(let i = 0; i < weekData.length; i++){
        const productName = weekData[i].p_name;
        if(!weekProductSales[productName]){
            weekProductSales[productName] = [0,0,0,0,0,0,0];
        }
        //날짜 변환 like this -> '11-4'
        let date = new Date(Date.parse(weekData[i].in_date));
        date = (date.getMonth()+1).toString() + "-" + date.getDate().toString();
        for(let j = 0; j < weekForm.length; j++){
            if(weekForm[j] === date){
                weekProductSales[productName][j] = weekData[i].SUM;
            }
        }
    }
}



function productClick(i){
    const productName = document.querySelector("#productName"+i).innerText;
    const weekProductSalesId = document.querySelector("#weekProductSalesChart");
    weekProductSalesId.innerHTML = "";
    const test = new ApexCharts(weekProductSalesId, {
            series: [{
            name: productName,
            data: weekProductSales[productName]
            }],
            chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
            },
            markers: {
            size: 5
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            curve: 'straight',
            width: 4
            },
            grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
            },
            xaxis: {
            categories: weekForm,
            }
        }).render();

}
