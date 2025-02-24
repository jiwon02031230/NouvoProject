// 체크박스 전체선택 시작!
document.getElementById("selectAll").addEventListener("change", function () {
    let checkboxes = document.querySelectorAll(".AAMacheckbox");
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});
// 체크박스 전체선택 끝!!

// // 셀렉트 박스에서 카테고리 선택시 메뉴보이기
// function filterMenu() {
//     const select = document.querySelector('.AAMaTopLselect');
//     const selectedCategory = select.value;
//     const menuRows = document.querySelectorAll('.menu-row');
//
//     menuRows.forEach(row => {
//         const categoryId = row.getAttribute('data-category');
//         if (selectedCategory === "" || selectedCategory === categoryId) {
//             row.style.display = ""; // Show the row
//         } else {
//             row.style.display = "none"; // Hide the row
//         }
//     });
// }
//
// // 셀렉트 박스에서 카테고리 선택시 메뉴보이기 끝!!!
document.getElementById("categorySelect").addEventListener("change", function () {
    document.getElementById("categoryForm").submit(); // 선택 변경 시 폼 자동 제출
});

//페이지네이션 시작
document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 10; // 한 페이지당 10개씩
    let currentPage = 1; // 기본 페이지
    let totalItems = document.querySelectorAll(".AAMaboard tbody tr").length; // 전체 데이터 개수
    let totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수

    function showPage(page) {
        let rows = document.querySelectorAll(".AAMaboard tbody tr");
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


// 검색어 창 //

document.getElementById('searchButton').addEventListener('click', function () {
    // 선택된 검색 항목과 입력된 검색어 가져오기
    const searchSelect = document.getElementById('searchSelect').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    // 테이블의 모든 행 가져오기
    const rows = document.querySelectorAll('#AAMaTableBody .menu-row');

    // 각 행을 반복하여 필터링
    rows.forEach(row => {
        // 메뉴명과 가격 셀 가져오기
        const menuName = row.children[3].innerText.toLowerCase(); // 메뉴명
        const menuPrice = row.children[4].innerText.replace('원', '').trim(); // 가격 (원 제거)

        // 검색 조건에 따라 행 표시 여부 결정
        if (searchSelect === 'title' && menuName.includes(searchInput)) {
            row.style.display = ''; // 행 표시
        } else if (searchSelect === 'substance' && menuPrice.includes(searchInput)) {
            row.style.display = ''; // 행 표시
        } else if (searchSelect === '') {
            row.style.display = ''; // 선택이 없을 경우 모든 행 표시
        } else {
            row.style.display = 'none'; // 행 숨기기
        }
    });
});

//  검색어 창 끝!! //

// 메뉴 추가에서 미리보기 모달창 //

function showPreview() {
    // 입력된 값 가져오기
    const menuName = document.querySelector('input[name="menuName"]').value;
    const menuPrice = document.querySelector('input[name="menuPrice"]').value;
    const menuKcal = document.querySelector('input[name="menuKcal"]').value;
    const menuProtein = document.querySelector('input[name="menuProtein"]').value;
    const menuNa = document.querySelector('input[name="menuNa"]').value;
    const menuSugar = document.querySelector('input[name="menuSugar"]').value;
    const menuAllergens = document.querySelector('input[name="menuAllergens"]').value;
    const fileInput = document.getElementById('fileInput');

    // 이미지 미리보기
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
        }
        reader.readAsDataURL(fileInput.files[0]);
    }

    // 모달에 값 설정
    document.getElementById('previewName').innerText = menuName;
    document.getElementById('previewPrice').innerText = menuPrice + '원';
    document.getElementById('previewKcal').innerText = menuKcal;
    document.getElementById('previewProtein').innerText = menuProtein;
    document.getElementById('previewNa').innerText = menuNa;
    document.getElementById('previewSugar').innerText = menuSugar;
    document.getElementById('previewAllergens').innerText = '알러지 정보 : ' + menuAllergens + ' 포함';

    // 모달 표시
    document.getElementById('previewModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
}

// 체크박스 눌러서 메뉴 삭제 하기 //

function submitDeleteForm() {
    const checkboxes = document.querySelectorAll('.AAMacheckbox:checked');
    const menuIds = Array.from(checkboxes).map(checkbox => checkbox.value);

    if (menuIds.length === 0) {
        alert('삭제할 메뉴를 선택하세요.');
        return;
    }

    fetch('/adm/menus?menuIds=' + menuIds.join(","), {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            window.location.href = '/adm/menu'; // 성공 시 페이지 리다이렉트
        } else {s
            alert('삭제 중 오류가 발생했습니다.');
        }
    })
        .catch(error => {
            console.error('Error:', error);
            alert('삭제 중 오류가 발생했습니다.');
        });
}
