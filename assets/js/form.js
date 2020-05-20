const $tab_create = document.querySelector('#tab_create');
const $tab_modify = document.querySelector('#tab_modify');
const $tab_delete = document.querySelector('#tab_delete');

const $section_create = document.querySelector('#create');
const $section_modify = document.querySelector('#modify');
const $section_delete = document.querySelector('#delete');

$tab_create.addEventListener('click', async (event) => {
    console.log("Apreté tab create");
    event.preventDefault();

    $tab_create.classList.add('is-active');
    $tab_modify.classList.remove('is-active');
    $tab_delete.classList.remove('is-active');

    $section_create.classList.remove('hidden');
    $section_modify.classList.add('hidden');
    $section_delete.classList.add('hidden');
});

$tab_modify.addEventListener('click', async (event) => {
    console.log("Apreté tab modify");
    event.preventDefault();

    $tab_create.classList.remove('is-active');
    $tab_modify.classList.add('is-active');
    $tab_delete.classList.remove('is-active');

    $section_create.classList.add('hidden');
    $section_modify.classList.remove('hidden');
    $section_delete.classList.add('hidden');
});

$tab_delete.addEventListener('click', async (event) => {
    console.log("Apreté tab delete");
    event.preventDefault();

    $tab_create.classList.remove('is-active');
    $tab_modify.classList.remove('is-active');
    $tab_delete.classList.add('is-active');

    $section_create.classList.add('hidden');
    $section_modify.classList.add('hidden');
    $section_delete.classList.remove('hidden');
});