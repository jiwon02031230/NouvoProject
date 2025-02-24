document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".GILFbtnsubmit").addEventListener("click", function (event) {
        let title = document.querySelector("input[name='title']").value.trim();
        let content = document.querySelector("textarea[name='content']").value.trim();
        let agreeChecked = document.querySelector("input[name='agree']:checked");

        if (!title) {
            event.preventDefault(); // 폼 제출 방지
            Swal.fire({
                title: "제목을 입력해주세요!",
                text: "문의 제목을 입력해야 합니다.",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: "custom-btn",
                },
                buttonsStyling: false
            });
            return;
        }

        if (!content) {
            event.preventDefault(); // 폼 제출 방지
            Swal.fire({
                title: "내용을 입력해주세요!",
                text: "문의 내용을 입력해야 합니다.",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: "custom-btn",
                },
                buttonsStyling: false
            });
            return;
        }

        if (!agreeChecked || agreeChecked.value !== "0") {
            event.preventDefault(); // 폼 제출 방지
            Swal.fire({
                title: "개인정보 수집에 동의해야 합니다!",
                text: "등록하려면 '동의함'을 선택해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: "custom-btn",
                },
                buttonsStyling: false
            });
        }
    });

    // "동의하지 않음" 선택 시 모달 띄우기
    const disagreeRadio = document.getElementById("GR_disagree_check");
    disagreeRadio.addEventListener("change", function () {
        if (this.checked) {
            Swal.fire({
                title: "동의하지 않으셨습니다!",
                text: "개인정보 수집에 동의해야 서비스를 이용할 수 있습니다.",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: "custom-btn",
                },
                buttonsStyling: false
            });
        }
    });


});


