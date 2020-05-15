const profile = document.querySelector('.profile');
const userMain = profile.querySelector('.user'); //let
const userData = userMain.querySelector('.user__paperdol');
const userNick = userData.querySelector('.user__nickname'); //let
const userEdit = document.querySelector('.user__edit'); //КНОПКА ЭДИТ
const userJob = userData.querySelector('.user__subtittle'); //let

const poupOld = document.querySelector('.poup'); //let
const poupNew = document.querySelector('.poup_opened'); //let

const poupClose = poupOld.querySelector('.poup__close'); //let

const poupName = document.querySelector('.poup__nickname'); //let имя в попе
const poupJob = document.querySelector('.poup__subtittle'); //let подпись попа
//их точно столько нужно?) Пока оставлю, а то боязно

userEdit.addEventListener('click', function() {
    poupOld.classList.add('poup_opened');
    if (poupOld.classList.contains('poup_opened')) { //копирование текста из Папердоля в поп
        poupName.value = userNick.textContent;
        poupJob.value = userJob.textContent;
    }
});
//вывод попа ^

//закрытие попа
poupClose.addEventListener('click', function() {
    poupOld.classList.remove('poup_opened');
});
//передача текста из попа в папердол после "сохранить"
let formElement = document.querySelector('.poup__button');
const poupSave = document.querySelector('.poup__button');

function formSubmitHandler(evt) {
    evt.preventDefault();
    userNick.textContent = poupName.value;
    userJob.textContent = poupJob.value;
}
formElement.addEventListener('submit', formSubmitHandler);
userEdit.addEventListener('click', poupOld);
poupSave.addEventListener('click', formSubmitHandler);
poupSave.addEventListener('click', function() {
    poupOld.classList.remove('poup_opened');
});