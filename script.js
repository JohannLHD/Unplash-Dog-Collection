const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');



let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unplash API
let count = 10;
const apiKey = 'koaIs_jIKGXs-TFq4xaSRhHJxPP0G_y0KXiainAFNX8';
//const query = 'dog'
let query = 'shiba';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${ apiKey }&count=${ count }&query=${ query }`;

//Check if all images were loaded
function imageLoaded() {
    //console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

//Helper function to Set Attributes
function setAttrbiutes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


//Create Elements For links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //console.log('total images', totalImages)
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {

        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttrbiutes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create img per photos
        const img = document.createElement('img');
        setAttrbiutes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Listener , check when each is finished
        img.addEventListener('load', imageLoaded)

        //Put <img> inside <a> then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplah API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (err) {
        //Catch error here
        console.log(err)
    }
}

// Check to see if scrolling near bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//On Load
getPhotos();