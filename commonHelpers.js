import{A as y,S as L,i as m}from"./assets/vendor-db5ad915.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();const u=15,M=y.create({baseURL:"https://pixabay.com/api/",params:{key:"42121047-6dc093e186e55c34fb150394f",image_type:"photo",orientation:"horizontal",safesearch:"true"}});async function g(r,o){try{return(await M.get("",{params:{q:r,page:o,per_page:u}})).data}catch(i){throw w(i),i}}function p(r){const o=S(r);e.formForImagesGallery.insertAdjacentHTML("beforeend",o)}function S(r){return r.map(({webformatURL:o,largeImageURL:i,tags:c,likes:t,views:a,comments:l,downloads:f})=>`
    <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img
            class="gallery-image"
            src="${o}"
            alt="${c}"
          />
          </a>
        <ul class="image-activity">
          <li class="image-activity-item">
            <h4 class="image-activity-type">Likes</h4>
            <p>${t}</p>
          </li>
          <li class="image-activity-item">
            <h4 class="image-activity-type">Views</h4>
            <p>${a}</p>
          </li>
          <li class="image-activity-item">
            <h4 class="image-activity-type">Comments</h4>
            <p>${l}</p>
            <li class="image-activity-item">
            <h4 class="image-activity-type">Downloads</h4>
            <p>${f}</p>
          </li>
          </li>
        </ul>
      </li>`).join("")}const e={formForInputSearchingParametersForImages:document.querySelector(".input-form"),containerForLoaderSign:document.querySelector(".loader-container"),formForImagesGallery:document.querySelector(".gallery"),loadMoreButton:document.querySelector(".loadMore-button"),loaderForLoadMoreOperation:document.querySelector(".loadMore")};let n=0,s=1,d="";e.formForInputSearchingParametersForImages.addEventListener("submit",O);e.loadMoreButton.addEventListener("click",P);function b(){m.warning({color:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"})}function v(){m.warning({color:"red",message:"TYPE SOME WORD/WORDS, PLEASE!",position:"topCenter"})}function F(){m.info({timeout:3e3,message:"We're sorry, but you've reached the end of search results. ",position:"topCenter"})}function I(){e.formForImagesGallery.innerHTML=""}function w(r){m.error({timeout:3e3,message:`An error: ${r} occurred while processing your request `,position:"topCenter"})}async function O(r){if(r.preventDefault(),n=0,s=1,console.log("Page number on Submit:",s),e.loadMoreButton.classList.contains("hide")||e.loadMoreButton.classList.add("hide"),I(),e.containerForLoaderSign.classList.remove("hide"),e.loadMoreButton.classList.add("hide"),d=r.target.elements.query.value,d.trim()!==""){const o=await g(d,s);o.hits==0?(e.containerForLoaderSign.classList.add("hide"),b()):(e.containerForLoaderSign.classList.add("hide"),p(o.hits),h.refresh(),n=Math.ceil(o.total/u),console.log("total number of page:",n),n>1&&e.loadMoreButton.classList.remove("hide")),e.formForInputSearchingParametersForImages.reset()}else e.containerForLoaderSign.classList.add("hide"),v()}async function P(){s=s+1,e.loadMoreButton.classList.add("hide"),e.loaderForLoadMoreOperation.classList.remove("hide");const r=await g(d,s);n=Math.ceil(r.total/u),e.loaderForLoadMoreOperation.classList.add("hide"),p(r.hits),h.refresh(),e.imagesGalleryItem=document.querySelector(".gallery-item");let o=3*Math.ceil(e.imagesGalleryItem.getBoundingClientRect().height);console.log(o),window.scrollBy({top:o,behavior:"smooth"}),n>s?e.loadMoreButton.classList.remove("hide"):(e.loadMoreButton.classList.add("hide"),F())}let h=new L(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
