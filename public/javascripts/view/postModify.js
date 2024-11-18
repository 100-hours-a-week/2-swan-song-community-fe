const removeImageButtonAction = () => {
    const imageInput = document.getElementById('postModifyImageInput');
    const imagePlaceHolder = document.querySelector('.image-placeholder');
    imageInput.value = '';

    if (imagePlaceHolder) {
        imagePlaceHolder.parentNode.removeChild(imagePlaceHolder);
    }

    const removeImageFlagInput = document.getElementById(
        'removeImageFlagInput',
    );
    removeImageFlagInput.value = 'true';
};

document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('postModifyImageInput');
    const imagePlaceholderWrapper = document.querySelector(
        '.image-placeholder-wrapper',
    );

    imageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imagePlaceHolder =
                    document.querySelector('.image-placeholder');
                if (imagePlaceHolder) {
                    imagePlaceHolder.remove();
                }

                const innerHtml = `
                    <div class="image-placeholder no-padding no-border-bottom">
                        <img
                            class="placeholder-cur-profile"
                            src="${e.target.result}"
                            alt=""
                        />
                        <button class="remove-image-btn" type="button" onclick="removeImageButtonAction()"> 
                            <img
                                class="remove-image"
                                src="../images/Close_square_light.svg"
                                alt="이미지 삭제"
                            />
                        </button>
                    </div>
                `;

                imagePlaceholderWrapper.innerHTML = innerHtml;
            };
            reader.readAsDataURL(file);
        }
    });
});
