$(document).ready(function() {
    $(".GMyRLdelbtn").click(function(event) {
        event.preventDefault(); // 기본 링크 동작 방지
        console.log("취소 클릭!!!!!")
        let resvId = this.id; // 클릭된 요소의 ID 가져오기

        Swal.fire({
            title: "예약을 취소하시겠습니까?",
            text: "취소 후에는 복구할 수 없습니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
            customClass: {
                confirmButton: "custom-btn",
                cancelButton: "custom-cancel"
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                // ✅ "예" 클릭 시 서버에 POST 요청 (예약 취소)
                $.post("/reservation/cancel", { resvId: resvId })
                    .done(function(response) {
                        // ✅ 성공 시: 취소 완료 모달
                        Swal.fire({
                            title: "취소가 완료되었습니다!",
                            text: "예약이 정상적으로 취소되었습니다.",
                            icon: "success",
                            confirmButtonText: "확인",
                            customClass: {
                                confirmButton: "custom-btn"
                            },
                            buttonsStyling: false
                        }).then(() => {
                            window.location.href = "/greservation"; // ✅ /greservation 컨트롤러로 이동
                        });
                    })
                    .fail(function(xhr, status, error) {
                        // ❌ 실패 시: 오류 메시지 모달
                        Swal.fire({
                            title: "취소가 정상적으로 처리되지 않았습니다!",
                            text: "잠시 후 다시 시도해주세요.",
                            icon: "error",
                            confirmButtonText: "확인",
                            customClass: {
                                confirmButton: "custom-btn"
                            },
                            buttonsStyling: false
                        });
                    });
            }
        });
    });
});
