document.addEventListener('DOMContentLoaded', () => {
    const btnPostDeleteConfirm = document.getElementById(
        'btnPostDeleteConfirm',
    );

    const deletePostApi = async postId => {
        await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    };

    btnPostDeleteConfirm.addEventListener('click', async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('postId'));

        await deletePostApi(postId);
        window.location.href = '/';
    });
});
