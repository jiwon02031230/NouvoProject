document.addEventListener("DOMContentLoaded", function () {
    // 삭제 버튼 이벤트 리스너 추가
    document.querySelectorAll(".GILdelbtn").forEach(button => {
        button.addEventListener("click", function () {
            Swal.fire({
                title: "게시글을 삭제하시겠습니까?",
                text: "삭제 후에는 복구할 수 없습니다.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "예, 삭제합니다",
                cancelButtonText: "아니오",
                customClass: {
                    confirmButton: "custom-btn",
                    cancelButton: "custom-cancel"
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    // 게시글 ID 가져오기 (버튼이 있는 부모 요소에서 data-id 값 가져오기)
                    let postId = button.closest(".GILbuttonBox").dataset.id;

                    $.post("http://localhost:9010/deletePost", {inquiryId: postId})
                        .done(response => {
                            if (data.success) {
                                Swal.fire({
                                    title: "삭제가 완료되었습니다.",
                                    icon: "success",
                                    confirmButtonText: "확인",
                                    customClass: {
                                        confirmButton: "custom-btn",
                                    },
                                    buttonsStyling: false
                                }).then(() => {
                                    window.location.href = "/inquiry";
                                });
                            } else {
                                Swal.fire({
                                    title: "삭제 실패!",
                                    text: "오류가 발생했습니다. 다시 시도해주세요.",
                                    icon: "error",
                                    confirmButtonText: "확인"
                                });
                            }
                        });
                }
            });
        });
    });
});
