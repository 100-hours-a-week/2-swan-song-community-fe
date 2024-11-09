document.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.querySelector('input[name="title"]');
    const postContentTextarea = document.querySelector(
        'textarea[name="postContent"]',
    );
    const submitButton = document.querySelector('.post-modify-btn');
    const helperText = document.querySelector('.helper-text');

    function validateTitle() {
        if (titleInput.value.length > 26) {
            titleInput.value = titleInput.value.slice(0, 26);
        }
    }

    function updateButtonState() {
        const isTitleFilled = titleInput.value.trim() !== '';
        const isContentFilled = postContentTextarea.value.trim() !== '';

        if (isTitleFilled && isContentFilled) {
            submitButton.style.backgroundColor = '#7f6aee';
            submitButton.disabled = false;
            helperText.style.display = 'none'; // 모두 입력 시 헬퍼 텍스트 숨김
        } else {
            submitButton.style.backgroundColor = ''; // 버튼 색상 초기화
            submitButton.disabled = true; // 버튼 비활성화
            helperText.style.display = 'block'; // 헬퍼 텍스트 표시
        }
    }

    titleInput.addEventListener('input', () => {
        validateTitle();
        updateButtonState();
    });

    postContentTextarea.addEventListener('input', updateButtonState);

    updateButtonState(); // 초기 상태 업데이트
});
