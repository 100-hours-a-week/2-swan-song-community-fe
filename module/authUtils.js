const sessions = {}; // 로그인 세션을 저장

// 로그인 세션 추가
export function addSession(user) {
    const sessionId = Math.random().toString(36).substr(2, 10);
    const { password, ...userWithoutPassword } = user;
    sessions[sessionId] = userWithoutPassword;
    return sessionId;
}

// 로그인 세션 제거
export function removeSession(sessionId) {
    delete sessions[sessionId];
}

// 특정 회원 로그인 세션 제거
export function removeSessionByUserId(userId) {
    for (const sessionId in sessions) {
        if (sessions[sessionId].id === userId) {
            delete sessions[sessionId];
            break;
        }
    }
}

// 로그인 세션 조회
export function getLoggedInUser(sessionId) {
    return sessions[sessionId];
}

// 로그인 여부 확인
export function isLoggedIn(sessionId) {
    return !!sessions[sessionId];
}
