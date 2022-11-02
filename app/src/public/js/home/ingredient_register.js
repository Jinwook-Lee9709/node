const pre_p_name = document.querySelector("#pre_p_name"), //바꾸기 전 제품명
pr_name = document.querySelector("#p_name"), //바꿀 제품명
des = document.querySelector("#des"), //제품설명
price = document.querySelector("#price"), //가격
category = document.querySelector("#category"), //카테고리
m_name = document.querySelectorAll(".m_name"), //재료명 리스트
amount = document.querySelectorAll('.amount'); //재료량 리스트

function ingredient_register(){
if(!pre_p_name.value) return alert("바뀌귀 전 제품명 없음");
if(!pr_name.value) return alert("제품 이름를 입력해주십시요.");
if(!des.value) return alert("제품 설명을 입력해주십시요.");
if(!price.value) return alert("제품 가격을 입력해주십시요.");
if(!category.value) return alert("카테고리를 입력해주십시요.");
if(!m_name[0].value) return alert("재료명을 입력해주십시요.");
if(!amount[0].value) return alert("재료량을 입력해주십시요.");
var namelist = [];
var amountlist = [];
Array.from(m_name).forEach(element => namelist.push(element.innerText));
Array.from(amount).forEach(element => amountlist.push(element.value));

const req = {
    pre_p_name: pre_p_name.value,
    p_name: pr_name.value,
    des: des.value,
    price: price.value,
    category: category.value,
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