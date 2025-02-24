
document.addEventListener("DOMContentLoaded", function () {

    //증가버튼
    document.querySelectorAll(".GMCard .GMplus, .GMMQuantity .GMMplus").forEach(plusBtn => {
        plusBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // 이벤트 중복 실행 방지
            const quantityInput = this.parentNode.querySelector("input");
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    });

    // 감소버튼
    document.querySelectorAll(".GMCard .GMinus, .GMMQuantity .GMMinus").forEach(minusBtn => {
        minusBtn.addEventListener("click", function (event) {
            event.stopPropagation(); // 이벤트 중복 실행 방지
            const quantityInput = this.parentNode.querySelector("input");
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    });


    //===========================================================================
    //내부 nav!! 신메뉴/샐러드/뭐 이런거 클릭하면 이동하는거~
    // 네비게이션 링크 가져오기
    const menuLinks = document.querySelectorAll(".GMNavNew a");

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 동작 방지

            // 클릭된 링크의 텍스트 가져오기
            const categoryName = this.textContent.trim(); // 텍스트 가져오기
            console.log("클릭한 카테고리:", categoryName);

            // 해당하는 섹션 찾기
            let targetSection = null;
            switch (categoryName) {
                case "신메뉴":
                    targetSection = document.getElementById("category1");
                    break;
                case "샐러드":
                    targetSection = document.getElementById("category2");
                    break;
                case "스테이크":
                    targetSection = document.getElementById("category3");
                    break;
                case "피자/파스타":
                    targetSection = document.getElementById("category4");
                    break;
                case "필라프/리조또":
                    targetSection = document.getElementById("category5");
                    break;
                case "음료":
                    targetSection = document.getElementById("category6");
                    break;
                default:
                    return;
            }

            // 해당 섹션으로 부드럽게 스크롤
            if (targetSection) {
                const targetOffset = targetSection.getBoundingClientRect().top + window.scrollY; // 절대 위치 계산
                const offset = 32; // 2rem (대략 32px)

                window.scrollTo({ top: targetOffset - offset, behavior: "smooth" });
            }
        });
    });// 내부 nav 끝~~


    // 모달창!!!!
    const detailButtons = document.querySelectorAll(".GMDetail"); // "자세히 보기" 버튼들
    const modals = document.querySelectorAll(".GMMmodal"); // 모달창들
    const closeButtons = document.querySelectorAll(".GMMclose"); // 닫기 버튼들

    detailButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            modals[index].style.display = "block"; // 해당 메뉴의 모달만 열기
        });
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            modals[index].style.display = "none"; // 해당 메뉴의 모달만 닫기
        });
    });

    // 모달 바깥 클릭 시 닫기 기능 추가
    modals.forEach((modal, index) => {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modals[index].style.display = "none";
            }
        });
    });


        document.querySelectorAll(".GMCart, .GMMcartbtn").forEach(cartBtn => {
            cartBtn.addEventListener("click", function () {

                // 클릭된 버튼에서 가장 가까운 GMmenuBox 찾기
                const menuItem = this.closest(".GMList");
                const quantity = this.parentNode.querySelector("input").value;

                if (menuItem) {
                    const menuItemId = menuItem.id; // GMmenuBox의 id 가져오기
                    console.log("선택한 GMmenuBox ID:", menuItemId);

                    // 로그인 확인 후 장바구니 추가
                    checkLoginAndAddCart(menuItemId, quantity);
                } else {
                    console.log("GMmenuBox를 찾을 수 없습니다.");
                }
            });
        });

        function checkLoginAndAddCart(menuItemId, quantity) {
            fetch('/api/checkLoginStatus', {
                method: 'GET',
                credentials: "include" // ⭐ 세션 쿠키 포함 ⭐
            })
                .then(response => response.json())
                .then(data => {
                    console.log("로그인 상태:", data);
                    if (data.loggedIn) {
                        addCart(data.memberId, menuItemId, quantity); // 로그인 O → 장바구니 추가
                    } else {
                        Swal.fire({
                            title: "로그인이 필요합니다",
                            text: "서비스를 이용하려면 먼저 로그인 해주세요.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "로그인",
                            cancelButtonText: "닫기",
                            customClass: {
                                confirmButton: "custom-btn",
                                cancelButton: "custom-cancel"
                            },
                            buttonsStyling: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/login"; // 로그인 페이지로 이동
                            }
                        });
                    }
                })
                .catch(error => console.error("로그인 상태 확인 중 오류 발생:", error));
        }

        function addCart(memberId, menuItemId, quantity) {
            console.log("장바구니 클릭~ memberId:", memberId, "GMmenuBox ID:", menuItemId, "수량 : ", quantity);

            $.post("http://localhost:9010/addCart", { memberId: memberId, menu_id: menuItemId, quantityStr: quantity })
                .done(response => {
                    console.log(response);
                    Swal.fire({
                        title: "장바구니 추가 완료!",
                        text: "상품이 장바구니에 담겼습니다.",
                        icon: "success",
                        showCancelButton: true, // ❗ 추가 버튼 활성화
                        confirmButtonText: "장바구니로 이동",
                        cancelButtonText: "확인",
                        customClass: {
                            confirmButton: "custom-btn",
                            cancelButton: "custom-btn"
                        },
                        buttonsStyling: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/cart"; // ✅ 장바구니 페이지로 이동
                        }
                    });

                })
                .fail(error => {
                    Swal.fire("오류 발생", "장바구니 추가 중 문제가 발생했습니다.", "error");
                });
        }


});

