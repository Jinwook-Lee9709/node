const weekJsonData = document.getElementById("weekJsonData").value;
const weekData = JSON.parse(weekJsonData)

function test1(){
    console.log(weekData);
}
test1();




document.addEventListener("DOMContentLoaded", () => {
    new ApexCharts(document.querySelector("#lineChart"), {
        series: [{
        name: "아메리카노",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }, {
        name: "카페라떼",
        data: [20, 51, 5, 30, 62, 69, 9, 14, 155]
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    }).render();
});