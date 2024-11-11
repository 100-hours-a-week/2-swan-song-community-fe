const logoutUser = async () => {
    try {
        const response = await fetch('/api/v1/auth/logout', {
            method: 'POST',
        });

        const data = await response.json();
        if (data.code === 2004) {
            window.location.href = '/login';
        } else {
            throw new Error('로그아웃 실패');
        }
    } catch (error) {
        throw new Error('API 호출 중 오류 발생: ' + error.message);
    }
};
