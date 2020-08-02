const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API credentials
const count = 10;
const apiKey = '-zWC978g0_Oflj-eWKlh1GZ-Mgi2PlKvVqyxN7HwVMI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/* 
Wanted responses that are part of the API:
photo.links.html - link to the photo
photo.urls.regular - regular sized image source link
photo.alt_description - description text
*/

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add photos to DOM
function displayPhotos(){
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
        // Put <img> inside <a> then put both inside imageContainer element
        item.appendChild(img); //nest img inside item
        imageContainer.appendChild(item); //nest item inside overall image container
    });
}


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
getPhotos();
