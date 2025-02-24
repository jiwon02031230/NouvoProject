//페이지네이션 시작
document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 10; // 한 페이지당 10개씩
    let currentPage = 1; // 기본 페이지
    let totalItems = document.querySelectorAll(".GILboard tbody tr").length; // 전체 데이터 개수
    let totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수

    function showPage(page) {
        let rows = document.querySelectorAll(".GILboard tbody tr");
        rows.forEach((row, index) => {
            // 표시할 항목 구분
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                row.style.display = "table-row";

                // 마지막 항목에 border-bottom 적용
                if (index === (page * itemsPerPage) - 1 || index === totalItems - 1) {
                    row.style.borderBottom = "2px solid #a7a7a7";  // 강조 스타일
                } else {
                    row.style.borderBottom = "1px solid #ddd";  // 기본 border
                }
            } else {
                row.style.display = "none";
            }
        });
    }

    function updatePagination() {
        let pageNumbers = document.getElementById("pageNumbers");
        pageNumbers.innerHTML = ""; // 기존 번호 삭제

        for (let i = 1; i <= totalPages; i++) {
            let pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add("active");
            }
            pageLink.addEventListener("click", function (event) {
                event.preventDefault();
                currentPage = i;
                showPage(currentPage);
                updatePagination();
            });
            pageNumbers.appendChild(pageLink);
        }
    }

    document.getElementById("prevPage").addEventListener("click", function (event) {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePagination();
        }
    });

    document.getElementById("nextPage").addEventListener("click", function (event) {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updatePagination();
        }
    });

    showPage(currentPage);
    updatePagination();
});
//페이지네이션 끝!!!

//=============================================================

//내정보 수정 년월일 셀렉트박스 시작!!
document.addEventListener("DOMContentLoaded", function () {

    const yearSelect = document.getElementById("birthyear");
    const monthSelect = document.getElementById("birthmonth");
    const daySelect = document.getElementById("birthday");

    const currentYear = new Date().getFullYear();

    const memBirthDay = document.getElementById("memBirthDay").value;
    console.log("✅ 생년월일 값 확인:", memBirthDay);  // 디버깅용 로그 추가

    let birthyear = memBirthDay.substring(0,4);
    let birthmonth = memBirthDay.substring(4,6);
    let birthday = memBirthDay.substring(6,8);

    // 플레이스홀더 추가
    yearSelect.innerHTML = '<option value="">선택</option>';
    monthSelect.innerHTML = '<option value="">선택</option>';
    daySelect.innerHTML = '<option value="">선택</option>';

    // 연도 추가 (현재 연도 기준으로 100년 전까지)
    for (let y = currentYear; y >= currentYear - 100; y--) {
        let option = document.createElement("option");
        if (y== parseInt(birthyear)){
            option.setAttribute("selected", "selected");
        }
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }

    // 월 추가 (1~12)
    for (let m = 1; m <= 12; m++) {
        let option = document.createElement("option");
        if (m== parseInt(birthmonth)){
            option.setAttribute("selected", "selected");
        }
        option.value = m;
        option.textContent = m;
        monthSelect.appendChild(option);
    }

    // 일 추가 함수
    function updateDays() {
        let year = parseInt(yearSelect.value);
        let month = parseInt(monthSelect.value);
        if (!year || !month) {
            daySelect.innerHTML = '<option value="">선택</option>'; // 선택 초기화
            return;
        }

        daySelect.innerHTML = '<option value="">선택</option>'; // 기존 옵션 초기화

        let daysInMonth = new Date(year, month, 0).getDate(); // 해당 월의 마지막 날짜

        for (let d = 1; d <= daysInMonth; d++) {
            let option = document.createElement("option");
            if (d== parseInt(birthday)){
                option.setAttribute("selected", "selected");
            }
            option.value = d;
            option.textContent = d;
            daySelect.appendChild(option);
        }
    }

    // 연도와 월이 변경될 때 일 수 업데이트
    yearSelect.addEventListener("change", updateDays);
    monthSelect.addEventListener("change", updateDays);



    //셀렉트박스 컬러지정
    const selects = document.querySelectorAll(".GMYMbirth select");

    selects.forEach(select => {
        // 초기 상태: 기본값이면 회색 적용
        if (!select.value) {
            select.style.color = "gray";
        }

        select.addEventListener("change", function () {
            if (this.value === "") {
                this.style.color = "#333"; // 선택 안 했을 때 회색
            } else {
                this.style.color = "black"; // 값 선택하면 검정색
            }
        });
    });
});
//내정보 수정 년월일 셀렉트박스 끝!!

//=============================================================

// 비밀번호 체크 JS 시작
document.addEventListener("DOMContentLoaded", function () {
    const currentPwdInput = document.querySelector(".GMYMpwdcell input[type='password']");
    const newPwdInput = document.querySelectorAll(".GMYMpwdcell input[type='password']")[1];
    const confirmPwdInput = document.querySelectorAll(".GMYMpwdcell input[type='password']")[2];

    const currentPwdError = currentPwdInput.nextElementSibling;
    const confirmPwdError = confirmPwdInput.nextElementSibling;


    // 현재 비밀번호 체크 (입력 중에는 안 보이고, 입력이 끝나면 체크)
    currentPwdInput.addEventListener("focusout", function () {
        if (this.value !== "01ff8c40073a") {
            currentPwdError.style.opacity = "1"; // 경고 메시지 표시
        } else {
            currentPwdError.style.opacity = "0"; // 경고 메시지 숨기기
        }
    });

    // 새 비밀번호 확인 체크 (입력 중에는 안 보이고, 입력이 끝나면 체크)
    function checkPasswordMatch() {
        if (newPwdInput.value && confirmPwdInput.value) { // 둘 다 입력된 경우만 체크
            if (newPwdInput.value !== confirmPwdInput.value) {
                confirmPwdError.style.opacity = "1"; // 경고 메시지 표시
            } else {
                confirmPwdError.style.opacity = "0"; // 경고 메시지 숨기기
            }
        }
    }

    newPwdInput.addEventListener("input", checkPasswordMatch);
    confirmPwdInput.addEventListener("input", checkPasswordMatch);
});

// 비밀번호 체크 JS 끝
