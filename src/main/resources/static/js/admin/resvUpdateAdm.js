// 현재 연도만 선택 가능하도록 설정
const yearSelect = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearSelect.innerHTML = `<option value="${currentYear}">${currentYear}</option>`;

// 월 설정 (1~12)
const monthSelect = document.getElementById("month");
for (let i = 1; i <= 12; i++) {
    monthSelect.innerHTML += `<option value="${i}">${i}월</option>`;
}

// 일 설정 (1~31)
const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
    daySelect.innerHTML += `<option value="${i}">${i}일</option>`;
}

// 수정 완료 버튼 클릭 시 alert 띄우기
function confirmUpdate() {
    if (confirm("수정하시겠습니까?")) {
        alert("수정되었습니다.");
        location.reload(); // 새로고침 (데이터 업데이트 느낌 주기)
    }
}
