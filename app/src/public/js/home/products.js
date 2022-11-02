
const ingredientSelect = (target) => {
    const value = target.value;
    const text =  target.options[target.selectedIndex].text;

    if(!document.querySelector("#ingredient"+value)){
        let new_tag = `
        <tr id="ingredient${value}">
            <td class="fw-bold"> 
                ${text}
            </td>
            <td>
                X
            </td>
            <td>
                <input type="number" class="form-control amount" value=1 style="width:130px">
            </td>
            <td>
                <a href="#" onclick="ingredientDelete(${value})"><i class="ri-delete-back-2-fill pt-0" style="font-size: 20px; color:red;"></i></a>
            </td>
        </tr>
        `
    
        document.querySelector("#ingredientSelect").innerHTML += new_tag;
    }

}

const ingredientDelete = (value) => {
    tag = document.querySelector("#ingredient"+value);
    tag.remove();
}