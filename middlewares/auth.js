// 인가 미들웨어 정의
export const checkAuthorization = async (req, res, next) => {
    const sessionId = req.cookies.session_id || undefined;

    if (sessionId === undefined || !(await isLoggedIn(sessionId))) {
        return res.redirect('/login');
    }

    next(); // 인증된 경우 다음 미들웨어 또는 라우트로 진행
};

const isLoggedIn = async sessionId => {
    try {
        const response = await fetch(
            'http://localhost:8181/api/v1/auth/isLoggedIn',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionId}`,
                },
                credentials: 'include',
            },
        );
        const data = await response.json();
        return data.data.isLoggedIn;
    } catch (error) {
        console.error('인증 정보 획득 실패 :', error);
        return false;
    }
};
