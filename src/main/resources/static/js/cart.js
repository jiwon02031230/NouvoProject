document.addEventListener("DOMContentLoaded", function () {

    function updateTotalPrice() {
        let totalPrice = 0;
        document.querySelectorAll(".GCartContents").forEach((item) => {
            const price = parseInt(item.querySelector(".GCartContexprice span").textContent, 10);
            const quantity = parseInt(item.querySelector(".GCartQuantity input").value, 10);
            totalPrice += price * quantity;
        });
        document.getElementById("totalPayment").textContent = totalPrice.toLocaleString(); // 천 단위 콤마 추가
    }

    updateTotalPrice();

    document.querySelectorAll(".GCartQuantity").forEach((quantityBox) => {
        const minusBtn = quantityBox.querySelector(".GCartMinus");
        const plusBtn = quantityBox.querySelector(".GCartMplus");
        const quantityInput = quantityBox.querySelector("input");
        const menuId = quantityBox.closest(".GCartContents").querySelector("#menuId").value;

        if (!quantityInput) return;

        quantityInput.value = parseInt(quantityInput.value) || 1;

        function updateQuantity(newValue) {
            $.post("http://localhost:9010/updateCart", { menuId: menuId, quantity: newValue })
                .done(response => {
                    console.log("수량 변경 완료:", response);
                    updateTotalPrice();
                })
                .fail(error => {
                    Swal.fire("오류 발생", "수량 변경 중 문제가 발생했습니다.", "error");
                });
        }

        if (plusBtn) {
            plusBtn.addEventListener("click", function () {
                quantityInput.value = parseInt(quantityInput.value) + 1;
                updateQuantity(quantityInput.value);
            });
        }

        if (minusBtn) {
            minusBtn.addEventListener("click", function () {
                let currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                    updateQuantity(quantityInput.value);
                }
            });
        }
    });

    document.querySelectorAll(".GCartCloseBtn").forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", function () {
            const menuId = this.querySelector("input[type='hidden']").value;

            console.log("삭제할 menuId:", menuId);

            $.post("http://localhost:9010/deleteCart", { menuId: menuId })
                .done(response => {
                    console.log("삭제 응답:", response);
                    Swal.fire({
                        title: "장바구니에서 삭제 완료!",
                        text: "상품이 삭제되었습니다.",
                        icon: "success",
                        confirmButtonText: "확인",
                        customClass: {
                            confirmButton: "custom-btn"
                        },
                        buttonsStyling: false
                    }).then(() => {
                        location.reload();
                    });
                })
                .fail(error => {
                    Swal.fire("오류 발생", "삭제 중 문제가 발생했습니다.", "error");
                });
        });
    });
});
