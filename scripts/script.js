const profile = document.querySelector('.profile');
const userMain = profile.querySelector('.user'); //let
const userData = userMain.querySelector('.user__paperdol');
const userNick = userData.querySelector('.user__nickname'); //let
const userEdit = document.querySelector('.user__edit'); //КНОПКА ЭДИТ
const userJob = userData.querySelector('.user__subtittle'); //let
const poupOld = document.querySelector('.poup'); //let
const poupClose = poupOld.querySelector('.poup__close'); //let
const poupName = document.querySelector('.poup__section_nickname'); //let имя в попе top
const poupJob = document.querySelector('.poup__section_subtittle'); //let подпись попа bot

function openPopup() { //открывает поуп и заполняет его с экрана
    poupOld.classList.add('poup_opened');
    poupName.value = userNick.textContent;
    poupJob.value = userJob.textContent;
}

function closePoup() {
    poupOld.classList.remove('poup_opened'); //закрывает поуп
}

let formElement = document.querySelector('.poup__container');
//const poupSave = document.querySelector('.poup__button'); лишний

function formSubmitHandler(evt) { //передает поуп текст на стену + enter
    evt.preventDefault();
    userNick.textContent = poupName.value;
    userJob.textContent = poupJob.value;
    closePoup();
}
formElement.addEventListener('submit', formSubmitHandler);
//poupSave.addEventListener('click', formSubmitHandler); лишний
poupClose.addEventListener('click', closePoup);
userEdit.addEventListener('click', openPopup);
//попытки в Ентер
//const keyEnter = 13;

//function onEnter(evt) {
//if (evt.which == keyEnter) {
// userNick.textContent = poupName.value;
//  userJob.textContent = poupJob.value;
//  closePoup();
// }
//}
//poupName.addEventListener('keypress', onEnter);
//poupJob.addEventListener('keypress', onEnter);
//получилось так пока :( Но получилось.