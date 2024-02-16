'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import getImageGallery from "./js/pixabay-api";
import renderImageGallery from "./js/render-function";
import { numberOfImagesPerPage } from "./js/pixabay-api";
export const ref = {
    searchingForm: document.querySelector('.input-form'),
    loaderSign: document.querySelector('.loader-container'),
    formForImagesGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.loadMore-button'),
    loadMoreButtonTextContent: document.querySelector('.lmbutton-text-content'),
    loaderLoadMore: document.querySelector('.loadMore'),
    observeTarget: document.querySelector('.js-target'),
    scrollLoader: document.querySelector('.loadMorescroll'),
    iternalScrollOption: document.querySelector('input[name="iternal-scroll"]'),
};
    
let totalNumberOfPages = 0;
let pageNumber = 1;
let searchingTheme = '';
let onSubmit = false;
const lMTextContent = { initial: 'Load more', onLoad: 'Loading images' };
let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};
async function onLoadMore() {
    const data = await getImageGallery(searchingTheme,pageNumber);
    totalNumberOfPages = Math.ceil(data.total / numberOfImagesPerPage);
    ref.scrollLoader.classList.add('hide');
    renderImageGallery(data.hits);
    lightbox.refresh();
}
let callback = (entries, observer) => {
    entries.forEach
        (entry => {
            if (entry.isIntersecting) {
                pageNumber = pageNumber + 1;
                ref.scrollLoader.classList.remove('hide');
                onLoadMore();
                ref.imagesGalleryItem = document.querySelector('.gallery-item');
                let h = 3 * Math.ceil(ref.imagesGalleryItem.getBoundingClientRect().height);
                window.scrollBy({
                    top: h,
                    behavior: 'smooth',
                });
                if ( pageNumber>=totalNumberOfPages) {
                    observer.unobserve(ref.observeTarget);
                    ref.observeTarget.classList.add('hide');
                    showinfoMessage();
                    }
                 }
        })
};
const observer = new IntersectionObserver(callback, options);


ref.searchingForm.addEventListener('submit', onFormSubmit);
ref.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
ref.iternalScrollOption.addEventListener('change', onIternalScrollChange);

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
function onIternalScrollChange() {
    if (onSubmit)
    {
        if (ref.iternalScrollOption.checked)
        {
            ref.loadMoreButton.classList.add('hide')
            ref.observeTarget.classList.remove('hide');
            observer.observe(ref.observeTarget);
            
        } else {
             observer.unobserve(ref.observeTarget);
             ref.observeTarget.classList.add('hide');
            ref.loadMoreButton.classList.remove('hide');
        }
    }
    else { return; }
}
async function onFormSubmit(event) {
    event.preventDefault();
    onSubmit = true;
    let onIternalScroll = ref.iternalScrollOption.checked ? true : false;
    totalNumberOfPages = 0;
    pageNumber = 1;
    observer.unobserve(ref.observeTarget);
    if (!ref.observeTarget.classList.contains('hide')) { ref.observeTarget.classList.add('hide'); };
    if (!ref.loadMoreButton.classList.contains('hide')) { ref.loadMoreButton.classList.add('hide'); };
    deleteImageGalleryMarkup();
    ref.loaderSign.classList.remove('hide');
    ref.loadMoreButton.classList.add('hide');
    searchingTheme= event.target.elements.query.value;
    if (searchingTheme.trim() !== '')
       {
        const data = await getImageGallery(searchingTheme,pageNumber);
        if (data.hits == 0)
          {
          ref.loaderSign.classList.add('hide');
          showWarningMessage();
         }
        else
        {
        ref.loaderSign.classList.add('hide');
        renderImageGallery(data.hits);
        lightbox.refresh();
        totalNumberOfPages = Math.ceil(data.total / numberOfImagesPerPage);
         if (totalNumberOfPages > 1)
          {
             if (onIternalScroll) {
                 ref.observeTarget.classList.remove('hide');
                 observer.observe(ref.observeTarget);
             }
             else
             {
                 ref.loadMoreButton.classList.remove('hide');
             }
          }
        } 
        ref.searchingForm.reset()
       }
    else
    {
    ref.loaderSign.classList.add('hide');
    showWarningMessageForEmptyInput();
    }
};

async function onLoadMoreButtonClick()
{
    pageNumber = pageNumber + 1;
    ref.loaderLoadMore.classList.remove('hide');
    ref.loadMoreButton.setAttribute('disabled', "true");
    ref.loadMoreButtonTextContent.textContent = lMTextContent.onLoad;
    const data = await getImageGallery(searchingTheme,pageNumber);
    totalNumberOfPages = Math.ceil(data.total / numberOfImagesPerPage);
    ref.loaderLoadMore.classList.add('hide');
    renderImageGallery(data.hits);
    lightbox.refresh();
    ref.imagesGalleryItem = document.querySelector('.gallery-item');
    let h = 3*Math.ceil(ref.imagesGalleryItem.getBoundingClientRect().height);
    window.scrollBy
        ({
        top: h,
        behavior: 'smooth',
        });
    console.log(totalNumberOfPages);
    console.log(pageNumber);
    if (totalNumberOfPages > pageNumber)
    {
        ref.loadMoreButton.removeAttribute('disabled');
        ref.loadMoreButtonTextContent.textContent=lMTextContent.initial;
    }
    else
    {
        ref.loadMoreButton.removeAttribute('disabled');
        ref.loadMoreButtonTextContent.textContent=lMTextContent.initial;
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