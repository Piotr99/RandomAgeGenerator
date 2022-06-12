const API = "https://api.agify.io/?name=";

const input = document.getElementById('input');
const form = document.querySelector('form');
const nameEl = document.querySelector('.name')
const ageEl = document.querySelector('.age')
const idEl = document.querySelector('.id')

const connect = async (value) => {
    if (!value) {
        return
    }
    const res = await fetch(API + value)
    const responseData = await res.json();
    try {
        const { name, age, count } = await validate(responseData)
        await render(name, age, count);


    } catch (e) {
        console.log(e.message)
    }
}
const reset = (value) => {
    nameEl.textContent = '';
    ageEl.textContent = '';
    idEl.textContent = ''
    value = ''
    input.value = ''

}
const validate = (responseData) => {

    if (!(responseData.age && responseData.name && responseData.count)) {
        throw new Error("Nie znaleziono wartości!");

    } else {
        const { age, name, count } = responseData;

        return {
            name,
            age,
            count
        }
    }
}

const render = (name, age, description) => {
    nameEl.textContent = name;
    nameEl.style.textTransform = "capitalize"
    ageEl.textContent = ` ma ${age} lat`;
    idEl.innerHTML = `<small>ID: ${description}</small>`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let value = input.value.trim()
    connect(value)
    reset(value)
})



