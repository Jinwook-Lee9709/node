
let totalAmount = 0;

function productSelect(i){
    if(!document.querySelector("#product"+i)){
        const name = document.querySelector("#productName" + i).innerText;
        const price = document.querySelector("#productPrice" + i).innerText;
        const new_tag = `
        <tr id="product${i}">
            <th scope="row"><img src="assets/img/No-image-available.png"></a></th>
            <td class="fw-bold">
                ${name}
            </td>
            <td>
                <input type="number" class="form-control" value=1 style="width:130px" onchange="changeInputValue()">
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