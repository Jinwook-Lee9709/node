
const ingredientSelect = (target, i) => {
    const value = target.value;
    const text =  target.options[target.selectedIndex].text;

    if(!document.querySelector(`#ingredient${value}-${i}`)){
        let new_tag = `
        <tr id="ingredient${value}-${i}">
            <td class="fw-bold">
                <p class="m_name${i}">${text}</p>
            </td>
            <td>
                X
            </td>
            <td>
                <input type="number" class="form-control amount${i}" value=1 style="width:130px">
            </td>
            <td>
                <a href="#" onclick="ingredientDelete(${value},${i})"><i class="ri-delete-back-2-fill pt-0" style="font-size: 20px; color:red;"></i></a>
            </td>
        </tr>
        `
    
        document.querySelector("#ingredientSelect"+i).innerHTML += new_tag;
    }

}

const ingredientDelete = (value, i) => {
    tag = document.querySelector(`#ingredient${value}-${i}`);
    tag.remove();
}