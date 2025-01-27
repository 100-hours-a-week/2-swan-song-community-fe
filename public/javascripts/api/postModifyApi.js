const modifyPost = async (postId, formData) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
    });

    const responseJson = await response.json();

    return responseJson;
};

const fetchPostInput = async postId => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}?comment=n`, {
        method: 'GET',
        credentials: 'include',
    });

    const responseJson = await response.json();
    return responseJson;
};

const renderPostInput = postInput => {
    const postModifyForm = document.getElementById('postModifyForm');
    const titleInput = postModifyForm.querySelector('input[name="title"]');
    const contentInput = postModifyForm.querySelector(
        'textarea[name="content"]',
    );

    titleInput.value = postInput.title;
    contentInput.value = postInput.content;
};

const renderPostImage = imageUrl => {
    const imagePlaceholderWrapper = document.querySelector(
        '.image-placeholder-wrapper',
    );
    const innerHtml = `
        <div class="image-placeholder no-padding no-border-bottom">
            <img
                class="placeholder-cur-profile"
                src="${imageUrl}"
                alt=""
            />
            <button class="remove-image-btn" type="button" onclick="removeImageButtonAction()"> 
                <img
                    class="remove-image"
                    src="../images/assets/Close_square_light.svg"
                    alt="이미지 삭제"
                />
            </button>
        </div>
    `;

    imagePlaceholderWrapper.innerHTML = innerHtml;
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    fetchPostInput(postId).then(response => {
        if (response.code === 2000) {
            renderPostInput(response.data);
            if (response.data.imageUrl !== null) {
                renderPostImage(`${IMAGE_BASE_URL}${response.data.imageUrl}`);
            }
        }
    });

    const modifyPostForm = document.getElementById('postModifyForm');

    modifyPostForm.addEventListener('submit', async event => {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('postId');

        const formData = new FormData(modifyPostForm);

        const result = await modifyPost(postId, formData);

        if (result.code === 2000) {
            window.location.href = `post-detail.html?postId=${postId}`;
        }
    });
});
