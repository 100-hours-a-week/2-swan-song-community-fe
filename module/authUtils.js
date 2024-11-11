const sessions = {}; // 세션을 저장할 객체

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

export function getLoggedInUser(sessionId) {
    return sessions[sessionId];
}

// 로그인 중인지 확인
export function isLoggedIn(sessionId) {
    return !!sessions[sessionId];
}
