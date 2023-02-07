// 1. Створення і рендер розмітки на підставі масиву даних 
// galleryItems і наданого шаблону елемента галереї.
// 2. Реалізація делегування на div.gallery і отримання url 
// великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального 
// вікна basicLightbox.Використовуй CDN сервіс jsdelivr 
// і додай у проект посилання на мініфіковані(.min) 
// файли бібліотеки.
// 4. Відкриття модального вікна по кліку на елементі галереї. 
// Для цього ознайомся з документацією і прикладами.
// 5. Заміна значення атрибута src елемента <img> в модальному 
// вікні перед відкриттям.Використовуй готову розмітку 
// модального вікна із зображенням з прикладів 
// бібліотеки basicLightbox.

import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryRef = document.querySelector('.gallery');
const galleryMarkup = createGallery(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
galleryRef.addEventListener("click", onGalleryRefClick);
let modalWindow;

function createGallery(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `
  }).join('');
}

function onGalleryRefClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  modalWindow = basicLightbox.create(
    `<img src='${event.target.dataset.source}' width="800" height="600">`,
    {
      onShow: modalWindow => {
        window.addEventListener('keydown', onEscKeyPress);
      },
      onClose: modalWindow => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );
function onEscKeyPress(evt) {
    if (evt.code === "Escape" && basicLightbox.visible()) {
      modalWindow.close();
    }
  }
  modalWindow.show();
}



