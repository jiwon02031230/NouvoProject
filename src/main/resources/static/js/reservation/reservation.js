// =====================================달력 시작!!!=======================================
const calendarDates = document.getElementById("calendarDates");
const currentMonthElement = document.getElementById("currentMonth");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const today = new Date(); // 현재 날짜를 나타내는 Date 객체를 저장한다.
let currentMonth = today.getMonth();
/* 현재 월을 나타내는 값을 저장한다. getMonth() 메서드는 0부터 시작하는 월을 반환하므로
1월이면 0, 2월이면 1을 반환한다. */
let currentYear = today.getFullYear(); // 변수에 현재 연도를 나타내는 값을 저장한다.

function renderCalendar() {
    /* renderCalendar 함수는 월별 캘랜더를 생성하고 표시하는 함수 */
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    /* firstDayOfMonth 변수에 현재 월의 첫 번째 날짜를 나타내는 Date 객체를 저장한다.
  해당 월의 첫 번째 날짜에 대한 정보를 얻는다. */
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    /* daysInMonth 변수에 현재 월의 총 일 수를 나타내는 값을 저장한다.
    해당 월이 몇 일까지 있는지 알 수 있다. */
    const startDayOfWeek = firstDayOfMonth.getDay();
    /* 변수에 현재 월의 첫 번째 날짜의 요일을 나타내는 값을 저장한다.
    해당 월의 첫 번째 날짜가 무슨 요일인지 알 수 있다. */
    currentMonthElement.textContent = `${currentYear}년 ${currentMonth + 1}월`;
    // 월을 나타내는 요소에 현재 월과 연도를 설정하여 표시한다.

    calendarDates.innerHTML = ""; // 일자를 표시하는 그리드 컨테이너를 비운다.

    // 빈 날짜(이전 달)
    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDate = document.createElement("div");
        //  빈 날짜를 나타내는 div 요소를 생성한다.
        emptyDate.classList.add("date", "empty");
        // 생성한 div 요소에 "date"와 "empty" 클래스를 추가한다.
        calendarDates.appendChild(emptyDate);
        // 생성한 빈 날짜 요소를 캘린더 그리드에 추가한다.
    }

    $.get(`/reservation/getresv?year=${currentYear}&month=${currentMonth+1}&daysInMonth=${daysInMonth}`)
        .then(function(data) {
            // 현재 달의 날짜
            for (let i = 1; i <= daysInMonth; i++) {
                const dateElement = document.createElement("div");
                const realMonth = (currentMonth+1).toString();
                const month = realMonth.padStart(2, "0"); // 두 자리로 맞추기 (2 → 02)
                const day = i.toString().padStart(2, "0");   // 두 자리로 맞추기 (4 → 04)

                const dateId =  currentYear+"-"+month+"-"+day;
                dateElement.id = dateId;
                // dateElement.setAttribute("name", "resvDate");  // name 속성 설정
                // dateElement.setAttribute("value", dateId);     // value 속성 설정


                let dateList = data[i - 1];
                let lunchAvailable = 0;
                let dinnerAvailable = 0;

                for (let j = 0; j < 4; j++) {
                    if (dateList[j].resvStatus !== 0) {
                        lunchAvailable++;
                    }
                }

                for (let j = 4; j < 8; j++) {
                    if (dateList[j].resvStatus !== 0) {
                        dinnerAvailable++;
                    }
                }

                // 모든 예약이 꽉 찼다면 'disable_day' 클래스를 추가하고, 그렇지 않으면 'date' 클래스를 추가
                if (lunchAvailable === 4 && dinnerAvailable === 4) {
                    dateElement.classList.add("disable_day");
                    // HTML 추가
                    dateElement.innerHTML = `${i}<br><br><br><br><br><br><br>`;
                } else {
                    dateElement.classList.add("date");
                    dateElement.setAttribute("onclick", "showTime(this.id)");
                    // HTML 추가
                    dateElement.innerHTML = `
                        ${i} <br><br><br>
                        <span class='GR_dot'>●</span> 점심 ${lunchAvailable}/4<br><br>
                        <span class='GR_dot'>●</span> 저녁 ${dinnerAvailable}/4<br><br>
                    `;

                    // dateElement 내부에서만 GR_dot 요소를 선택해야 함!
                    const availableDot = dateElement.querySelectorAll(".GR_dot");

                    // 요소가 존재하는지 확인하고, lunchAvailable 값이 4이면 클래스 변경
                    if (availableDot.length > 0 && lunchAvailable === 4) {
                        availableDot[0].classList.add("GR_dot_red");
                    }

                    // 요소가 존재하는지 확인하고, dinnerAvailable 값이 4이면 클래스 변경
                    if (availableDot.length > 1 && dinnerAvailable === 4) {
                        availableDot[1].classList.add("GR_dot_red");
                    }
                }


                // 달력에 추가
                calendarDates.appendChild(dateElement);
            }
        });




    /*
    1. for 문을 이용하여 현재 월의 총 일 수만큼 반복하여 월의 날짜를 순서대로 표시한다.
    2. const dateElement = document.createElement("div");를 통해 날짜를 나타내는 div 요소를 생성한다.
    3. dateElement.classList.add("date");를 통해 생성한 div 요소에 "date" 클래스를 추가한다.
    4. dateElement.textContent = i;를 통해 해당 날짜 값을 div 요소의 텍스트로 설정한다.
    5. calendarDates.appendChild(dateElement);를 통해 생성한 날짜 요소를 캘린더 그리드에 추가한다.
    */
}

renderCalendar();
// 페이지가 로드되면 renderCalendar 함수를 실행하여 초기 캘린더를 표시한다.

prevBtn.addEventListener("click", () => {
    // 현재 날짜 정보 가져오기
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonthNow = today.getMonth(); // 0부터 시작하는 월
    const currentYearNow = today.getFullYear();

    // 이전 버튼을 눌렀을 때 현재 월이 더 이전으로 넘어가는지 체크
    if (currentYear < currentYearNow || (currentYear === currentYearNow && currentMonth <= currentMonthNow)) {
        // 만약 현재 월보다 더 이전으로 넘어가려 한다면
        alert("현재 날짜보다 이전 월로 이동할 수 없습니다.");
        return; // renderCalendar 함수 호출하지 않음
    }

    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();

});

nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});
/* =====================================달력 끝!!!=======================================
1. 다음 버튼(nextBtn)을 클릭하면 현재 월을 다음 월로 변경하고, 연도가 바뀌어야 한다면 연도를 변경한다.
2. 변경된 월과 연도를 바탕으로 renderCalendar 함수를 호출하여 다음 월의 캘린더를 표시한다.
*/

// 달력에서 날짜 클릭했을 때 이용시간 선택 나오기 !!!!!!!=======================================
function showTime(divId) {
    const timeDiv = document.getElementById("resvTimeDiv");

    console.log(divId);
    // 요소가 존재하지 않으면 함수 실행 중단

    if (!timeDiv) {
        console.error("🚨 Error: resvTimeDiv 요소를 찾을 수 없습니다!");
        return;
    }

    // ✅ 기존에 클릭된 .clickDate 클래스 제거 (모든 날짜 div에서 제거)
    document.querySelectorAll(".date").forEach(date => {
        date.classList.remove("clickDate");

    });

    // ✅ 현재 클릭한 div에 clickDate 클래스 추가
    const selectedDiv = document.getElementById(divId);
    if (selectedDiv) {
        selectedDiv.classList.add("clickDate");
    }



    $.get(`/resvTime?dates=${divId}`).then(function (data) {
        if (!Array.isArray(data)) {
            console.error("🚨 데이터가 배열이 아닙니다!", data);
            return;
        }
        if (data.length === 0) {
            console.warn("⚠️ 데이터가 비어 있습니다!");
            return;
        }

        let lunchTimes = [];
        let dinnerTimes = [];

        for (let j = 0; j < 4; j++) {
            if (data[j].resvStatus == 0) {
                lunchTimes.push(data[j].resvTime);
            }
        }
        for (let j = 4; j < 8; j++) {
            if (data[j].resvStatus == 0) {
                dinnerTimes.push(data[j].resvTime);
            }
        }

        let selectTime = `
            <!--<p class="GRtime_text">${divId}</p>-->
            <p class="GRtime_text">이용시간 선택</p>
            <input type="text" name="resvDate" value="${divId}" hidden="hidden">
            <select class="form-select" name="resvType" id="resvType">
                ${lunchTimes.length > 0 ? '<option value="0">점심 11:00 ~ 15:00</option>' : ""}
                ${dinnerTimes.length > 0 ? '<option value="1">저녁 17:00 ~ 21:00</option>' : ""}
            </select>
            <p class="GRtime_text">방문시간 선택</p>
            <select class="form-select" name="resvTime" id="resvTime">
            </select>
        `;

        timeDiv.innerHTML = selectTime;
        timeDiv.style.display = "flex";

        const resvType = document.getElementById("resvType");
        const resvTime = document.getElementById("resvTime");

        function updateResvTimeOptions() {
            resvTime.innerHTML = "";
            let selectedTimes = resvType.value === "0" ? lunchTimes : dinnerTimes;
            selectedTimes.forEach(time => {
                let option = document.createElement("option");
                option.value = time;
                option.textContent = `${time}:00`;
                resvTime.appendChild(option);
            });
        }

        updateResvTimeOptions();
        resvType.addEventListener("change", updateResvTimeOptions);
    });
}

// 결제 방식 선택에 따라 메뉴선택지 보이게 하기!!-====================================
document.addEventListener("DOMContentLoaded", function () {
    const menuPayRadio = document.getElementById("GR_menu_pay"); // 메뉴 미리 결제 라디오 버튼
    const restPayRadio = document.getElementById("GR_rest_pay"); // 레스토랑 결제 라디오 버튼
    const menuBox = document.querySelector(".GR_select_menu_box"); // 메뉴 선택 박스

    function toggleMenuBox() {
        if (menuPayRadio.checked) {
            menuBox.style.display = "block"; // 보이게 함
        } else {
            menuBox.style.display = "none"; // 숨김
        }
    }

    // 라디오 버튼 변경될 때마다 실행
    menuPayRadio.addEventListener("change", toggleMenuBox);
    restPayRadio.addEventListener("change", toggleMenuBox);

    // 초기 상태 (페이지 로드 시 숨김)
    menuBox.style.display = "none";
});


// 음식 모달창들 + 이메일 형식 확인
document.addEventListener("DOMContentLoaded", function () {
    const detailButtons = document.querySelectorAll(".GRDetail"); // "자세히 보기" 버튼들
    const modals = document.querySelectorAll(".GRMmodal"); // 모달창들
    const closeButtons = document.querySelectorAll(".GRMclose"); // 닫기 버튼들

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

    // 이메일 형식 확인
    const emailInput = document.querySelector(".GRinput_email");
    const alertMsg = document.createElement("p"); // 경고 메시지 동적 생성
    alertMsg.classList.add("GR_alert_msg");
    alertMsg.style.color = "#8A1812";
    alertMsg.style.display = "none"; // 기본적으로 숨김
    alertMsg.textContent = "* 올바른 이메일 형식을 입력해주세요. (예: example@nuovo.com)";

    emailInput.parentNode.appendChild(alertMsg); // 이메일 입력창 아래 추가

    emailInput.addEventListener("input", function () {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (this.value.trim() === "") {
            alertMsg.style.display = "none"; // 🔹 입력값이 없으면 경고 메시지 숨김
        } else if (!emailPattern.test(this.value)) {
            alertMsg.style.display = "block"; // 🔹 잘못된 형식이면 경고 메시지 표시
        } else {
            alertMsg.style.display = "none"; // 🔹 올바른 형식이면 경고 메시지 숨김
        }
    });

});

// 회원정보 가져오기 함수
function bringInfo(element){
    const bringInfoBtn = document.getElementById("bringInfoBtn");
    const bringname = document.getElementById("GRinput_name");
    const bringphone = document.getElementById("GRinput_phone");
    let name = element.dataset.name;
    let phone = element.dataset.phone;

    console.log("클릭!")
    console.log(bringInfoBtn);

    if (bringInfoBtn.style.color === "rgb(138, 24, 18)") {
        bringInfoBtn.style.color = ""; // 기본값으로 초기화
        bringname.value = "";
        bringphone.value = "";

    } else {
        bringInfoBtn.style.color = "#8A1812"; // 원하는 색상 적용
        bringname.value = name;
        bringphone.value = phone;
    }

}

// 핸드폰 11자리 제한
document.getElementById("GRinput_phone").addEventListener("input", function (event) {
    // 숫자만 입력 가능하도록 필터링
    this.value = this.value.replace(/[^0-9]/g, "");

    // 11자리 이상 입력 방지
    if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
    }

});

// 메뉴선택시 border 적용하고 선택리스트에 띄우기 & 요금 계산
    const cards = document.querySelectorAll(".card");
    const selectedMenuContainer = document.getElementById("GR_selected_menu");
    const minusBtn = document.getElementById("GR_guest_minusBtn"); // 마이너스 버튼
    const plusBtn = document.getElementById("GR_guest_plusBtn");  // 플러스 버튼
    const guestCount = document.getElementById("GRguest_count"); // 인원 표시
    let depositAmount = document.getElementById("depositAmount"); // 예약금
    const menuAmount = document.getElementById("menuAmount"); // 메뉴 주문금액
    const totalAmount = document.getElementById("totalAmount"); // 총 결제 금액
    let menuId;
    document.getElementById("hiddenGRguest_count").value=guestCount.innerHTML;
    depositAmount.value = parseInt(depositAmount.textContent.replace(/,/g, ""));
    totalAmount.value = parseInt(totalAmount.textContent.replace(/,/g, ""));
    document.getElementById("hiddentotalAmount").value = totalAmount.value;

    // 선택된 메뉴를 저장할 배열
    let selectedMenus = [];

    // 🟢 메뉴 카드 클릭 (선택/해제)
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("selected");
            menuId = this.getAttribute("id");
            const itemName = this.getAttribute("data-name");
            const itemImage = this.querySelector("img").src;
            const itemPrice = parseInt(this.querySelector(".GRMprice").textContent.replace(/,/g, ""));

            if (this.classList.contains("selected")) {
                // ✅ 선택된 경우 배열에 추가
                let newItem = {mid: menuId, name: itemName, mprice: itemPrice, mcount: 1 };
                selectedMenus.push(newItem);

                // UI에 추가
                const menuItem = document.createElement("div");
                menuItem.classList.add("GR_selected_menu_item");
                menuItem.setAttribute("data-name", itemName);
                menuItem.innerHTML = `
                    <img class="GR_selected_menuImage" src="${itemImage}" alt="${itemName}">
                    <div class="GR_selected_menuInfo">
                        <p class="GR_menuinfo">${itemName}</p>
                        <p class="GR_menuinfo">${itemPrice.toLocaleString()} 원</p>
                    </div>
                    <div class="GR_menu_count_box">
                         <button type="button" id="GR_decrease_count">
                            <i class="bi bi-dash-circle"></i>
                         </button>
                         <div class="GR_menu_count">1</div>
                         <button type="button" id="GR_increase_count">
                            <i class="bi bi-plus-circle"></i>
                         </button>
                    </div>
                    <button type="button" id="GR_trashIcon">
                            <i class="bi bi-trash3"></i>
                    </button>
                `;
                selectedMenuContainer.appendChild(menuItem);

                updateTotalAmount();
            } else {
                // ❌ 해제된 경우 배열에서 제거
                selectedMenus = selectedMenus.filter(menu => menu.name !== itemName);

                // UI에서 제거
                selectedMenuContainer.querySelectorAll(".GR_selected_menu_item").forEach(item => {
                    if (item.getAttribute("data-name") === itemName) {
                        item.remove();
                    }
                });

                updateTotalAmount();
            }
        });
    });


// 장바구니 가져오기 버튼
const bringCartBtn = document.getElementById("cartBtn");
const cartIcon = document.getElementById("cartIcon");
let foodList = []; // 장바구니에서 불러온 메뉴 ID 리스트

bringCartBtn.addEventListener("click", function () {
    if (cartIcon.dataset.active === "true") {
        // 🛑 장바구니 비활성화 (모든 선택 해제)
        cartIcon.style.color = "";
        cartIcon.dataset.active = "false";

        // UI에서 선택 해제
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("selected");
        });

        // 선택된 메뉴 리스트 초기화
        document.getElementById("GR_selected_menu").innerHTML = "";
        selectedMenus = [];

        updateTotalAmount(); // 총 금액 갱신
    } else {
        // ✅ 장바구니 활성화 (메뉴 불러오기)
        $.post("http://localhost:9010/bringCart")
            .done(response => {
                console.log("📦 장바구니 응답: ", response);

                // 장바구니에서 가져온 메뉴 ID 리스트 저장
                foodList = response.map(item => item.menuId.toString());
                console.log("🎯 불러온 메뉴 ID 리스트: ", foodList);

                if (foodList.length === 0) {
                    alert("장바구니가 비어 있습니다!");
                    return;
                }

                // UI 반영
                cartIcon.style.color = "#8A1812";
                cartIcon.dataset.active = "true";

                document.querySelectorAll(".card").forEach(card => {
                    const menuId = card.getAttribute("id").toString();

                    if (foodList.includes(menuId)) {
                        card.classList.add("selected");

                        // 이미 추가된 메뉴인지 확인 (중복 방지)
                        if (!selectedMenus.some(menu => menu.mid === menuId)) {
                            const itemName = card.getAttribute("data-name");
                            const itemImage = card.querySelector("img").src;
                            const itemPrice = parseInt(card.querySelector(".GRMprice").textContent.replace(/,/g, ""));

                            let newItem = { mid: menuId, name: itemName, mprice: itemPrice, mcount: 1 };
                            selectedMenus.push(newItem);

                            const menuItem = document.createElement("div");
                            menuItem.classList.add("GR_selected_menu_item");
                            menuItem.setAttribute("data-name", itemName);
                            menuItem.innerHTML = `
                                <img class="GR_selected_menuImage" src="${itemImage}" alt="${itemName}">
                                <div class="GR_selected_menuInfo">
                                    <p class="GR_menuinfo">${itemName}</p>
                                    <p class="GR_menuinfo">${itemPrice.toLocaleString()} 원</p>
                                </div>
                    <div class="GR_menu_count_box">
                         <button type="button" id="GR_decrease_count">
                            <i class="bi bi-dash-circle"></i>
                         </button>
                         <div class="GR_menu_count">1</div>
                         <button type="button" id="GR_increase_count">
                            <i class="bi bi-plus-circle"></i>
                         </button>
                    </div>
                    <button type="button" id="GR_trashIcon">
                            <i class="bi bi-trash3"></i>
                    </button>
                            `;
                            document.getElementById("GR_selected_menu").appendChild(menuItem);
                        }
                    }
                });

                updateTotalAmount(); // 총 금액 갱신
            })
            .fail(error => {
                console.error("🚨 장바구니 불러오기 실패!", error);
                alert("장바구니 데이터를 가져오는 중 오류가 발생했습니다!");
            });
    }
});



    //인원수 빼기
    minusBtn.addEventListener("click", function () {
        let count = parseInt(guestCount.innerText);
        if (count > 1) {

            guestCount.innerText = count-1;
            depositAmount.value = (10000*(count-1));
            document.getElementById("hiddenGRguest_count").value=count-1;

            updateTotalAmount()
        }
    });

    // 인원수 더하기
    plusBtn.addEventListener("click", function () {
        let count = parseInt(guestCount.innerText);
        if (count < 10) {

            guestCount.innerText=count+1;
            depositAmount.value = (10000*(count+1));
            document.getElementById("hiddenGRguest_count").value=count+1;
            updateTotalAmount()
        }
    });

    // 🟢 메뉴 수량 증가/감소 버튼 이벤트 위임
    document.addEventListener("click", function (event) {
        let menuItem = event.target.closest(".GR_selected_menu_item");
        if (!menuItem) return;

        const itemName = menuItem.getAttribute("data-name");
        let menuCount = menuItem.querySelector(".GR_menu_count");

        // 수량 감소 버튼 클릭 시
        if (event.target.closest("#GR_decrease_count")) {
            let count = parseInt(menuCount.textContent);
            if (count > 1) {
                menuCount.textContent = count - 1;
                updateMenuCount(itemName, count - 1);
            }
        }

        // 수량 증가 버튼 클릭 시
        if (event.target.closest("#GR_increase_count")) {
            let count = parseInt(menuCount.textContent);
            if (count < 10) {
                menuCount.textContent = count + 1;
                updateMenuCount(itemName, count + 1);
            }
        }

        // 메뉴 삭제 버튼 클릭 시
        if (event.target.closest("#GR_trashIcon")) {
            menuItem.remove();
            selectedMenus = selectedMenus.filter(menu => menu.name !== itemName);

            document.querySelectorAll(".card").forEach(card => {
                if (card.getAttribute("data-name") === itemName) {
                    card.classList.remove("selected");
                }
            });

            updateTotalAmount();
        }
    });

    // ✅ 메뉴 수량 업데이트
    function updateMenuCount(itemName, newCount) {
        selectedMenus = selectedMenus.map(menu => {
            if (menu.name === itemName) {
                return { ...menu, mcount: newCount };
            }
            return menu;
        });
        updateTotalAmount();
    }

    // ✅ 총 결제 금액 업데이트
    function updateTotalAmount() {
        let deposit = parseInt(depositAmount.value);
        let guest = parseInt(guestCount.innerText.replace(/,/g, ""));

        let menuTotal = selectedMenus.reduce((sum, menu) => sum + (menu.mprice * menu.mcount), 0);


        depositAmount.innerText= deposit.toLocaleString();
        menuAmount.innerText = menuTotal.toLocaleString();
        totalAmount.innerText = (deposit+ menuTotal).toLocaleString();
        totalAmount.value = deposit+ menuTotal;
        console.log(totalAmount.value);

        document.getElementById("hiddentotalAmount").value = totalAmount.value;

    }

    //  개인정보 모달!!!
    const disagreeRadio = document.getElementById("GR_disagree_check");
    const agreeRadio = document.getElementById("GR_agree_check");
    const nextButton = document.querySelector(".GR_next_btn button"); // "다음으로" 버튼 선택

    // "동의하지 않음" 선택 시 모달 띄우기
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

// "다음으로" 버튼(submit 버튼) 클릭 시 유효성 검사
nextButton.addEventListener("click", function (event) {
    // 클릭된 날짜가 있는지 확인
    let selectedDate = document.querySelector(".date.clickDate");

    if (!selectedDate) {
        event.preventDefault(); // 폼 제출 방지
        Swal.fire({
            title: "날짜를 선택해주세요!",
            text: "예약할 날짜를 선택해야 다음 단계로 진행할 수 있습니다.",
            icon: "warning",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: "custom-btn",
            },
            buttonsStyling: false
        });
        return;
    }

    // 개인정보 수집 동의 체크 확인
    if (disagreeRadio.checked) {
        event.preventDefault();
        Swal.fire({
            title: "개인정보 수집에 동의해야 합니다!",
            text: "계속 진행하려면 동의함을 선택해주세요.",
            icon: "error",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: "custom-btn",
            },
            buttonsStyling: false
        });
        return;
    }

    // 필수 입력값 확인 (이름, 연락처, 이메일)
    let nameField = document.querySelector("input[name='resvName']");
    let phoneField = document.querySelector("input[name='resvPhoneNum']");

    if (!nameField.value.trim()) {
        event.preventDefault();
        Swal.fire({
            title: "이름을 입력해주세요!",
            text: "예약자 이름을 입력해야 합니다.",
            icon: "warning",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: "custom-btn",
            },
            buttonsStyling: false
        });
        return;
    }

    if (!phoneField.value.trim()) {
        event.preventDefault();
        Swal.fire({
            title: "연락처를 입력해주세요!",
            text: "예약자 연락처를 입력해야 합니다.",
            icon: "warning",
            confirmButtonText: "확인",
            customClass: {
                confirmButton: "custom-btn",
            },
            buttonsStyling: false
        });
        return;
    }

});



    // foodList 만들기 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const reservationForm = document.getElementById("reservationForm");
    const foodListInput = document.getElementById("reservationFoodList");

    reservationForm.addEventListener("submit", function () {
        const reservationFoodList = [];

        for (let item of selectedMenus) {
            let menuItem = {
                menuId: item.mid,
                quantity: item.mcount,
                amountPrice: item.mcount * item.mprice
            };
            reservationFoodList.push(menuItem);
        }

        console.log("🚀 서버로 전송할 데이터:", JSON.stringify(reservationFoodList)); // 디버깅용
        foodListInput.value = JSON.stringify(reservationFoodList); // ✅ hidden input에 JSON 데이터 저장
    });



