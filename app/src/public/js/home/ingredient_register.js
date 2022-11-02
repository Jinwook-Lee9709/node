const p_name = document.querySelector("#p_name"),
buffer = document.querySelector('row g-3 needs-validation'),
m_name = buffer.querySelectorALL('.m_name'),
amount = document.querySelectorALL('.amount');

function ingredient_register(){
if(!p_name.value) return alert("제품 이름를 입력해주십시요.");
if(!m_name.value) return alert("재료 이름을 입력해주십시요.");
if(!amount.value) return alert("소비량을 입력해주십시요.");
if(m_name.value) return alert(m_name);
const req = {
    p_name: p_name.value,
    m_name: m_name.value,
    amount: amount.value,
};
console.log(req);

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
        alert(res.msg);
    }
})
.catch((err) => {
    console.error(new Error("제품 등록 중 에러 발생"));
});

}