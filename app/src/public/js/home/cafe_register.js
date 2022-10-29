

const cafe_name = document.querySelector("#cafe_name");

function cafe_register(){
if(!cafe_name.value) return alert("카페 이름를 입력해주십시요.");


const req = {
    cafe_name: cafe_name.value
};
console.log(req);

fetch("/cafe_register", {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
})
.then((res) => res.json())
.then((res) => {
    if(res.success){
        location.href = "/";
    }else{
        alert(res.msg);
    }
})
.catch((err) => {
    console.error(new Error("카페 등록 중 에러 발생"));
});

}