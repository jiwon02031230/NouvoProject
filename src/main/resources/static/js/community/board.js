//페이지네이션 시작
document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 10; // 한 페이지당 10개씩
    let currentPage = 1; // 기본 페이지
    let totalItems = document.querySelectorAll(".GCBboard tbody tr").length; // 전체 데이터 개수
    let totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수

    function showPage(page) {
        let rows = document.querySelectorAll(".GCBboard tbody tr");
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