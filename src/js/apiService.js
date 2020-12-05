const BASE_URL = 'https://pixabay.com/api';
const KEY = '19246531-fc0b1c1353c7051ee5ebaba0f';

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    async fetchImages() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
        try {
            const response = await fetch(url);
            const newImages = await response.json();
            this.incrementPage();
            return newImages.hits;
        } catch (error) {
            return Promise.reject(new Error(response.statusText));
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}

