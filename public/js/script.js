const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API credentials
const count = 15;
const apiKey = '-zWC978g0_Oflj-eWKlh1GZ-Mgi2PlKvVqyxN7HwVMI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/* 
Wanted responses that are part of the API:
photo.links.html - link to the photo
photo.urls.regular - regular sized image source link
photo.alt_description - description text
*/


// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add photos to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> item to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> then put both inside imageContainer element
        item.appendChild(img); //nest img inside item
        imageContainer.appendChild(item); //nest item inside overall image container
    });
}

// Event listener, check when each is finished loading



// Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error) {
        // Catch error here
        console.log(error);
    }
}

// Check to see if scrolling near bottom of page, then Load More Photos

window.addEventListener('scroll', () => {
    // console.log('scrolled');
    /*
    window.innerHeight - height of browser window
    window.scrollY - how high we are from the top of the page
    document.body.offsetHeight
    */
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();
