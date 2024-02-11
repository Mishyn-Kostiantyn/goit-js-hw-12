import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import getImageGallery from "./js/pixabay-api";
import renderImageGallery from "./js/render-function";
import { numberOfImagesPerPage } from "./js/pixabay-api";
export const ref = {
    formForInputSearchingParametersForImages: document.querySelector('.input-form'),
    containerForLoaderSign: document.querySelector('.loader-container'),
    formForImagesGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.loadMore-button'),
    loaderForLoadMoreOperation: document.querySelector('.loadMore'),
    };
let totalNumberOfPages = 0;
let pageNumber = 1;
let searchingTheme = '';

ref.formForInputSearchingParametersForImages.addEventListener('submit', onFormSubmit);
ref.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);

function showWarningMessage() {
    iziToast.warning({
        color: 'red',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    position: 'topCenter',
    });
};

function showWarningMessageForEmptyInput() {
    iziToast.warning({
        color: 'red',
    message: 'TYPE SOME WORD/WORDS, PLEASE!',
    position: 'topCenter',
    });
};

function showinfoMessage() {
  iziToast.info({
      timeout: 3000,
      message: `We're sorry, but you've reached the end of search results. `,
      position: 'topCenter',
    });
}

function deleteImageGalleryMarkup() {
    ref.formForImagesGallery.innerHTML = '';
};

function showErrorMessage(error) {
  iziToast.error({
      timeout: 3000,
      message: `An error: ${error} occurred while processing your request `,
      position: 'topCenter',
    });
}

async function onFormSubmit(event) {
    event.preventDefault();
    totalNumberOfPages = 0;
    pageNumber = 1;
    console.log('Page number on Submit:', pageNumber);
    if (!ref.loadMoreButton.classList.contains('hide')) { ref.loadMoreButton.classList.add('hide'); };
  deleteImageGalleryMarkup();
    ref.containerForLoaderSign.classList.remove('hide');
        ref.loadMoreButton.classList.add('hide');
     searchingTheme= event.target.elements.query.value;
    if (searchingTheme.trim() !== '') {
        const data = await getImageGallery(searchingTheme,pageNumber);
         if (data.hits == 0) {
        ref.containerForLoaderSign.classList.add('hide');
        showWarningMessage();
      }
      else {
        ref.containerForLoaderSign.classList.add('hide');
          renderImageGallery(data.hits);
          lightbox.refresh();
             totalNumberOfPages = Math.ceil(data.total / numberOfImagesPerPage);
             console.log('total number of page:', totalNumberOfPages);
             if (totalNumberOfPages > 1) { ref.loadMoreButton.classList.remove('hide'); }
        
      } 
    ref.formForInputSearchingParametersForImages.reset()
    }
    else {
    ref.containerForLoaderSign.classList.add('hide');
    showWarningMessageForEmptyInput();
  }
};

async function onLoadMoreButtonClick() {
    pageNumber = pageNumber + 1;
    ref.loadMoreButton.classList.add('hide');
    ref.loaderForLoadMoreOperation.classList.remove('hide');
    const data = await getImageGallery(searchingTheme,pageNumber);
    totalNumberOfPages = Math.ceil(data.total / numberOfImagesPerPage);
    ref.loaderForLoadMoreOperation.classList.add('hide');
    renderImageGallery(data.hits);
    lightbox.refresh();
    ref.imagesGalleryItem = document.querySelector('.gallery-item');
    let h = 3*Math.ceil(ref.imagesGalleryItem.getBoundingClientRect().height);
    console.log(h);
    window.scrollBy({
        top: h,
        behavior: 'smooth',
    });
    if (totalNumberOfPages > pageNumber) {
        ref.loadMoreButton.classList.remove('hide');
        
    } else {
        ref.loadMoreButton.classList.add('hide');
        showinfoMessage();
    }
    
    
}

let lightbox = new SimpleLightbox('.gallery a',
    {
    captionsData: 'alt', captionDelay: 250,
    }
);
export default showErrorMessage