const cardText = document.querySelectorAll('.card-text');
const cardGrid = document.querySelector('.row.row-cols-1.row-cols-md-2');

cardText.forEach(elem => {
    let elemHeight = elem.offsetHeight;
    let lineHeight = parseInt(document.defaultView.getComputedStyle(elem, null).getPropertyValue("line-height"));
    let lines = elemHeight / lineHeight;
    // console.log(`elemHeight = ${elemHeight}, lineHeight = ${lineHeight}, lines = ${lines}`);

    if (lines > 2) {
        elem.classList.add('ellipsis');
        let parrent = elem.closest('.card-body.border.border-top-0.border-start-0.border-end-0.border-bottom-3');
        let btn = document.createElement('button');
        let readMore = false;

        parrent.style.position = 'relative';
        btn.textContent = "Show more...";
        btn.type = "button";
        btn.className = "btn readMore";
        btn.style.cssText = `
            position: absolute;
            top: 100px;
            left: 5px;
        `;
        btn.onclick = () => {
            elem.classList.toggle("ellipsis");
            if (!readMore) {
                btn.style.top = '120px';
                readMore = true;
            } else {
                btn.style.top = '100px';
                readMore = false;
            }
        }

        elem.after(btn);
    }
});


async function loadImages(numImages = 5) {
    for (let i = 0; i < numImages; i++) {
        await fetch('https://picsum.photos/v2/list?page=1&limit=9')
            .then(response => response.json())
            .then(data => {
                let card = document.createElement('div');
                card.setAttribute('class', 'col mb-4');
                card.innerHTML = `
                    <div class="card">
                        <img src="${data[i].download_url}.jpg" class="card-img-top" alt="img from unsplash">
                        <div class="card-body border border-top-0 border-start-0 border-end-0 border-bottom-3">
                            <h5 class="card-title color-dark fw-bold fs-4">Heading</h5>
                            <p class="card-text mb-4">Here goes some sample, example text that is relatively short.</p>
                        </div>
                        <div class="card-body">
                            <a class="btn btn-app-primary fw-bold me-2" href="#">Save to collection</a>
                            <a class="btn btn-app-outline-secondary fw-bold" href="#">Share</a>
                        </div>
                    </div>
                `;
                cardGrid.appendChild(card);
            })
    }
};

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight) {
        loadImages();
    }
});
