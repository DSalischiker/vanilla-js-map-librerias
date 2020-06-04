//DOM Elements
const $list = document.querySelector('#list');
const $form_field_id = document.querySelector('#form_field_id');
const $form_field_lat = document.querySelector('#form_field_lat');
const $form_field_lng = document.querySelector('#form_field_lng');
const $form_field_name = document.querySelector('#form_field_name');
const $form_field_description = document.querySelector('#form_field_description');
const $form_field_address = document.querySelector('#form_field_address');
const $form_field_category = document.querySelector('#form_field_category');
const $form_field_horarios = document.querySelector('#form_field_horarios');
const $form_field_type = document.querySelector('#form_field_type');
const $form_main = document.querySelector('#form_main');
const $form_submit = document.querySelector('.form_submit');
const $all_modals = document.querySelectorAll('.modal');
const $modal = document.querySelector('#modal');
const $btn_cancel = document.querySelectorAll('.btn-cancel');
const $btn_add = document.querySelector('#btn_add');
const $modal_warning = document.querySelector('#modal_warning');
const $btn_confirm_delete = document.querySelector('.btn-confirm-delete');
//READ
const getLibrerias = async (id = '') => {
    const result = await api.getLibrerias();
    if (id == '') {
        //Cuando la llama el document ready
        $list.innerHTML = '';
        result.forEach(element => {
            $list.innerHTML += dataRow(element);
        });

        //When new elements added to DOM, add this two EventListeners
        const $btnsDelete = document.querySelectorAll('.handleDelete');
        $btnsDelete.forEach(element => {
            element.addEventListener('click', handleClickDelete);
        });
        const $btnsEdit = document.querySelectorAll('.handleEdit');
        $btnsEdit.forEach(element => {
            element.addEventListener('click', handleClickEdit);
        });
    } else {
        //Cuando la llamo con un id desde edit
        const elementById = result.find(el => id == el._id);
        return elementById;
    }
}

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
                        <a href="#" data-id="${_id}" class="btn button is-link is-light handleEdit"><span class="icon is-small">
                        <i class="fas fa-edit"></i>
                    </span><span>Editar</span></a>
                        <a href="#" data-id="${_id}" class="btn button is-danger is-light handleDelete"><span class="icon is-small">
                        <i class="fas fa-trash-alt"></i>
                    </span><span>Eliminar</span></a>
                    </div>
            </div>`;
}
//Calls the function when page is loaded
getLibrerias();

//DELETE
const deleteLibreria = async (id) => {
    const result = await api.deleteLibrerias(id);
    console.log('Deleted', result);
    getLibrerias();
}

const handleClickDelete = async () => {
    const id = event.target.dataset.id;
    $modal_warning.classList.add('is-active');
    $modal_warning.classList.add('is-active');
    $btn_confirm_delete.addEventListener('click', function () {
        deleteLibreria(id);
        $modal_warning.classList.remove('is-active');
    });
}

//UPDATE
const updateLibreria = async (data, id) => {
    const result = await api.updateLibrerias(data, id);
    console.log('Updated', result);
    getLibrerias();
}

const handleClickEdit = async () => {
    const id = event.target.dataset.id;
    const reg = await getLibrerias(id);
    $modal.classList.add('is-active');
    completeForm(reg);
}
//Complete form with element clicked
const completeForm = (reg) => {
    const {
        _id,
        lat,
        lng,
        name,
        description,
        address,
        category,
        horarios,
        type
    } = reg;
    $form_field_id.value = _id;
    $form_field_lat.value = lat;
    $form_field_lng.value = lng;
    $form_field_name.value = name;
    $form_field_description.value = description;
    $form_field_address.value = address;
    $form_field_category.value = category;
    $form_field_horarios.value = horarios;
    $form_field_type.value = type;
    console.log(reg);
};

//CREATE
const createLibreria = async (data) => {
    const result = await api.createLibrerias(data);
    console.log('Created', result);
    getLibrerias();
}

//FORM (Update or Create)
$form_submit.addEventListener('click', (event) => {
    event.preventDefault();
    const id = $form_field_id.value;
    const formData = {
        "lat": $form_field_lat.value,
        "lng": $form_field_lng.value,
        "name": $form_field_name.value,
        "description": $form_field_description.value,
        "address": $form_field_address.value,
        "category": $form_field_category.value,
        "horarios": $form_field_horarios.value,
        "type": $form_field_type.value,
    };
    console.log("tirando update");
    if (id == '') {
        createLibreria(formData);
    } else {
        updateLibreria(formData, id);
    }


    //To be continued...
    //Buscando usar el mismo form cuando hace update o create.
    //Chequear que si el id viene vacio es create, sino es update
    //createCerveceria(formData)

    //Form Reset
    $modal.classList.remove('is-active');
    $form_field_id.value = '';
    $form_main.reset();
});
/* $btn_cancel.addEventListener('click', function () {
    $modal.classList.remove('is-active');
    $form_field_id.value = '';
    $form_main.reset();
}); */
const $btnsCancel = document.querySelectorAll('.btn-cancel');
$btnsCancel.forEach(element => {
    element.addEventListener('click', function () {
        $all_modals.forEach(modal => {
            modal.classList.remove('is-active');
            $form_field_id.value = '';
            $form_main.reset();
        });

    });
});
$btn_add.addEventListener('click', function () {
    $modal.classList.add('is-active');
})
/* document.addEventListener('click', async function () {
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
}, false); */