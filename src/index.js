import './styles.css';
import '../node_modules/modern-normalize/modern-normalize.css';
import photoCardTpl from './templates/photo-card.hbs';
import ImagesApiService from './js/apiService.js';

const refs = {
    searchForm: document.querySelector('#search-form'),
    imageGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
    image: document.querySelector('#id')
}
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// !! on async/await !!
async function onSearch(e) {

    e.preventDefault();
    try {
        imagesApiService.query = e.currentTarget.elements.query.value;
        imagesApiService.resetPage();
        const imagesList = await imagesApiService.fetchImages();
        const render = (hits) => {
            clearImagesContainer();
            appendImages(hits);
        }
        if (imagesList.length === 0 || imagesApiService.query === '') {
            alert('Try again! Incorrect input!');
        }
        return render(imagesList);
    } catch {
        alert('Sorry, the service cannot process your request😨. Try again, please.');
    }

}

async function onLoadMore(e) {
    const imagesList = await imagesApiService.fetchImages();
    return appendImages(imagesList);

}
// !! on promises !!
// function onSearch(e) {
//     e.preventDefault();

//     imagesApiService.query = e.currentTarget.elements.query.value
//     imagesApiService.resetPage();
//     imagesApiService.fetchImages().then(hits => {
//         clearImagesContainer();
//         appendImages(hits);
//     })
// }

// function onLoadMore(e) {
//     imagesApiService.fetchImages().then(appendImages);

// }
function scroll(position) {
    window.scrollTo({
        top: position + refs.searchForm.clientHeight,
        behavior: 'smooth',
    });
}

function appendImages(hits) {
    const position = refs.imageGallery.clientHeight;
    refs.imageGallery.insertAdjacentHTML('beforeend', photoCardTpl(hits));
    scroll(position);
}


function clearImagesContainer() {
    refs.imageGallery.innerHTML = '';
}