//메인 탭 관련 js
window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.GMcarouseltrack');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const dotsNav = document.querySelector('.GMcarouseldots');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;
    let slideWidth = slides[0].getBoundingClientRect().width;

    function updateSlidePosition(index) {
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition(currentIndex);
    }

    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition(currentIndex);
    }

    function moveToSlide(index) {
        currentIndex = index;
        updateSlidePosition(currentIndex);
    }

    // 버튼 및 아이콘 클릭 이벤트 처리
    document.querySelectorAll('.GMcarouselbuttons button').forEach(button => {
        button.addEventListener('click', e => {
            if (e.target.closest('#next')) moveToNextSlide();
            if (e.target.closest('#prev')) moveToPrevSlide();
        });
    });

    dotsNav.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const targetIndex = dots.findIndex(dot => dot === e.target);
            moveToSlide(targetIndex);
        }
    });

    let autoSlide = setInterval(moveToNextSlide, 3000);

    document.querySelector('.GMcarousel').addEventListener('mouseover', () => clearInterval(autoSlide));
    document.querySelector('.GMcarousel').addEventListener('mouseout', () => autoSlide = setInterval(moveToNextSlide, 2000));

    // 윈도우 리사이즈 시 슬라이드 너비 재계산
    window.addEventListener('resize', () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        updateSlidePosition(currentIndex);
    });


});


