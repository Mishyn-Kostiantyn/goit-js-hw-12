import{A as M,S as v,i as u}from"./assets/vendor-db5ad915.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}})();const m=15,S=M.create({baseURL:"https://pixabay.com/api/",params:{key:"42121047-6dc093e186e55c34fb150394f",image_type:"photo",orientation:"horizontal",safesearch:"true"}});async function h(t,r){try{return(await S.get("",{params:{q:t,page:r,per_page:m}})).data}catch(a){throw O(a),a}}function y(t){const r=w(t);e.formForImagesGallery.insertAdjacentHTML("beforeend",r)}function w(t){return t.map(({webformatURL:r,largeImageURL:a,tags:n,likes:o,views:i,comments:c,downloads:b})=>`
    <li class="gallery-item">
        <a class="gallery-link" href="${a}">
          <img
            class="gallery-image"
            src="${r}"
            alt="${n}"
          />
          </a>
        <ul class="image-activity">
          <li class="image-activity-item">
            <h4 class="image-activity-type">Likes</h4>
            <p>${o}</p>
          </li>
          <li class="image-activity-item">
            <h4 class="image-activity-type">Views</h4>
            <p>${i}</p>
          </li>
          <li class="image-activity-item">
            <h4 class="image-activity-type">Comments</h4>
            <p>${c}</p>
            <li class="image-activity-item">
            <h4 class="image-activity-type">Downloads</h4>
            <p>${b}</p>
          </li>
          </li>
        </ul>
      </li>`).join("")}const e={searchingForm:document.querySelector(".input-form"),loaderSign:document.querySelector(".loader-container"),formForImagesGallery:document.querySelector(".gallery"),loadMoreButton:document.querySelector(".loadMore-button"),loadMoreButtonTextContent:document.querySelector(".lmbutton-text-content"),loaderLoadMore:document.querySelector(".loadMore"),observeTarget:document.querySelector(".js-target"),scrollLoader:document.querySelector(".loadMorescroll"),iternalScrollOption:document.querySelector('input[name="iternal-scroll"]')};let l=0,s=1,d="";const g={initial:"Load more",onLoad:"Loading images"};let B={root:document.querySelector("#scrollArea"),rootMargin:"0px",threshold:1};async function T(){const t=await h(d,s);l=Math.ceil(t.total/m),e.scrollLoader.classList.add("hide"),y(t.hits),p.refresh()}let q=(t,r)=>{t.forEach(a=>{if(a.isIntersecting){s=s+1,e.scrollLoader.classList.remove("hide"),T(),e.imagesGalleryItem=document.querySelector(".gallery-item");let n=3*Math.ceil(e.imagesGalleryItem.getBoundingClientRect().height);window.scrollBy({top:n,behavior:"smooth"}),s>=l&&(r.unobserve(e.observeTarget),e.observeTarget.classList.add("hide"),L())}})};const f=new IntersectionObserver(q,B);e.searchingForm.addEventListener("submit",A);e.loadMoreButton.addEventListener("click",E);function C(){u.warning({color:"red",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"})}function I(){u.warning({color:"red",message:"TYPE SOME WORD/WORDS, PLEASE!",position:"topCenter"})}function L(){u.info({timeout:3e3,message:"We're sorry, but you've reached the end of search results. ",position:"topCenter"})}function x(){e.formForImagesGallery.innerHTML=""}function O(t){u.error({timeout:3e3,message:`An error: ${t} occurred while processing your request `,position:"topCenter"})}async function A(t){t.preventDefault();let r=!!e.iternalScrollOption.checked;if(l=0,s=1,f.unobserve(e.observeTarget),e.observeTarget.classList.contains("hide")||e.observeTarget.classList.add("hide"),e.loadMoreButton.classList.contains("hide")||e.loadMoreButton.classList.add("hide"),x(),e.loaderSign.classList.remove("hide"),e.loadMoreButton.classList.add("hide"),d=t.target.elements.query.value,d.trim()!==""){const a=await h(d,s);a.hits==0?(e.loaderSign.classList.add("hide"),C()):(e.loaderSign.classList.add("hide"),y(a.hits),p.refresh(),l=Math.ceil(a.total/m),l>1&&(r?(e.observeTarget.classList.remove("hide"),f.observe(e.observeTarget)):e.loadMoreButton.classList.remove("hide"))),e.searchingForm.reset()}else e.loaderSign.classList.add("hide"),I()}async function E(){s=s+1,e.loaderLoadMore.classList.remove("hide"),e.loadMoreButton.setAttribute("disabled","true"),e.loadMoreButtonTextContent.textContent=g.onLoad;const t=await h(d,s);l=Math.ceil(t.total/m),e.loaderLoadMore.classList.add("hide"),y(t.hits),p.refresh(),e.imagesGalleryItem=document.querySelector(".gallery-item");let r=3*Math.ceil(e.imagesGalleryItem.getBoundingClientRect().height);window.scrollBy({top:r,behavior:"smooth"}),console.log(l),console.log(s),l>s?(e.loadMoreButton.removeAttribute("disabled"),e.loadMoreButtonTextContent.textContent=g.initial):(e.loadMoreButton.removeAttribute("disabled"),e.loadMoreButtonTextContent.textContent=g.initial,e.loadMoreButton.classList.add("hide"),L())}let p=new v(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
