function takeAd(index) {
    fetch(`/takeAd/${index}`, { method: 'POST' }).then(response => {
        if (response.ok) {
            document.getElementById(`ad${index}`).style.display = 'none';
        }
        else {
        console.error('Failed to mark ad as taken');
        }
    });
};