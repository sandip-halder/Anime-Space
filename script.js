let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search_result = document.getElementsByClassName('search_result')[0];
let search_input = document.getElementById('search_input');

left_btn.addEventListener('click', ()=> {
    cards.scrollLeft -= 140;
})
right_btn.addEventListener('click', ()=> {
    cards.scrollLeft += 140;
})

let json_url = "anime.json";
fetch(json_url).then(Response => Response.json())
    .then((data) =>{
        data.forEach((ele, i) => {
            let{ name, date, sposter, bposter, genre, url, duration} = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
            <img src="${sposter}" alt="${name}" class="poster">
                    <div class="rest_card">
                        <img src="${bposter}" alt="">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${genre}, ${date}</p>
                            </div>
                        </div>
                    </div>
            `
            cards.appendChild(card);
        });

        document.getElementById('title').innerText = data[0].name;
        document.getElementById('gen').innerText = data[0].genre;
        document.getElementById('date').innerText = data[0].date;
        document.getElementById('duration').innerText = data[0].duration;

        //Search Load Data
        data.forEach(element => {
            let{ name, date, sposter, genre, url} = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
            <img src="${sposter}" alt="">
                <div class="cont">
                    <h3>${name}</h3>
                        <p>${genre}, ${date}</p>
                </div>
            `
            search_result.appendChild(card);
        });

        //Search Filter

        search_input.addEventListener('keyup', ()=>{
            let filter = search_input.value.toUpperCase();
            let a = search_result.getElementsByTagName('a');

            for (let index = 0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('cont')[0];
                let TextValue = b.textContent || b.innerText;
                if (TextValue.toUpperCase().indexOf(filter) > -1) {
                    a[index].style.display = "flex";
                    search_result.style.visibility = "visible";
                    search_result.style.opacity = 1;
                } else {
                    a[index].style.display = "none";
                }
                if (search_input.value == 0) {
                    search_result.style.visibility = "hidden";
                    search_result.style.opacity = 0;
                }
            }
        })

        let video = document.getElementsByTagName('video')[0];
        let play = document.getElementById('play');

        play.addEventListener('click', ()=> {
            if (video.paused) {
                video.play();
                play.innerHTML = 'Pause <i class="bi bi-pause-fill"></i>';
            } else {
                video.pause();
                play.innerHTML = 'Play <i class="bi bi-play-fill"></i>'
            }
        })

        //Series Filter

        let series = document.getElementById('series');

        series.addEventListener('click', () => {
            cards.innerHTML = '';

            let series_arr = data.filter(ele => {
                return ele.type === "series";
            });
            series_arr.forEach((ele, i) => {
                let{ name, date, sposter, bposter, genre, url, duration} = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                        <div class="rest_card">
                            <img src="${bposter}" alt="">
                            <div class="cont">
                                <h4>${name}</h4>
                                <div class="sub">
                                    <p>${genre}, ${date}</p>
                                </div>
                            </div>
                        </div>
                `
                cards.appendChild(card);
            });
        })

        //Movies Filter
        let movies = document.getElementById('movies');
        movies.addEventListener('click', () => {
            cards.innerHTML = '';
            let movies_arr = data.filter(ele => {
                return ele.type === "movie";
                });
                movies_arr.forEach((ele, i) => {
                    let{ name, date, sposter, bposter, genre, url, duration} = ele;
                    let card = document.createElement('a');
                    card.classList.add('card');
                    card.href = url;
                    card.innerHTML = `
                    <img src="${sposter}" alt="${name}" class="poster">
                            <div class="rest_card">
                                <img src="${bposter}" alt="">
                                <div class="cont">
                                    <h4>${name}</h4>
                                    <div class="sub">
                                        <p>${genre}, ${date}</p>
                                    </div>
                                </div>
                            </div>
                    `
                    cards.appendChild(card);
                });
        })

    })