const initialCards = [{
        name: "Анор - Лондо",
        link: "https://giantbomb1.cbsistatic.com/uploads/original/14/148971/2311162-anor_londo_2.jpg",
    },
    {
        name: "Олачиль",
        link: "https://vignette.wikia.nocookie.net/darksouls/images/1/1e/Oolacile_township.jpg/revision/latest?cb=20130127194110",
    },
    {
        name: "Маджулла",
        link: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700879662.jpg",
    },
    {
        name: "Нарисованный мир",
        link: "https://u.kanobu.ru/screenshots/1/5b8add82-92f8-4369-b92a-2a55f79e2b4f.jpg",
    },
    {
        name: "Близкий друг",
        link: "https://vignette.wikia.nocookie.net/darksouls/images/6/61/Хавел_Скала_%28Dark_Souls_III%29.png/revision/latest?cb=20160828161108&path-prefix=ru",
    },
    {
        name: "Храм Огня",
        link: "https://vignette.wikia.nocookie.net/darksouls/images/5/54/Firelink_shrine02.jpg/revision/latest?cb=20130219072930",
    },
];


const profile = document.querySelector('.profile');
const userMain = document.querySelector('.user'); //let
const userData = document.querySelector('.user__paperdol');
const userNick = document.querySelector('.user__nickname'); //let
const userEdit = document.querySelector('.user__edit'); //КНОПКА ЭДИТ
const userJob = document.querySelector('.user__subtittle'); //let
const poupOld = document.querySelector('.poup'); //let
const poupClose = document.querySelector('.poup__close'); //закрытие попа юзера
const poupName = document.querySelector('.poup__section_nickname'); //let имя в попе top
const poupJob = document.querySelector('.poup__section_subtittle'); //let подпись попа bot
const poupPhoto = document.querySelector('.poup-photo'); //ПОП С РЕДАКТОРОМ ФОТО
const photoEdit = document.querySelector('.user__place-button') //КНОПКА +
const poupPlaceName = document.querySelector('.poup__section_placename') // Название места
const poupPlaceLink = document.querySelector('.poup__section_placlink') // поле для ссылки на место
const poupPhotoClose = document.querySelector('.poup-photo__close') //закрытие попа с Фото
const poupWithImage = document.querySelector('.poup-image'); //поуп с картинкой
const poupFullImage = document.querySelector('.poup-image__picture'); //картинка БОЛЬШАЯ на поупе
const poupImageText = document.querySelector('.poup-image__text'); // текст под картинкой Поупа
const poupImageClose = document.querySelector('.poup-image__close'); //закрытие попа с картинкой
const cardSave = document.querySelector('.poup__button');
//try hard
const photoContainer = document.querySelector('#photo-container').content; //выбрали темлейт
const placeForPhoto = document.querySelector('.photo-gallery'); //сюда вставлять
const card = placeForPhoto.querySelector('.card'); //карта
const cardTextContainer = placeForPhoto.querySelector('.card__text'); //паппердоль карты

// добавление новой карты ( все действия с картой, внутри этой функции)
function addCard(name, link) {
    const photoCard = photoContainer.cloneNode(true); //клонирование из temlate со всем содержимым
    const card = photoCard.querySelector('.card'); //выбираем саму карт
    const cardPic = photoCard.querySelector('.card__image'); //определяем внутри клона изо
    const cardName = photoCard.querySelector('.card__name'); //определяем внутри клона текст
    const cardLike = photoCard.querySelector('.card__like'); //определяем кнопку Лайка 
    const cardDel = card.querySelector('.card__delete'); //определяем в ней кнопку удалени
    cardPic.src = link; //присваиваем значения ссылке
    cardPic.alt = name; // присваиваем значения "Альту"
    cardName.textContent = name; // присваиваем значения имени

    //лайк карты
    cardLike.addEventListener('click', function(like) { //функция, которая говорит, что при взаимодействии с кнопкой лайка присваивается или наоборот модификатор активности
        like.target.classList.toggle('card__like_active');
    });

    //удаление карты
    function DeleteCard() { //функция говорит, что удаляет БЛИЖАЙШУЮ в разметке карту
        const photoCardtoDel = cardDel.closest('.card');
        photoCardtoDel.remove();
    }
    cardDel.addEventListener('click', DeleteCard); //слушатель на удаление

    // заполнение большого поупа ( с картинкой) + открытие
    function bigPoupFill() {
        poupFullImage.src = cardPic.src;
        poupImageText.textContent = cardName.textContent;
        openBigPoup();
    }

    cardPic.addEventListener('click', bigPoupFill); //слушатель на заполнение
    return photoCard; //возвращение 
}
initialCards.forEach((item) => placeForPhoto.append(addCard(item.name, item.link))); //добавление в конец

function addItem() {
    placeForPhoto.prepend(addCard(poupPlaceName.value, poupPlaceLink.value)); //добавление новых карт в контейнер
}

function addCardfromForm(evt) { //из формы
    evt.preventDefault();
    addItem();
    closePopupPhoto();
}

const insertTolistButton = document.querySelector('.poup__button_addTemplateItem'); // "сохранить" кнопка добавления
insertTolistButton.addEventListener('click', addCardfromForm);


function openPopup() { //открывает поуп и заполняет его с экрана
    poupOld.classList.add('poup_opened');
    poupName.value = userNick.textContent;
    poupJob.value = userJob.textContent;
}

function closePoup() { //закрывает поуп с юзером по крестику
    poupOld.classList.remove('poup_opened');
}

let formElement = document.querySelector('.poup__container');


function formSubmitHandler(evt) { //передает поуп текст на стену + enter
    evt.preventDefault();
    userNick.textContent = poupName.value;
    userJob.textContent = poupJob.value;
    closePoup();
}
formElement.addEventListener('submit', formSubmitHandler);
poupClose.addEventListener('click', closePoup);
userEdit.addEventListener('click', openPopup);

function openPopupPhoto() { //открытие редактора фото
    poupPhoto.classList.add('poup_opened');
}
photoEdit.addEventListener('click', openPopupPhoto);

function closePopupPhoto() { // закрытие редактора фото по крестику
    poupPhoto.classList.remove('poup_opened');
}
poupPhotoClose.addEventListener('click', closePopupPhoto);

function openBigPoup() { //открытие большого поупа
    poupWithImage.classList.add('poup_opened');
}

function closeBigPhoto() { //закрытие большого поупа
    poupWithImage.classList.remove('poup_opened')
};
poupImageClose.addEventListener('click', closeBigPhoto);
poupFullImage.addEventListener('click', closeBigPhoto);