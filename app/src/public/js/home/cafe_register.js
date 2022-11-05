

const cafe_name = document.querySelector("#name");
const cafe_code = document.querySelector("#code");
const user_name = document.querySelector("#user_name");
const change_name = document.querySelector("#ch_name");
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

function cafe_register_by_code(){
    if(!cafe_code.value) return alert("카페 이름를 입력해주십시요.");
    const req = {
        code: cafe_code.value,
    };
    console.log(req);
    
    fetch("/cafe_register_by_code", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/setting";
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("일치하는 코드가 없습니다."));
    });
    
}
function change_cafe_name(){
    if(!change_name.value) return alert("카페 이름를 입력해주십시요.");
    const req = {
        cafe_name: change_name.value,
        user_name : user_name.value
    };
    console.log(req);
    
    fetch("/change_cafe_name", {
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
        console.error(new Error("일치하는 코드가 없습니다."));
    });
}
function cafe_disconnect(){
    fetch("/cafe_disconnect", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: null
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/login";
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error("제거중 오류발생."));
    });
}