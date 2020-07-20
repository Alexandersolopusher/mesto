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


const userNick = document.querySelector('.user__nickname'); //let
const userEdit = document.querySelector('.user__edit'); //КНОПКА ЭДИТ
const userJob = document.querySelector('.user__subtittle'); //let
const popup = document.querySelector('.popup'); // ПОПАП С РЕДАКТОРОМ ПРОФИЛЯ
const popupClose = document.querySelector('.popup__close'); //КНОПКА ЗАКРЫТИЯ РЕДАКТОРА ПРОФИЛЯ
const popupName = document.querySelector('.popup__section_nickname'); //let имя в попе top
const popupJob = document.querySelector('.popup__section_subtittle'); //let подпись попа bot
const photoEdit = document.querySelector('.user__place-button') //КНОПКА +
const popupPlaceName = document.querySelector('.popup__section_placename') // Название места
const popupPlaceLink = document.querySelector('.popup__section_placlink') // поле для ссылки на место
const popupWithImage = document.querySelector('.popup_image-add'); //ПОПАП С КАРТИНКОЙ
const popupFullImage = document.querySelector('.popup__image-picture'); //картинка БОЛЬШАЯ на поупе
const popupImageText = document.querySelector('.popup__image-text'); // текст под картинкой Поупа
//try hard
const photoContainer = document.querySelector('#photo-container').content; //выбрали темлейт
const placeForPhoto = document.querySelector('.photo-gallery'); //сюда вставлять
const popupAddPhoto = document.querySelector('.popup_photo-add'); //ПОПАП С РЕДАКТОРОМ КАРТОЧКИ
const popupAddPhotoClose = document.querySelector('.popup__close_photo-add'); //КНОПКА ЗАКРЫТИЯ РЕДАКТОРА КАРТОЧКИ
const buttonToList = document.querySelector('.popup__button_addTemplateItem'); // "сохранить" кнопка добавления
const popupEnterContainer = document.querySelector('.popup__container');
const popupImageAddClose = document.querySelector('.popup__close_image-add'); //КРЕСТИК ЗАКРЫТИЯ ПОПАПА С КАРТИНКОЙ

function likeCard(like) { //функция лайка карты
    like.target.classList.toggle('card__like_active');
}

function cardDelete(del) { //функция говорит, что удаляет БЛИЖАЙШУЮ в разметке карту
    const photocardDel = del.target.closest('.card');
    photocardDel.remove();
}

function fillPopupBig(img) {
    openPopup(popupWithImage);
    const element = img.target.closest('.card'); //заполнение большого поупа картинкой + открытие
    popupFullImage.src = element.querySelector('.card__image').src;
    popupFullImage.alt = element.querySelector('.card__name').alt;
    popupImageText.textContent = element.querySelector('.card__name').textContent;
}

function addCard(name, link) { // добавление новой карты ( все действия с картой, внутри этой функции)
    const photoCard = photoContainer.cloneNode(true); //клонирование из temlate со всем содержимым
    const cardPic = photoCard.querySelector('.card__image'); //определяем  изо
    const cardName = photoCard.querySelector('.card__name'); //определяем  текст
    const cardLike = photoCard.querySelector('.card__like'); //определяем кнопку Лайка 
    const cardDel = photoCard.querySelector('.card__delete'); //определяем  кнопку удалени
    cardPic.src = link; //присваиваем значения ссылке
    cardPic.alt = name; // присваиваем значения "Альту"
    cardName.textContent = name; // присваиваем значения имени
    //лайк карты
    cardLike.addEventListener('click', likeCard);
    //удление карты
    cardDel.addEventListener('click', cardDelete); //слушатель на удаление
    //открытие большого попа
    cardPic.addEventListener('click', fillPopupBig);
    return photoCard; //возвращение 
}

initialCards.forEach((item) => placeForPhoto.append(addCard(item.name, item.link))); //добавление в конец

function addItem() {
    placeForPhoto.prepend(addCard(popupPlaceName.value, popupPlaceLink.value)); //добавление новых карт в контейнер
}

//ESC
function targetEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.keyCode === 27) {
        closePopup(popupOpened);
    }
}

function handleSubmitForm(evt) { //из формы
    evt.preventDefault();
    addItem();
    closePopup(popupAddPhoto);
}
//CLICK
function onClickOutsidePopup(event) {
    const popupOpened = document.querySelector('.popup_opened');
    const popupContainer = popupOpened.querySelector('.container')

    if (!popupContainer.contains(event.target)) {
        closePopup(event.target.closest('.popup')); //
    }
}

function initializeFields() {
    popupName.value = userNick.textContent;
    popupJob.value = userJob.textContent;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', onClickOutsidePopup);
    document.addEventListener('keydown', targetEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    popup.removeEventListener('click', onClickOutsidePopup);
    document.removeEventListener('keydown', targetEsc);
}
//function closePopup() {
//    const popupOpened = document.querySelector('.popup_opened');
//    popupOpened.classList.remove('popup_opened');
//    popupOpened.removeEventListener('click', onClickOutsidePopup);
//    document.removeEventListener('keydown', targetEsc);
//}

function formToWall(evt) { //передает поуп текст на стену + enter
    evt.preventDefault();
    userNick.textContent = popupName.value;
    userJob.textContent = popupJob.value;
    closePopup(popup);
}

userEdit.addEventListener('click', () => {
    initializeFields();
    openPopup(popup);
});
popupImageAddClose.addEventListener('click', () => closePopup(popupWithImage)); //Закрытие попапа с картинкой по крестику
popupAddPhotoClose.addEventListener('click', () => closePopup(popupAddPhoto)); //Закрытие редактора карточки по кресту
photoEdit.addEventListener('click', () => openPopup(popupAddPhoto));
popupEnterContainer.addEventListener('submit', formToWall);
buttonToList.addEventListener('click', handleSubmitForm); //поп сохранением закрыт ( в добавлении карточки)
popupClose.addEventListener('click', () => closePopup(popup)); //Закрытие редактора профиля по кресту

enableValidation(validationParams);