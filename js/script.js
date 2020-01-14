nextButton = document.querySelector('.articles__nav-button--next');
prevButton = document.querySelector('.articles__nav-button--previous');

articles = document.querySelectorAll('.articles__container');

let currentItem = 0;

function clickNext() {
    if (currentItem === articles.length - 1 || articles.length - currentItem <= 4) {
        return
    }
    articles[currentItem].classList.add('js-slider__visibility-hidden');
    currentItem += 1;
}

function clickPrev() {
    if (currentItem === 0) {
        return
    }
    articles[currentItem - 1].classList.remove('js-slider__visibility-hidden');
    currentItem -= 1;
}

nextButton.addEventListener('click', clickNext);
prevButton.addEventListener('click', clickPrev);

let reviews = [ {
    reviewHeadline: '«Шальные годы» Монпарнаса',
    imgURL: 'img/rw1.png',
    reviewDescription: 'В Музее изобразительных искусств имени Пушкина с 29 сентября по 29 ноября проходит выставка «Шальные годы Монпарнаса»',
    reviewBookmark: 'img/bookmark.svg',
    reviewViews: 'img/views.svg',
    reviewComments: 'img/comments.svg'
},
    {
        reviewHeadline: 'Анатомия за 30 секунд',
        imgURL: 'img/rw2.png',
        reviewDescription: 'Сейчас, когда мир открыт нараспашку для человека и его познавательных изысканий, интереск научно-популярной литературе заметно вырос',
        reviewBookmark: 'img/bookmark.svg',
        reviewViews: 'img/views.svg',
        reviewComments: 'img/comments.svg'
    },
    {
        reviewHeadline: 'Русские балетные сезоны',
        imgURL: 'img/rw3.png',
        reviewDescription: 'В Новом Иерусалиме стартовал необычный культурно-развлекательный спектакль, который покажут в новом театре',
        reviewBookmark: 'img/bookmark.svg',
        reviewViews: 'img/views.svg',
        reviewComments: 'img/comments.svg'
    },
    {
        reviewHeadline: 'Сферические чудаки',
        imgURL: 'img/rw4.png',
        reviewDescription: 'Корреспондентам «Культурного обозревателя» посчастливилось побывать в театре «Сфера» на премьере спектакля «Чудаки и зануды» ',
        reviewBookmark: 'img/bookmark.svg',
        reviewViews: 'img/views.svg',
        reviewComments: 'img/comments.svg'
    }
];
const pagination = document.querySelector('.pagination__numbers');
const reviewsWrapper = document.querySelector('.reviews');

function reviewGenerator (numberOfItems) {
    for (let i = 0; i <= numberOfItems; i++) {
        let string = Math.random().toString(36).substr(2, 5);
        let f = Math.floor(1 + Math.random() * (4 + 1 - 1));
        let review = {
            reviewHeadline: string,
            imgURL: `img/rw${f}.png`,
            reviewDescription: `${string} \n ${string} \n ${string}`,
            reviewBookmark: 'img/bookmark.svg',
            reviewViews: 'img/views.svg',
            reviewComments: 'img/comments.svg'
        };
        reviews.push(review);
    }
}

reviewGenerator(12);

let currentPage = 1;
let reviewsNumber = 4;

function displayReviews(reviews, reviewsWrapper, reviewsNumber, page) {
    page--;

    let start = reviewsNumber * page;
    let end = start + reviewsNumber;

    let paginatedReviews = reviews.slice(start, end);

    for (let i = 0; i < paginatedReviews.length; i++) {
        let review = paginatedReviews[i];

        let reviewContainer = document.createElement('div');
        reviewContainer.classList.add('reviews__container');

        let reviewHeadlineEl = document.createElement('h3');
        reviewHeadlineEl.classList.add('reviews__headline');
        reviewHeadlineEl.innerText = review.reviewHeadline;
        reviewContainer.appendChild(reviewHeadlineEl);

        let reviewDescriptionEl = document.createElement('p');
        reviewDescriptionEl.classList.add('reviews__description');
        reviewDescriptionEl.innerText = review.reviewDescription;
        reviewContainer.appendChild(reviewDescriptionEl);

        let reviewImgEl = document.createElement('img');
        reviewImgEl.classList.add('reviews__img');
        reviewImgEl.src = review.imgURL;
        reviewContainer.appendChild(reviewImgEl);

        reviewsWrapper.appendChild(reviewContainer);
    }
}

/*displayReviews(reviews, reviewsWrapper, reviewsNumber, currentPage);*/

function setupPagination(reviews, wrapper, reviewsNumber) {
    let pageCount = Math.ceil(reviews.length / reviewsNumber);
    for (let i = 1; i < pageCount + 1; i++) {
        let paginationItem = paginationItems(i, reviews);
        if (i === pageCount) {
            paginationItem.children[0].classList.add('number__button--last')
        }
        wrapper.appendChild(paginationItem);
    }
}

function paginationItems(page, reviews) {
    let paginationNumber = document.createElement('li');
    paginationNumber.classList.add('pagination__number');
    let button = document.createElement('button');
    button.classList.add('number__button');
    button.classList.add(`number__button--${page}`);
    button.innerText = page;

    if (currentPage === page) button.classList.add('number__button--active');

    button.addEventListener('click', () => {
        currentPage = page;
        /*displayReviews(reviews, reviewsWrapper, reviewsNumber, currentPage);*/

        let currentBtn = document.querySelector('.number__button--active');
        currentBtn.classList.remove('number__button--active');
        button.classList.add('number__button--active');

    });

    paginationNumber.appendChild(button);

    return paginationNumber;
}

setupPagination(reviews, pagination, reviewsNumber);

let pagBtnLeft = document.querySelector('.pagination__button--previous');
let pagBtnRight = document.querySelector('.pagination__button--next');

pagBtnLeft.addEventListener('click', () => {
    if (currentPage === 1) return;
    currentPage -= 1;
    makeBtnActive(currentPage);
});

pagBtnRight.addEventListener('click', () => {
    if (currentPage === Math.ceil(reviews.length / reviewsNumber)) return;
    currentPage += 1;
    makeBtnActive(currentPage);
});

function makeBtnActive(page) {
    let currentBtn = document.querySelector('.number__button--active');
    currentBtn.classList.remove('number__button--active');
    let btn = document.querySelector(`.number__button--${page}`);
    btn.classList.add('number__button--active');
}

let menuButton = document.querySelector('.menu__button');
let closeButton = document.querySelector('.menu__button--close');
let menu = document.querySelector('.header__menu');

menuButton.addEventListener('click', () => {
    menu.classList.add('header__menu--mobile');
    closeButton.classList.remove('visually-hidden');
});

closeButton.addEventListener('click', () => {
    menu.classList.remove('header__menu--mobile');
    closeButton.classList.add('visually-hidden');
});



