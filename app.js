const urlParams = new URLSearchParams(window.location.search);
const target = urlParams.get('target').replace(/[^a-zA-Z0-9-_]/g, '');

let redirects = null;

document.addEventListener('DOMContentLoaded', function() {

    fetch(`${window.location.origin}/redirects.json`)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data) || !data.every(item => 
                item && typeof item.title === 'string' && 
                typeof item.tag === 'string' && 
                typeof item.destination === 'string')) {
                throw new Error('Invalid data format: expected an array of objects with title, tag, and destination strings.');
            }
            redirects = data;

            const matchedRedirect = redirects.find(redirect => redirect.tag === target);
            if (matchedRedirect) {
                window.location.href = matchedRedirect.destination;
                console.log(matchedRedirect);
            } else {
                console.log('No matching redirect found for target:', target);
            }
        }
    )
    .catch(error => console.error('Error loading redirects.json:', error));

});