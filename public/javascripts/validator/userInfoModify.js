function validateNickname() {
    const nicknameInput = document.querySelector('input[name="nickname"]');
    const nickname = nicknameInput.value.trim();

    const generalHelpText = document.querySelector('.helper-text');

    if (nickname.length > 10) {
        generalHelpText.innerText = '* 닉네임은 10자 이하로 입력해야 합니다.';
        generalHelpText.style.display = 'block';
        return false; // 유효성 검사 실패
    }
    return true; // 유효성 검사 성공
}

// 폼 제출 시 validateNickname 호출
const userInfoModifyForm = document.querySelector('.user-info-modify-form');
userInfoModifyForm.addEventListener('submit', event => {
    if (!validateNickname()) {
        event.preventDefault(); // 유효성 검사 실패 시 폼 제출 방지
    }
});
