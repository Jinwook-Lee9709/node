

const p_name = document.querySelector("#p_name"),
price = document.querySelector("#price"),
desc = document.querySelector("#desc"),
category = document.querySelector("#category");

function product_register(){
if(!p_name.value) return alert("제품 이름를 입력해주십시요.");
if(!price.value) return alert("가격을 입력해주십시요.");
if(isNaN(price.value)) return alert("가격은 숫자여야합니다!");
if(!desc.value) return alert("설명을 입력해주십시요.");
if(!category.value) return alert("카테고리를 입력해주십시요.")
const req = {
    p_name: p_name.value,
    price: price.value,
    desc: desc.value,
    category: category.value
};

fetch("/product_register", {
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
        alert(res.msg);
    }
})
.catch((err) => {
    console.error(new Error("제품 등록 중 에러 발생"));
});

}