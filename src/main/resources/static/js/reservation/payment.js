document.addEventListener("DOMContentLoaded", function () {
    const agreeCheck = document.getElementById("GR_payment_agree_checkbox");
    const payButton = document.getElementById("GRpaybtn");

    payButton.addEventListener("click", async function (event) {
        if (!agreeCheck.checked) {
            event.preventDefault();

            Swal.fire({
                title: "구매 진행에 동의하셔야 합니다!",
                text: "계속 진행하려면 동의함을 선택해주세요.",
                icon: "error",
                confirmButtonText: "확인",
                customClass: {confirmButton: "custom-btn"},
                buttonsStyling: false
            });
            return;
        }

        // 🔥 `totalPayment` 값을 가져와서 넘겨줌
        const totalPayment = document.getElementById("totalPayment").value;
        const reservationDateId = document.getElementById("reservationDateId").value;

        // 포트원 결제 요청 함수 호출
        await requestPay(totalPayment, reservationDateId);
    });

// PortOne SDK가 로드될 때까지 기다리는 함수


    async function requestPay(totalPayment, reservationDateId) {
        let IMP = window.IMP;
        IMP.init("imp38542584");

        IMP.request_pay({
            channelKey: "channel-key-7ee0a403-bf1e-4729-88c7-aadbd47cfed8",
            pg: "html5_inicis",
            pay_method: "card",
            buyer_tel: "010-0000-0000",
            merchant_uid: reservationDateId,  // 🔥 reservationDateId를 merchant_uid로 사용
            name: "누오보 예약",
            amount: 1000,
            buyer_email:"jw@naver.com",
            buyer_name: "지원",
            buyer_addr:"지원도 세온시 성미동 소라아파트",
            buyer_postcode:"15858"
        }, async (response) => {
            console.log("✅ 결제 응답:", response);


            // 🔥 결제 검증 요청
            if (response.success) {
                alert("결제가 완료되었습니다!");
                // window.location.href = response.redirectUrl;
                window.location.href = "/reservation/confirm?reservationDateId="+reservationDateId;
            } else {
                alert("결제 검증 실패: " + response.error_msg);
            }
        });
    }


    app.use(bodyParser.json());

// 🔥 여기에 본인의 포트원 API Key & Secret을 입력하세요
    const PORTONE_API_KEY = "8743762502733103";
    const PORTONE_API_SECRET = "JIIUH53xtlN2Rf6rpMcRaAactGOqw2jmEmS1ro4cJ6n7KIU2uLWywQ4v1hJvgpWlpHasQb6nZvPNWlMu";


// 결제 검증 API
    app.post("/payment/complete", async (req, res) => {
        try {

            const { imp_uid, merchant_uid } = req.body;

            // 1. 포트원 Access Token 발급
            const tokenResponse = await fetch("https://api.iamport.kr/users/getToken", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    imp_key: PORTONE_API_KEY,
                    imp_secret: PORTONE_API_SECRET
                }),
            });
            if (!tokenResponse.ok)
                throw new Error(`tokenResponse: ${await tokenResponse.json()}`);
            const { response } = await tokenResponse.json();
            const { access_token } = response;

            const paymentResponse = await fetch(
                `https://api.iamport.kr/payments/${imp_uid}`,
                { headers: { Authorization: access_token } },
            );
            if (!paymentResponse.ok)
                throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
            const payment = await paymentResponse.json();

            if(payment.status == "paid"){
                res.json({ success: true, message: "결제 검증 및 주문 저장 완료" });
                window.location.href = verifyData.redirectUrl; // 🔥 결제 완료 후 이동
            } else {
                res.json({ success: false, message: "결제 실패" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "서버 오류 발생" });
        }
    });

});
