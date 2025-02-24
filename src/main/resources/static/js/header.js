// 헤더 클릭 시 빨간색 유지~
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#nav .nav1 a");
    const currentPath = window.location.pathname; // 현재 URL 경로 가져오기

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active"); // 현재 페이지에 해당하는 링크에 active 클래스 추가
        }
    });
});

//=======================================

//사이드바
document.addEventListener("DOMContentLoaded", function () {

    //01.맨 위로
    document.getElementById("scrollTopBtn").addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});

function alertAndRedirect() {
    alert("로그인이 필요합니다.");
    window.location.href = "/login"; // 로그인 페이지로 이동
}

