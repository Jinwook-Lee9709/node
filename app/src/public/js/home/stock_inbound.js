
function stockInbound(i){
    const m_name = document.getElementsByClassName("m_name" + i); //입고할 재료명
    const amount = document.getElementsByClassName("amount" + i); //추가할 재고량
       

    if(!m_name) return alert("재료명 없음");
    if(!amount) return alert("입고량 없음.");
   
    var namelist = [];
    var amountlist = [];
    Array.from(m_name).forEach(element => namelist.push(element.value));
    Array.from(amount).forEach(element => amountlist.push(element.value));

    const req = {
        m_name: namelist,
        amount: amountlist
    };
    console.log(req);
    fetch("/stock_inbound", {
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
            location.replace("/products")
            return;
        }else{
            alert(JSON.stringify(res.msg));
        }
    })
    .catch((err) => {
        console.error(new Error("제품 등록 중 에러 발생"));
    });

}