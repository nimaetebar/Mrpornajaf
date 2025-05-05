document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const loadingOverlay = document.getElementById('loadingOverlay');
    const imageUrlInput = document.getElementById('imageUrlInput');
    const loadImageBtn = document.getElementById('loadImageBtn');
    const classImage = document.getElementById('classImage');
    const editableText = document.getElementById('editableText');

    // Hide loading overlay after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingOverlay.classList.add('hidden');
        }, 800); // Short delay for better user experience
    });

    // Handle image URL loading
    loadImageBtn.addEventListener('click', function() {
        const imageUrl = imageUrlInput.value.trim();
        if (imageUrl) {
            // Show loading animation
            classImage.style.opacity = '0.5';
            
            // Create a temporary image to test if the URL is valid
            const tempImg = new Image();
            tempImg.onload = function() {
                // URL is valid, update the image
                classImage.src = imageUrl;
                classImage.style.opacity = '1';
                // Save the URL to localStorage
                localStorage.setItem('savedImageUrl', imageUrl);
            };
            tempImg.onerror = function() {
                // URL is invalid
                alert('آدرس تصویر نامعتبر است. لطفاً آدرس دیگری را امتحان کنید.');
                classImage.style.opacity = '1';
            };
            tempImg.src = imageUrl;
        }
    });

    // Load saved image URL if available
    if (localStorage.getItem('savedImageUrl')) {
        const savedUrl = localStorage.getItem('savedImageUrl');
        imageUrlInput.value = savedUrl;
        classImage.src = savedUrl;
    }

    // Clear default text on first click
    editableText.addEventListener('focus', function() {
        if (editableText.textContent === 'متن خود را اینجا بنویسید...') {
            editableText.textContent = '';
        }
    });

    // Save text content to local storage when edited
    editableText.addEventListener('input', function() {
        localStorage.setItem('savedContent', editableText.innerHTML);
    });

    // Load saved content if available
    if (localStorage.getItem('savedContent')) {
        editableText.innerHTML = localStorage.getItem('savedContent');
    }
}); 