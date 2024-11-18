document.addEventListener('DOMContentLoaded', () => {
    const btnPostDeleteConfirm = document.getElementById(
        'btnPostDeleteConfirm',
    );

    const deletePostApi = async postId => {
        await fetch(`/api/v1/posts/${postId}`, {
            method: 'DELETE',
        });
    };

    btnPostDeleteConfirm.addEventListener('click', async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('postId'));

        await deletePostApi(postId);
        window.location.href = '/';
    });
});
