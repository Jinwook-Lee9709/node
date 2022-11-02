const p_name = document.querySelector("#p_name"),
m_name = document.querySelectorAll(".m_name"),
amount = document.querySelectorAll('.amount');

function ingredient_register(){
if(!p_name.value) return alert("제품 이름를 입력해주십시요.");
if(!m_name[0].value) return alert("재료명을 입력해주십시요.");
if(!amount[0].value) return alert("재료량을 입력해주십시요.");
var namelist = [];
var amountlist = [];
m_name.forEach(element => namelist.push(element.value));
amount.forEach(element => amountlist.push(element.value));

const req = {
    p_name: p_name.value,
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
        return alert("저장 성공.");
    }else{
        alert(JSON.stringify(res.msg));
    }
})
.catch((err) => {
    console.error(new Error("제품 등록 중 에러 발생"));
});

}