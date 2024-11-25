document.addEventListener('DOMContentLoaded', () => {
    const likeBtn = document.getElementById('likeBtn');

    likeBtn.addEventListener('click', async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');
        const likeCountText = document.getElementById('likeCountText');

        const isLiked = likeBtn.classList.contains('post-liked-active')
            ? true
            : false;

        if (isLiked) {
            const response = await fetch(`${API_BASE_URL}/posts/likes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ postId }),
            });

            if (response.status === 204) {
                likeBtn.classList.remove('post-liked-active');
                likeCountText.textContent =
                    parseInt(likeCountText.textContent) - 1;
            }
        } else {
            const response = await fetch(`${API_BASE_URL}/posts/likes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ postId }),
            });

            if (response.status === 201) {
                likeBtn.classList.add('post-liked-active');
                likeCountText.textContent =
                    parseInt(likeCountText.textContent) + 1;
            }
        }
    });
});
