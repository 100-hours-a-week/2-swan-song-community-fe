const uploadPost = async formData => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });

    const responseJson = await response.json();

    return responseJson;
};

document.addEventListener('DOMContentLoaded', () => {
    const uploadPostForm = document.getElementById('postUploadForm');

    uploadPostForm.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(uploadPostForm);

        const result = await uploadPost(formData);

        if (result.code === 2001) {
            window.location.href = '/';
        }
    });
});
