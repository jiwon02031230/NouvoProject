//faq 열고닫기 js 시작
function toggleAnswer(element) {
    const answer = element.nextElementSibling;

    if (answer.classList.contains("open")) {
        answer.style.maxHeight = null; // 닫기
        answer.classList.remove("open"); // 클래스 제거
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px"; // 열기
        answer.classList.add("open"); // 클래스 추가
    }
}//faq 열고닫기 js 끝