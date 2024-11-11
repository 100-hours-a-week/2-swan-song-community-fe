document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('profileImage')
        .addEventListener('change', previewImage);
});

function previewImage(event) {
    const file = event.target.files[0];
    const imagePlaceholder = document.querySelector('.image-placeholder');
    const imagePreview = document.getElementById('imagePreview'); // 미리보기 이미지 요소 선택
    const placeholderPlus = document.querySelector('.placeholder-plus'); // "+" 아이콘 요소 선택

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result; // 선택한 이미지의 데이터 URL을 미리보기 이미지의 src로 설정
            imagePreview.style.display = 'block'; // 미리보기 이미지를 표시
            placeholderPlus.style.display = 'none'; // "+" 아이콘 숨김
        };

        reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    } else {
        imagePreview.style.display = 'none'; // 파일이 없을 경우 미리보기 이미지 숨김
        placeholderPlus.style.display = 'block'; // "+" 아이콘 표시
    }
}
