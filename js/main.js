"use strict";
const COUNT = 25;
const message = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const userName = [`Артем`, `Андрей`, `Иван`, `Саша`, `Маша`, `Даша`, `Настя`];

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min;

const createPhotoObject = (item) => {
  return {
    url: `photos/${item}.jpg`,
    description: ``,
    likes: getRandomNumber(15, 200),
    comments: [{
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: message[getRandomNumber(0, message.length)],
      name: userName[getRandomNumber(0, userName.length)]
    }],
  };
};

const photoArr = [];
for (let i = 1; i <= COUNT; i++) {
  photoArr.push(createPhotoObject(i));
}

const pictures = document.querySelector(`.pictures`);
const fragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const renderPictures = (picturesArr) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = picturesArr.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picturesArr.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picturesArr.comments.length;
  return pictureElement;
};

photoArr.forEach((photo) => fragment.appendChild(renderPictures(photo)));
pictures.appendChild(fragment);

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`.big-picture__img img`);
const bigPictureLikes = bigPicture.querySelector(`.likes-count`);
const bigPictureCommentsCount = bigPicture.querySelector(`.comments-count`);
const bigPictureSocial = bigPicture.querySelector(`.social`);

const bigPictureComments = bigPictureSocial.querySelector(`.social__comments`);
const bigPictureCommentsCaption = bigPictureSocial.querySelector(`.social__caption`);
const commentsLoaderButton = bigPictureSocial.querySelector(`.comments-loader`);
const commentsCount = bigPictureSocial.querySelector(`.social__comment-count`);

bigPicture.classList.remove(`hidden`);
bigPictureImg.src = photoArr[0].url;
bigPictureLikes.textContent = photoArr[0].likes;
bigPictureCommentsCount.textContent = photoArr[0].comments.length;

const makeComment = (arr) => {
  let element = document.createElement(`li`);
  element.classList.add(`social__comment`);

  let elementImg = document.createElement(`img`);
  element.appendChild(elementImg);

  elementImg.classList.add(`social__picture`);
  elementImg.src = arr[0].avatar;
  elementImg.alt = arr[0].name;
  elementImg.width = 35;
  elementImg.height = 35;
  let elementText = document.createElement(`p`);
  element.appendChild(elementText);
  elementText.classList.add(`social__text`);
  elementText.textContent = arr[0].message;
  return element;
};
x
const renderComments = (arr) => {
  bigPictureComments.innerHTML = ``;
  bigPictureComments.appendChild(makeComment(arr));
  bigPictureCommentsCaption.textContent = arr.description;
  return bigPictureComments;
};

renderComments(photoArr[0].comments);
commentsLoaderButton.classList.add(`hidden`);
commentsCount.classList.add(`hidden`);
document.querySelector(`body`).classList.add(`modal-open`);
