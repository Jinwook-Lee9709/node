
function ingredientRegister(i){
    const pr_name = document.querySelector("#p_name" + i); //바꿀 제품명
    const pre_p_name = document.querySelector("#p_name" + i), //바꾸기 전 제품명
        m_name = document.getElementsByClassName("m_name" + i), //재료명 리스트
        amount = document.getElementsByClassName('amount' + i), //재료량 리스트
        des = document.querySelector("#des" + i), //제품설명
        i_price = document.querySelector("#i_price" + i), //가격
        i_category = document.querySelector("#category" + i); //카테고리


    if(!pre_p_name.innerText) return alert("바뀌귀 전 제품명 없음");
    if(!pr_name.innerText) return alert("제품 이름를 입력해주십시요.");
    if(!des.value) return alert("제품 설명을 입력해주십시요.");
    if(!i_price.value) return alert("제품 가격을 입력해주십시요.");
    if(!i_category.value) return alert("카테고리를 입력해주십시요.");
    if(!m_name[0]) return alert("재료명을 입력해주십시요.");
    if(!amount[0]) return alert("재료량을 입력해주십시요.");
    var namelist = [];
    var amountlist = [];
    Array.from(m_name).forEach(element => namelist.push(element.innerText));
    Array.from(amount).forEach(element => amountlist.push(element.value));
    const req = {
        pre_p_name: pre_p_name.innerText,
        p_name: pr_name.innerText,
        des: des.value,
        price: i_price.value,
        category: i_category.value,
        m_name: namelist,
        amount: amountlist
    };
 
    fetch("/ingredient_register", {
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
function delete_product(i){
    const p_name = document.querySelector("#t_p_name" + i)
    console.log(p_name);
    if(!p_name.innerText) return alert("바뀌귀 전 제품명 없음");
    const req = {
        p_name: p_name.innerText,
    };
    console.log(req);

    fetch("/delete_product", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            alert("삭제 성공.");
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