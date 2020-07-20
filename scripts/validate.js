const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__section',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inputDiz',
    inputErrorClass: 'popup__section_error',
    errorClass: 'popup__input-error'
};
// ошибки
function checkInput(evt, inputErrorClass, errorClass) { //передаем поле ввода и место под текст ошибки
    const inputName = evt.target; //определяем инпут ( по сути тот, который кликнут был)
    const errorPlace = document.querySelector(`#${inputName.id}-error`); //определяем где именно будет текст ошибки ( находим)
    if (inputName.validity.valid) {
        inputName.classList.remove(inputErrorClass); //скрыть подчеркивание
        errorPlace.textContent = ""; //чтобы не появлялось __лишнего__
        errorPlace.classList.remove(errorClass); //скрыть ошибку под полем
    } else { //если не прошел валидацию
        inputName.classList.add(inputErrorClass); // добавить
        errorPlace.textContent = inputName.validationMessage; // приравнивание к дефолтному тексту ошибки
        errorPlace.classList.add(errorClass); // добавить
    }
}

function enableInputValidation(form, validation) {
    const inputItems = Array.from(
        form.querySelectorAll(validation.inputSelector) //определяем инпуты
    );
    inputItems.forEach((input) => { //теперь на каждый инпут вешаем слушатели срабатывания функции ошибок валидации ( CheckInput)
        input.addEventListener('input', (evt) =>
            checkInput(evt, validation.inputErrorClass, validation.errorClass)
        );
    });
}

function validateFormOnInput(form, validation) {
    const submitButton = form.querySelector(validation.submitButtonSelector); //отмена стандартного поведения кнопки и ее определение
    form.addEventListener('input', () => {
        const isFormValid = form.checkValidity();
        submitButton.disabled = !isFormValid;
        submitButton.classList.toggle(validation.inactiveButtonClass, !isFormValid);
    });
}

function enableValidation(validation) {
    const formItems = Array.from(
        document.querySelectorAll(validation.formSelector) // определяем все внутри формы
    );
    formItems.forEach((form) => {
        enableInputValidation(form, validation)
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        //блок кнопки
        validateFormOnInput(form, validation);
    });
}