
let totalAmount = 0;

function ingredientSelect(i){
    if(!document.querySelector("#ingredient"+i)){
        const name = document.querySelector("#ingredientName" + i).innerText;
        const new_tag = `
        <tr id="ingredient${i}">
            <th scope="row"><img src="assets/img/material.png"></a></th>
            <td class="fw-bold m_name">
                ${name}
            </td>
            <td>
                <input type="number" class="form-control amount" value=1 style="width:130px">
            </td>
            <td>
                <a href="#" style="color:red" onclick="ingredientDelete(${i})"><i class="ri-delete-back-2-fill" style="font-size: 25px"></i></a>
            </td>
        </tr>
        `
    
        document.querySelector("#AddedIngredient").innerHTML += new_tag;

        totalAmount++;
        totalAmountTag = document.querySelector("#ingredientAmount");
        totalAmountTag.innerText = `품목 수 : ${totalAmount}`;
    }
}

function ingredientDelete(i){
    tag = document.querySelector("#ingredient"+i);
    tag.remove();
    totalAmount--;
    totalAmountTag = document.querySelector("#ingredientAmount");
    totalAmountTag.innerText = `품목 수 : ${totalAmount}`;
}