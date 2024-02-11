
import { ref } from "../main.js";

export default function renderImageGallery(images) {
    const markup = createImageCardMarkup(images);
    ref.formForImagesGallery.insertAdjacentHTML('beforeend',markup);
   
}

function createImageCardMarkup(images) {
  return images.map(({ webformatURL, largeImageURL, tags,likes, views, comments,downloads }) => {
    return `
    <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
          </a>
        <ul class="image-activity">
          <li class="image-activity-item">
            <h4 class="image-activity-type">Likes</h4>
            <p>${likes}</p>
          </li>
          <li class="image-activity-item">
            <h4 class="image-activity-type">Views</h4>
            <p>${views}</p>
          </li>
          <li class="image-activity-item">
            <h4 class="image-activity-type">Comments</h4>
            <p>${comments}</p>
            <li class="image-activity-item">
            <h4 class="image-activity-type">Downloads</h4>
            <p>${downloads}</p>
          </li>
          </li>
        </ul>
      </li>`
  }).join('');
};