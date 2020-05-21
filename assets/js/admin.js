const $list = document.querySelector('#list');
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_address = document.querySelector('#form_field_address');
const $form_field_category = document.querySelector('#form_field_category');
const $form_field_horarios = document.querySelector('#form_field_horarios');
const $form_field_type = document.querySelector('#form_field_type');

const dataRow = props => {
    const {
        _id,
        name
    } = props;
    return `<div class="item">
                <div class="list_content">
                    <h2>${name}</h2>
                </div>
                    <div class="btn_wrapper">
                        <a href="#" data-id="${_id}" class="btn green handleEdit">Editar</a>
                        <a href="#" data-id="${_id}" class="btn red handleDelete">Eliminar</a>
                    </div>
            </div>`;
}

const getLibrerias = async (id = '') => {
    const result = await api.getLibrerias();
    console.log(result);
    if (id == '') {
        //Cuando la llama el document ready
        $list.innerHTML = '';
        result.forEach(element => {
            $list.innerHTML += dataRow(element);
        });
    } else {
        //Cuando la llamo con un id desde edit
        const elementById = result.find(el => id == el._id);
        return elementById;
    }

}

getLibrerias();

const deleteLibreria = async id => {
    const result = await api.deleteLibrerias(id);
    console.log('Deleted');
    getLibrerias();
}
const completeForm = (reg) => {
    const {
        lat,
        lng,
        name,
        description,
        address,
        category,
        horarios,
        type
    } = reg;
    $form_field_lat.value = lat;
    $form_field_lng.value = lng;
    $form_field_name.value = name;
    $form_field_description.value = description;
    $form_field_address.value = address;
    $form_field_category.value = category;
    $form_field_horarios.value = horarios;
    $form_field_type.value = type;

};
document.addEventListener('click', async function () {
    event.preventDefault();
    //Handle Delete
    if (event.target.matches('.handleDelete')) {
        const id = event.target.dataset.id;
        console.log('click en Delete', event.target.dataset.id);
        deleteLibreria(id);
    }

    //Handle Edit
    if (event.target.matches('.handleEdit')) {
        const id = event.target.dataset.id;
        console.log('click en Edit', id);
        const reg = await getLibrerias(id);
        console.log(reg);
        completeForm(reg);
        //editLibreria(id)
    }
}, false);