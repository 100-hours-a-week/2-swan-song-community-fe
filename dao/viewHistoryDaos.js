import { viewHistories } from '../model/inMemoryDB.js';
import { binarySearch } from '../dao/algorithm.js';

class IViewHistoryDao {
    constructor() {
        if (new.target === IViewHistoryDao) {
            throw new Error("'IViewHistoryDao'는 객체를 생성할 수 없습니다.");
        }
    }

    countViewHistoriesByReqIpAndPostId(reqIp, postId) {
        throw new Error('구현되지 않은 메소드입니다.');
    }

    createViewHistory(viewHistory) {
        throw new Error('구현되지 않은 메소드입니다.');
    }

    deleteViewHistoriesByPostId(postId) {
        throw new Error('구현되지 않은 메소드입니다.');
    }
}

class InMemoryViewHistoryDao extends IViewHistoryDao {
    constructor(viewHistories) {
        super();
        this.viewHistories = viewHistories; // 기존 inMemDB의 viewHistories 사용
    }

    existsViewHistoriesByReqIpAndPostId(reqIp, postId) {
        const viewHistoryId = binarySearch(
            this.viewHistories,
            { reqIp, postId },
            (a, b) => a.reqIp === b.reqIp && a.postId === b.postId,
            (a, b) => {
                if (a.reqIp != b.reqIp) return a.reqIp < b.reqIp;
                else return a.postId < b.postId;
            },
        );

        if (viewHistoryId === -1) {
            return false;
        }

        return true;
    }

    countViewHistoriesByPostId(postId) {
        return this.viewHistories.filter(v => v.postId === postId).length;
    }

    createViewHistory(viewHistory) {
        if (
            !this.existsViewHistoriesByReqIpAndPostId(
                viewHistory.reqIp,
                viewHistory.postId,
            )
        ) {
            this.viewHistories.push(viewHistory);
        }
    }

    deleteViewHistoriesByPostId(postId) {
        const historiesToDelete = this.viewHistories.filter(
            v => v.postId === postId,
        );
        historiesToDelete.forEach(v => {
            const idx = this.viewHistories.indexOf(v);
            this.viewHistories.splice(idx, 1);
        });
    }
}

export const viewHistoryDao = new InMemoryViewHistoryDao(viewHistories);
