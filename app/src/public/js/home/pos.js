
let totalAmount = 0;

function productSelect(i){
    if(!document.querySelector("#product"+i)){
        const name = document.querySelector("#productName" + i).innerText;
        const price = document.querySelector("#productPrice" + i).innerText;
        const new_tag = `
        <tr id="product${i}">
            <th scope="row"><img src="assets/img/No-image-available.png"></a></th>
            <td class="fw-bold p_name">
                ${name}
            </td>
            <td>
                <input type="number" class="form-control amount" value=1 style="width:130px" onchange="changeInputValue()">
            </td>
            <td class="fw-bold">
                ${price}
            </td>
            <td>
                <a href="#" style="color:red" onclick="productDelete(${i})"><i class="ri-delete-back-2-fill" style="font-size: 25px"></i></a>
            </td>
        </tr>
        `
    
        document.querySelector("#AddedProduct").innerHTML += new_tag;

        totalAmount++;
        totalAmountTag = document.querySelector("#productAmount");
        totalAmountTag.innerText = `품목 수 : ${totalAmount}`;
    }
}

function productDelete(i){
    tag = document.querySelector("#product"+i);
    tag.remove();
    totalAmount--;
    totalAmountTag = document.querySelector("#productAmount");
    totalAmountTag.innerText = `품목 수 : ${totalAmount}`;
}

function changeInputValue(){

}
    
function sell_logging(){
    const p_name = document.getElementsByClassName("p_name"); //판매 제품명
    const amount = document.getElementsByClassName("amount"); //판매량
       

    if(!p_name) return alert("판매 제품명 없음");
    if(!amount) return alert("판매량 없음.");
   
    var namelist = [];
    var amountlist = [];
    Array.from(p_name).forEach(element => namelist.push(element.innerText));
    Array.from(amount).forEach(element => amountlist.push(element.value));
    const req = {
        p_name: namelist,
        amount: amountlist
    };
    console.log(req);
    fetch("/sell_logging", {
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
            location.replace("/pos")
            return;
        }else{
            alert(JSON.stringify(res.msg));
        }
    })
    .catch((err) => {
        console.error(new Error("제품 등록 중 에러 발생"));
    });

}