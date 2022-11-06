function onEnterSearch(){
    if (window.event.keyCode == 13) { //엔테키 이면
        searchStockLog();
    }
}

function searchStockLog(){
    const searchValue = document.querySelector("#searchValue").value;
    window.location.href = "/stockLog?page=1&search="+searchValue;
}