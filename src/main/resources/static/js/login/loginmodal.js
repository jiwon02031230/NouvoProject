function checkLoginAndRedirect(url) {
    fetch('/api/checkLoginStatus', {
        method: 'GET',
        credentials: "include" // ⭐ 세션 쿠키 포함 ⭐
    })
        .then(response => response.json())
        .then(data => {
            console.log("로그인 상태:", data);
            if (data.loggedIn) {
                window.location.href = url; // 🔥 마이페이지뿐만 아니라 다양한 URL에 사용 가능!
            } else {
                Swal.fire({
                    title: "로그인이 필요합니다",
                    text: "서비스를 이용하려면 먼저 로그인 해주세요.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "로그인",
                    cancelButtonText: "닫기",
                    customClass: {
                        confirmButton: "custom-btn",  // 🔥 확인 버튼 스타일 지정
                        cancelButton: "custom-cancel" // 기본 취소 버튼 스타일
                    },
                    buttonsStyling: false // SweetAlert 기본 버튼 스타일 제거
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/login"; // 로그인 페이지로 이동
                    }
                });
            }
        })
        .catch(error => console.error("로그인 상태 확인 중 오류 발생:", error)); // 오류 로깅
}
