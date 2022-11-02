

const m_name = document.querySelector("#m_name"),
unit = document.querySelector("#unit"),
desc = document.querySelector("#desc")

function material_register(){
if(!m_name.value) return alert("재료명을 입력해주십시요.");
if(!unit.value) return alert("단위를 입력해주십시요.");
if(!desc.value) return alert("설명을 입력해주십시요.");
const req = {
    m_name: m_name.value,
    unit: unit.value,
    desc: desc.value,
};
console.log(req);

fetch("/material_register", {
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
        alert(res.msg);
    }
})
.catch((err) => {
    console.error(new Error("재료 등록 중 에러 발생"));
});

}