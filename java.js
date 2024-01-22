window.addEventListener('scroll', function () {
    // Adjust the 0.5 multiplier based on how fast you want the blur effect to occur
    var blurValue = Math.min(50, window.scrollY * 0.5);
    document.querySelector('.image-background img').style.filter = 'blur(' + blurValue + 'px)';
});

