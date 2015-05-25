/*jslint browser: true*/
(function (window) {
    'use strict';

    var flickrContainer,
        script,
        storedImages,
        tags;

    flickrContainer = document.getElementById("flickr-container");

    if (localStorage.getItem('storedImages') !== null) {
        storedImages = localStorage.getItem('storedImages').split(',');
    } else {
        storedImages = [];
    }

    function inStorage(url) {
        return storedImages.indexOf(url) !== -1;
    }

    function selectedImg() {

        flickrContainer.addEventListener('click', function (e) {
            var clickedImg = e.target,
                clickedUrl = e.target.getAttribute('src'),
                index;

            if (clickedImg.className !== 'selected') {
                clickedImg.setAttribute('class', 'selected');
            } else {
                clickedImg.setAttribute('class', '');
            }

            if (inStorage(clickedUrl)) {
                index = storedImages.indexOf(clickedUrl);
                storedImages.splice(index, 1);
            } else {
                storedImages.push(clickedUrl);
            }

            localStorage.setItem('storedImages', storedImages.toString());
        });
    }

    function displayImages(images) {
        var i,
            img,
            ul,
            li;

        ul = document.createElement('ul');

        for (i = 0; i < images.length; i = i + 1) {
            li = document.createElement('li');
            img = document.createElement('img');
            img.setAttribute('src', images[i]);

            if (inStorage(images[i])) {
                img.setAttribute('class', 'selected');
            } else {
                img.setAttribute('class', '');
            }

            li.appendChild(img);
            ul.appendChild(li);
        }

        flickrContainer.appendChild(ul);

        selectedImg();
    }

    function cb(data) {
        var i,
            noOfImages,
            imgArray = [];

        noOfImages = data.items.length;

        for (i = 0; i < noOfImages; i = i + 1) {
            imgArray.push(data.items[i].media.m);
        }

        displayImages(imgArray);
    }

    window.cb = cb;
    tags = 'london';
    script = document.createElement('script');
    script.src =
        'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
}(window));