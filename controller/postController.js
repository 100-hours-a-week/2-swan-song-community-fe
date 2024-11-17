import { likes, comments } from '../model/inMemoryDB.js';
import { postDao } from '../dao/postDaos.js';
import { viewHistoryDao } from '../dao/viewHistoryDaos.js';
import { userDao } from '../dao/userDaos.js';
import { Post } from '../model/post.js';
import { Comment } from '../model/comment.js';
import { ViewHistory } from '../model/viewHistory.js';
import { PostLike } from '../model/postLike.js';
import { saveImage } from '../module/imageUtils.js';

class PostController {
    constructor(postDao) {
        this.postDao = postDao;
    }

    findDetailPostInfo(postId, commentFlag, reqIp) {
        const post = this.postDao.findById(postId);

        viewHistoryDao.createViewHistory(new ViewHistory(reqIp, post.id));

        const author = userDao.findById(post.authorId);

        if (!author) {
            throw {
                code: 4004,
                message: '작성자를 찾을 수 없습니다',
                data: null,
            };
        }

        const postComments = comments.filter(c => c.postId === postId);

        const data = {
            postId: post.id,
            title: post.title,
            content: post.content,
            imageUrl: post.contentImageUrl,
            authorName: author.nickname,
            profileImageUrl: author.profileImageUrl,
            likeCount: likes.filter(l => l.postId === post.id).length,
            viewCount: viewHistoryDao.countViewHistoriesByPostId(post.id),
            commentCount: postComments.length,
            createdDateTime: post.createdDateTime,
        };

        // commentFlag에 따라 댓글 포함 여부 결정
        if (commentFlag === 'y') {
            data.comments = postComments.map(c => {
                const author = userDao.findById(c.authorId);

                return {
                    commentId: c.commentId,
                    content: c.content,
                    createdDateTime: c.createdDateTime,
                    authorName: author.nickname,
                    profileImageUrl: author.profileImageUrl,
                };
            });
        }

        return {
            code: 2000,
            message: '게시글 상세 정보 단건 조회 성공',
            data: data,
        };
    }

    findAllSummaryPostInfo(queriedSize, queriedLastId) {
        const { targetPosts, hasNext, lastId } = this.postDao.getPaginatedPosts(
            queriedSize,
            queriedLastId,
        );

        const content = targetPosts.map(p => {
            const author = userDao.findById(p.authorId);

            return {
                postId: p.id,
                title: p.title,
                likeCount: likes.filter(l => l.postId === p.id).length,
                commentCount: comments.filter(c => c.postId === p.id).length,
                viewCount: viewHistoryDao.countViewHistoriesByPostId(p.id),
                createdDateTime: p.createdDateTime,
                authorName: author.nickname,
                profileImageUrl: author.profileImageUrl,
            };
        });

        // TODO: 다른 API 에서도 커서 페이징 응답 형식이 중복될 경우 따로 분리하여 재사용합시다.
        const data = {
            content: content,
            hasNext: hasNext,
            lastId: lastId,
        };

        if (data.content.length === 0) {
            return {
                code: 4004,
                message: '게시글이 존재하지 않습니다.',
                data: data,
            };
        }

        return {
            code: 2000,
            message: '게시글 요약 정보 전체 조회 성공',
            data: data,
        };
    }

    async createPost(postDto) {
        const { title, content, contentImage, user: author } = postDto;
        const contentImageUrl = contentImage
            ? await saveImage(contentImage)
            : null; // 이미지 저장
        const post = new Post(title, content, contentImageUrl, author.userId);
        this.postDao.createPost(post);

        return { code: 2001, message: '성공', data: { postId: post.id } };
    }

    createPostLike(userId, postId) {
        const post = this.postDao.findById(postId);

        const postLike = likes.find(l => l.postId === post.id);

        if (postLike !== undefined) {
            throw {
                code: 4009,
                message: '이미 좋아요를 눌렀습니다',
                data: null,
            };
        }

        const newPostLike = new PostLike(userId, postId);
        likes.push(newPostLike);

        return {
            code: 2001,
            message: '성공',
            data: { likeId: newPostLike.likeId },
        };
    }

    deletePostLike(userId, postId) {
        const postLikeIndex = likes.findIndex(l => {
            return l.postId === postId && l.userId === userId;
        });
        if (postLikeIndex === -1) {
            throw {
                code: 4004,
                message: '좋아요를 찾을 수 없습니다',
                data: null,
            };
        }

        likes.splice(postLikeIndex, 1);
    }

    createPostComment(commentDto) {
        const { postId, content, author } = commentDto;

        const post = this.postDao.findById(postId);

        const newComment = new Comment(content, author.userId, post.id);
        comments.push(newComment);

        // newComment 에서 authorId 를 통해 author 정보를 찾아온다.
        const commentResult = {
            commentId: newComment.commentId,
            content: newComment.content,
            postId: post.id,
            createdDateTime: newComment.createdDateTime,
            authorName: author.nickname,
            profileImageUrl: author.profileImageUrl,
        };

        return {
            code: 2001,
            message: '성공',
            data: { comment: commentResult },
        };
    }

    deletePostComment(commentId) {
        const commentIndex = findIndex(c => c.commentId === commentId);
        splice(commentIndex, 1);
    }
}

export const postController = new PostController(postDao);
