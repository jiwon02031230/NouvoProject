// 구글 맵 초기화 함수
function initMap() {
    const mapOptions = {
        center: { lat: 37.4979, lng: 127.0276 }, // 강남구 위치 (예시)
        zoom: 15,
        mapTypeId: 'roadmap'
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // 마커 추가
    const marker = new google.maps.Marker({
        position: { lat: 37.4979, lng: 127.0276 },
        map: map,
        title: 'NUOVO 레스토랑'
    });
}