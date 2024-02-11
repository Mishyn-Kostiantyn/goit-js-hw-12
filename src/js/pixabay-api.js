import Axios from "axios";
import showErrorMessage from "../main";


export const numberOfImagesPerPage = 15;

const specificAxios = Axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: { 
        key: '42121047-6dc093e186e55c34fb150394f',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    }
});

async function getImageGallery(whatAreWeSearching, pageNumber) {
    try {
        const response = await specificAxios.get('', {
            params: {
                q: whatAreWeSearching,
                page: pageNumber,
                per_page: numberOfImagesPerPage,
            }
        });
        return response.data; 
    } catch (error) {
        showErrorMessage(error);
        throw error;
    }
}

export default getImageGallery;
