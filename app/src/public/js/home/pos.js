function sell_logging(){
    const p_name = document.getElementsByClassName("p_name"); //판매 제품명
    const amount = document.getElementsByClassName("amount"); //판매량
       

    if(!p_name) return alert("판매 제품명 없음");
    if(!amount) return alert("판매량 없음.");
   
    var namelist = [];
    var amountlist = [];
    Array.from(p_name).forEach(element => namelist.push(element.innerText));
    Array.from(amount).forEach(element => amountlist.push(element.value));

    const req = {
        p_name: namelist,
        amount: amountlist
    };
    console.log(req);
    fetch("/sell_logging", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            alert("저장 성공.");
            location.replace("/inbound")
            return;
        }else{
            alert(JSON.stringify(res.msg));
        }
    })
    .catch((err) => {
        console.error(new Error("제품 등록 중 에러 발생"));
    });

}