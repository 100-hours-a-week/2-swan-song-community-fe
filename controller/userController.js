import bcrypt from 'bcryptjs';
import { users } from '../model/inMemoryDB.js';
import { saveImage } from '../module/imageUtils.js';
import { User } from '../model/user.js';

const findUserByEmail = email => {
    return users.find(user => user.email === email);
};

const findUserByNickname = nickname => {
    return users.find(user => user.nickname === nickname);
};

const createUser = async (email, password, nickname, profileImage) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImageUrl = profileImage ? await saveImage(profileImage) : null; // 이미지 저장
    const newUser = new User(email, nickname, hashedPassword, profileImageUrl);
    users.push(newUser);
    return newUser;
};

const checkNicknameAvailability = nickname => {
    return !findUserByNickname(nickname);
};

export default {
    findUserByEmail,
    findUserByNickname,
    createUser,
    checkNicknameAvailability,
};
