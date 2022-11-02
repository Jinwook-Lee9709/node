
const ingredientSelect = (target) => {
    const value = target.value;
    let new_tag = document.createElement('p');

    //new_tag.setAttribute('class', 'h5');
    new_tag.innerHTML = `${value}`;

    document.querySelector("#ingredientSelect").append(new_tag);
}