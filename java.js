window.addEventListener('scroll', function () {
    var blurValue = Math.min(50, window.scrollY * 0.5);
    document.querySelector('.image-background img').style.filter = 'blur(' + blurValue + 'px)';
});

