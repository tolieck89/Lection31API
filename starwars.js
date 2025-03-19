let peopleUrl = '';
let  parentclass = '';
let pagescount = 0;
document.querySelector('nav').addEventListener('click', event => {
    parentclass = event.target.className;
    peopleUrl = `https://swapi.dev/api/${parentclass}`;
    console.log(peopleUrl, parentclass);
    document.querySelector('.container_content').innerHTML='';
    loadPeople();
   

})

document.querySelector('.load-more').addEventListener('click', () => {
    loadPeople();
})

function loadPeople(page = null){
    let aux = peopleUrl;
    if (page){
        aux = `${peopleUrlюslice(0, 1)}${page}`
    }
    
    fetch(aux)
    .then(response => response.json())
    .then(data => {
        peopleUrl = data.next;
        if(data.next){
            document.querySelector('.load-more').classList.remove('hidden');
        } else {
            document.querySelector('.load-more').classList.add('hidden');
        }
        showPeople(data.results);
        pagescount = data.count;
        loadPagination(pagescount);
        console.log(peopleUrl);

    });


}

/**
 * 
 * @param {Array[]} data
 */


document.querySelector('.pagination_pages').addEventListener('click', event =>{
    const pageNumber = event.target.getAttribute('data-id');
    loadPeople(pageNumber);
})

async function showPeople(data) {
    const parent = document.querySelector('.container_content');

    for (const person of data) {
        const element = document.createElement('div');
        element.classList.add('item');
        
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('mainDiv');

        const extendedInfo = document.createElement('div');
        extendedInfo.classList.add('extendedInfo');
        extendedInfo.classList.add('hidden');

        mainDiv.innerHTML = await fillinnerHtml(person, "main");
        extendedInfo.innerHTML = await fillinnerHtml(person, 'extended');

        element.appendChild(mainDiv);
        element.appendChild(extendedInfo);

        const loadMoreButton = document.createElement('button');
        loadMoreButton.classList.add('loadMoreButton');
        loadMoreButton.textContent = 'Load more info';
        mainDiv.appendChild(loadMoreButton);
        parent.appendChild(element);
    }
}

document.querySelector('.container_content').addEventListener('click', (event) => {
    if (event.target.classList.contains('loadMoreButton')) {
        event.target.closest('.item').querySelector('.extendedInfo').classList.toggle('hidden');
        event.target.closest('.item').querySelector('.extendedInfo').classList.toggle('mainDiv');
        if(event.target.closest('.item').querySelector('.loadMoreButton').textContent==="Load more info"){
            event.target.closest('.item').querySelector('.loadMoreButton').textContent="Hide extended info"
        } else {
            event.target.closest('.item').querySelector('.loadMoreButton').textContent="Load more info";
        }
}});

function loadPagination(counter){
    let quantity = Math.ceil(counter/10);
    const paret = document.querySelector('.pagination_pages');
    if (paret.innerHTML===''){
    for (i=1;i<quantity+1;i++){
        let page = document.createElement('div');
        page.classList.add('pagination_page');
        page.setAttribute('data-id', i);
        page.textContent = `${i}`;
        paret.appendChild(page);
        console.log(`Pagination: ${page.textContent}, ${page.getAttribute('data-id')} `)

    }
}else{return}
}

const database = {planets: [
    {name: "Name: "}, {rotation_period: "Rotation period: "}, {orbital_period: "Orbital Period:"}, {diameter: "Diameter:"}, {climate: "Climate:"}, 
    {films: "Films:"},  {gravity: "Gravity:"}, {population: "Population:"}, {residents: "Residents"}, {surface_water: "Surface water:"}, {terrain: "Terrain"}, {url: "URL: "}
], people: [ {name: "Name:"}, {birth_year: "Birth year:"}, {gender: "Gender:"}, {eye_color: "Eye color:"}, {films: "Films:"},  {hair_color: "Hair color:"}, {height: "Height"},
    {mass: "Mass:"}, {skin_color: "Skin color:"}, {species: "Species:"}, {starships: "Starships:"}, {url: "URL:"}, {vehicles: "Vehicles:"}, {homeworld: "Homeworld:"}
], starships: [ {name: "Name:"}, {model: "Model:"}, {manufacturer: "Manufacturer"}, {MGLT: "MGLT"}, {cargo_capacity: "Cargo capacity:"}, {consumables: "Consumables:"},
{cost_in_credits: "Cost in credits:"}, {crew: "Crew:"}, {films: "Films:"}, {hyperdrive_rating: "Hyperdrive rating:"}, {length: "Length"}, {max_atmosphering_speed: "Max atmosphering speed:"},
{passengers: "Passengers:"}, {starship_class: "Starship class:"}, {url: "URL:"}], films: [{title: "Title"}]
}

async function fillinnerHtml(obj, innertype){

    let i = 0;
    let k = 3;
    let inner = ``;

        if (innertype!="main"){
            if (database[parentclass]) {
                i=3;
                k = database[parentclass].length;
            } else {
               i=0;
               k=3;
            }
        }   
            for (let index = i; index < k; index++) {
                const item = database[parentclass][index];
                const entries = Object.entries(item);
        
                if (Array.isArray(obj[entries[0][0]])) {
                    inner += `${entries[0][1]}<br>`;
        
                    for (let elemIndex = 0; elemIndex < obj[entries[0][0]].length; elemIndex++) {
                        const value = await getDataAPI(obj[entries[0][0]][elemIndex],entries[0][1]);
                        // console.log("Це те, що я шукаю: " + entries[0][1] );
                        inner += `${elemIndex + 1}) ${value}<br>`;
                    }
                } else {
                    inner += `
                        <div>${entries[0][1]} ${obj[entries[0][0]]}</div>
                    `;
                }
            }
            return inner;
        }
        
        async function getDataAPI(link, category) {
            let name = '';
            category == 'Films:' ? name = "title" : name = "name";
            const response = await fetch(link);
            const data = await response.json();
            return data[name]; 
        }
