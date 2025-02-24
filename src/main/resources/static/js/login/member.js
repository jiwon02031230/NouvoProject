//생년월일 셀렉트박스 시작!!
document.addEventListener("DOMContentLoaded", function () {
  const birthContainer = document.querySelector(".GMYMbirth");
  const yearSelect = birthContainer.querySelectorAll("select")[0];
  const monthSelect = birthContainer.querySelectorAll("select")[1];
  const daySelect = birthContainer.querySelectorAll("select")[2];

  const currentYear = new Date().getFullYear();

  // 플레이스홀더 추가
  yearSelect.innerHTML = '<option value="">선택</option>';
  monthSelect.innerHTML = '<option value="">선택</option>';
  daySelect.innerHTML = '<option value="">선택</option>';

  // 연도 추가 (현재 연도 기준으로 100년 전까지)
  for (let y = currentYear; y >= currentYear - 100; y--) {
    let option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  // 월 추가 (1~12)
  for (let m = 1; m <= 12; m++) {
    let option = document.createElement("option");
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
      option.value = d;
      option.textContent = d;
      daySelect.appendChild(option);
    }
  }

  // 연도와 월이 변경될 때 일 수 업데이트
  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);

  // 셀렉트박스 컬러지정
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


//======================================================================


// ID 입력 필드와 중복 확인 버튼
const idInput = document.getElementById("input_id"); // ID 입력 필드의 ID
const checkButton = document.querySelector(".duplicateCheck"); // 중복 확인 버튼

checkButton.addEventListener("click", function() {
  const inputId = idInput.value.trim(); // 사용자 입력 ID

  if (inputId === "") {
    alert("아이디를 입력하세요."); // 아이디 입력하지 않았을 경우 경고 메시지
    return;
  }

  // 중복 확인 AJAX 요청
  $.get(`/memberlist`)
      .then(function(data) {
        const isDuplicate = data.includes(inputId); // 입력한 ID가 중복인지 확인

        if (isDuplicate) {
          alert("이 아이디는 이미 사용 중입니다."); // 중복일 경우 경고 메시지
        } else {
          alert("사용 가능한 아이디입니다."); // 사용 가능할 경우 경고 메시지
        }
      })
      .catch(function(error) {
        console.error("중복 확인 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도하세요."); // 오류 발생 시 경고 메시지
      });
});


//=====================================================================================
// 비번 체크
document.addEventListener("DOMContentLoaded", function () {
  const newPwdInput = document.getElementById("input_pwd");
  const confirmPwdInput = document.getElementById("input_pwdCheck");
  const confirmPwdError = document.getElementById("pwdError");
  confirmPwdError.style.opacity = "0"; // 기본적으로 숨김

  // 새 비밀번호 확인 체크 (입력 중에 즉시 체크)
  function checkPasswordMatch() {
    const newPwd = newPwdInput.value;
    const confirmPwd = confirmPwdInput.value;

    if (!confirmPwd) {
      confirmPwdError.style.opacity = "0"; // 입력값이 없으면 경고 메시지 숨김
      confirmPwdInput.style.border = "1px solid #ccc";
    } else if (newPwd !== confirmPwd) {
      confirmPwdError.style.opacity = "1"; // 잘못된 경우 경고 메시지 표시
      confirmPwdInput.style.border = "1px solid #8A1812";
    } else {
      confirmPwdError.style.opacity = "0"; // 올바른 경우 경고 메시지 숨김
      confirmPwdInput.style.border = "1px solid #ccc";
    }
  }

  newPwdInput.addEventListener("input", checkPasswordMatch);
  confirmPwdInput.addEventListener("input", checkPasswordMatch);
});



//=====================================================================================

document.addEventListener("DOMContentLoaded", function() {
  let selectedGender = "0"; // 초기값 설정 (선택안함을 0으로 설정)

  const genderButtons = document.querySelectorAll(".input_gender button");

  // 초기값 설정: 선택안함 버튼을 기본으로 설정
  genderButtons.forEach(btn => {
    if (btn.value === "0") {
      btn.classList.remove("btn-outline-danger");
      btn.classList.add("btn-danger"); // 선택안함 버튼 색상 변경
    }
  });

  // 성별 버튼 클릭 이벤트 처리
  genderButtons.forEach(button => {
    button.addEventListener("click", function () {
      // 모든 버튼의 색상 초기화
      genderButtons.forEach(btn => {
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-outline-danger"); // 기본 스타일로 변경
      });

      // 클릭된 버튼 색상 변경
      this.classList.remove("btn-outline-danger");
      this.classList.add("btn-danger"); // 클릭된 버튼 색상 변경

      // 선택된 성별 값 저장 (매핑)
      selectedGender = this.value; // 클릭된 버튼의 value를 직접 저장

      // 선택된 성별 값 로그 출력
      console.log("선택된 성별:", selectedGender);
    });
  });

  // 폼 제출 이벤트 처리
  document.getElementById("signup-form").addEventListener("submit", function (event) {

    const genderInput = document.createElement("input");
    genderInput.type = "hidden";
    genderInput.name = "memGender"; // 서버에서 사용할 이름
    genderInput.value = selectedGender; // 매핑된 값 사용 (정수형으로 변환)

    console.log("전송할 성별 값:", genderInput.value); // 로그 출력

    this.appendChild(genderInput); // 폼에 추가
  });

  // 핸드폰 11자리 제한
  document.getElementById("input_phone").addEventListener("input", function (event) {
    // 숫자만 입력 가능하도록 필터링
    this.value = this.value.replace(/[^0-9]/g, "");

    // 11자리 이상 입력 방지
    if (this.value.length > 11) {
      this.value = this.value.slice(0, 11);
    }

  });

  // 이메일 형식 확인
  const emailInput = document.getElementById("input_email");
  const alertMsg = document.getElementById("GR_alert_msg");
  alertMsg.style.opacity = "0"; // 기본적으로 숨김
  alertMsg.textContent = "* 올바른 이메일 형식을 입력해주세요. (예: example@nuovo.com)";

  emailInput.addEventListener("input", function () {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (this.value.trim() === "") {
      alertMsg.style.opacity = "0"; // 🔹 입력값이 없으면 경고 메시지 숨김
    } else if (!emailPattern.test(this.value)) {
      alertMsg.style.opacity = "1"; // 🔹 잘못된 형식이면 경고 메시지 표시
    } else {
      alertMsg.style.opacity = "0";; // 🔹 올바른 형식이면 경고 메시지 숨김
    }
  });

});