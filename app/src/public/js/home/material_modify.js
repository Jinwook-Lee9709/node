
function materialModify(i){
    const m_name = document.querySelector("#m_name" + i), //바꿀 제품명
    des = document.querySelector("#des" + i), //재료 설명
    unit = document.querySelector("#unit" + i), //단위
    safe_quantity = document.querySelector("#safe_quantity" + i); //안전재고

    if(!m_name.value) return alert("바뀌귀 전 제품명 없음");
    if(!des.value) return alert("제품 설명을 입력해주십시요.");
    if(!unit.value) return alert("제품 가격을 입력해주십시요.");
    if(!safe_quantity.value) return alert("카테고리를 입력해주십시요.");
    

    const req = {
        m_name: m_name.value,
        des: des.value,
        unit: unit.value,
        safe_quantity: safe_quantity.value
    };
    fetch("/material_modify", {
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
            location.replace("/ingredient")
            return;
        }else{
            alert(JSON.stringify(res.msg));
        }
    })
    .catch((err) => {
        console.error(new Error("제품 등록 중 에러 발생"));
    });

}