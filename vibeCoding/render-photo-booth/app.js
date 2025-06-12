// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startCamera');
const captureButton = document.getElementById('capturePhoto');
const photoGallery = document.getElementById('photoGallery');
const overlay = document.getElementById('overlay');

let currentFilter = 'none';
let stream = null;

// Filter configurations
const filters = {
    none: '',
    peachtree: 'filter-peachtree',
    webdev: 'filter-webdev',
    atl: 'filter-atl',
    'coca-cola': 'filter-coca-cola',
    render: 'filter-render'
};

// Initialize camera
startButton.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });
        video.srcObject = stream;
        startButton.disabled = true;
        captureButton.disabled = false;
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
});

// Handle filter selection
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filterName = button.dataset.filter;
        currentFilter = filterName;
        
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        button.classList.add('active');
        
        // Apply filter to video preview
        video.className = filters[filterName];
    });
});

// Capture photo
captureButton.addEventListener('click', () => {
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to the canvas
    const context = canvas.getContext('2d');
    context.scale(-1, 1); // Mirror the image
    context.translate(-canvas.width, 0);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Create a new image element
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.className = filters[currentFilter];
    
    // Add the photo to the gallery
    const photoContainer = document.createElement('div');
    photoContainer.className = 'photo-container';
    photoContainer.appendChild(img);
    
    // Add download button
    const downloadBtn = document.createElement('a');
    downloadBtn.href = canvas.toDataURL('image/png');
    downloadBtn.download = `render-conf-photo-${Date.now()}.png`;
    downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
    downloadBtn.className = 'download-btn';
    photoContainer.appendChild(downloadBtn);
    
    // Add to gallery
    photoGallery.insertBefore(photoContainer, photoGallery.firstChild);
    
    // Add animation effect
    setTimeout(() => {
        img.style.opacity = '1';
    }, 100);
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});

// Add some web-themed overlays
const webOverlays = [
    { name: 'HTML Tags', html: '<div class="overlay-item">&lt;div&gt;&lt;/div&gt;</div>' },
    { name: 'CSS Rule', html: '<div class="overlay-item">.style { color: #fff; }</div>' },
    { name: 'JavaScript', html: '<div class="overlay-item">console.log("Hello Render!");</div>' }
];

// Function to randomly position overlays
function updateOverlays() {
    overlay.innerHTML = '';
    webOverlays.forEach(overlayItem => {
        const element = document.createElement('div');
        element.innerHTML = overlayItem.html;
        element.style.position = 'absolute';
        element.style.top = `${Math.random() * 80}%`;
        element.style.left = `${Math.random() * 80}%`;
        element.style.transform = `rotate(${Math.random() * 360}deg)`;
        element.style.opacity = '0.3';
        overlay.appendChild(element);
    });
}

// Update overlays periodically
setInterval(updateOverlays, 5000);

// Initial overlay update
updateOverlays();