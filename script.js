function navigateTo(url) {
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
});
