let peopleUrl = '';
let  parentclass = '';
let pagescount = 0;


document.querySelector('nav').addEventListener('click', event => {
    parentclass = event.target.className;
    peopleUrl = `https://swapi.dev/api/${parentclass}`;
    console.log(peopleUrl, parentclass);
    document.querySelector('.container_content').innerHTML='';
    document.querySelector('.pagination_pages').innerHTML='';
    document.querySelector('.desc').innerHTML='';
    loadPeople();
    loadDescriprion(parentclass);
})

document.querySelector('.load-more').addEventListener('click', () => {
    loadPeople();
})

function loadDescriprion(classtitle){
    const parent = document.querySelector('.desc');
    const description_page = document.createElement('div');
    description_page.classList.add('descriprion');
    description_page.innerHTML=`${descriprions[classtitle]}`
    parent.appendChild(description_page);
}

function loadPeople(page = null){
    let aux = peopleUrl;
    if (page){
        peopleUrl ? aux = `${peopleUrl.slice(0,-1)}${page}` : aux = `https://swapi.dev/api/${parentclass}/?page=${page}`
        
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
    document.querySelector('.container_content').innerHTML='';
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
        // console.log(`Pagination: ${page.textContent}, ${page.getAttribute('data-id')} `);

    }
}else{return}
}

const descriprion = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti dolorem, dicta temporibus incidunt rem excepturi enim, blanditiis non, sed nihil debitis iste tenetur voluptates et minus quas! Sapiente, esse officia.
    Id accusantium ratione dolores, nihil iste omnis vitae sequi vel tempora obcaecati iure aliquam non error nulla odit iusto neque in similique quos atque. Odio tempore cum dolor iure nulla.
    Inventore, unde neque? Dolore et omnis dolorem vel natus illo voluptate. Cumque soluta amet numquam asperiores eaque rem dolorum, iure suscipit ducimus quos nihil fugiat pariatur iste provident perspiciatis vero.
    Porro est, explicabo laboriosam adipisci illum cupiditate nobis, placeat, alias maxime accusantium nihil vel magnam perspiciatis atque quaerat? Optio repellat consectetur ipsa minima blanditiis debitis ad quisquam tempora amet velit.
    Earum maxime odio odit recusandae nobis aperiam quod reiciendis veniam illum iusto voluptatem, nam, officia amet nemo id delectus harum quibusdam animi nesciunt vero placeat deleniti praesentium. Nesciunt, vero a.
    Temporibus omnis molestias aut laboriosam corporis, nam quos amet eos possimus in quidem iste voluptate officia id hic eligendi ipsam, tempora tenetur. Laudantium facere sed libero fugiat ducimus aspernatur eligendi.
    Aspernatur, fugiat! Aperiam, sapiente! Beatae voluptatum esse dolorem fugiat optio est sequi enim, quaerat illo eum tempore, quidem incidunt inventore saepe ex veniam quis fugit ea facere nisi. Laboriosam, aperiam?
    Similique laudantium perferendis, accusantium voluptatibus cumque obcaecati fuga quod nisi quisquam est harum in, quae maxime inventore impedit ullam rerum. Nulla atque veritatis, necessitatibus quod fugit nihil repudiandae optio iure!
    Dolorum, aliquid at distinctio ut cupiditate incidunt suscipit reprehenderit, ipsam, consequuntur eos eligendi iure laboriosam. Nostrum natus veniam error fuga doloremque odio, unde cum dolores aut explicabo, a at exercitationem?
    Deleniti perferendis consequatur porro cupiditate tempore non, minima architecto quaerat iusto molestias temporibus quidem quos! Assumenda, quasi cupiditate sed asperiores rerum facilis, nemo, earum illum eveniet quam quidem? Ipsa, ex?
    Rem illo perspiciatis sint quaerat architecto commodi fuga ducimus fugit et consequatur enim non, nostrum dignissimos optio facere aliquid natus? Est omnis ipsa distinctio cupiditate unde, quod iusto nisi sapiente.
    Delectus, odit quam! Aliquid porro non aut quod vero nisi, tenetur consequuntur minima doloremque qui eius dolorum accusantium dolore velit illum earum omnis fugit. Corrupti quibusdam maiores sequi cum mollitia?
    Harum ab sapiente sunt eius. Iusto eum architecto voluptates nulla, voluptas unde dignissimos et, id ducimus laborum voluptatem iste exercitationem. Quisquam aperiam cum eligendi at earum. Voluptatibus enim corrupti quisquam.
    Aspernatur sit perferendis, molestiae alias ex saepe magni incidunt sequi exercitationem doloremque tenetur, maxime a culpa consequuntur quam? Saepe nesciunt iste, at totam earum labore id repellendus quaerat consectetur. Provident.
    Voluptates cumque ullam assumenda ad, accusamus sint a at deserunt dolores omnis perferendis itaque tenetur. Hic iure minus neque quam qui, veniam pariatur voluptatem, fugit atque ut, maiores inventore sint!
    Cum culpa soluta, molestiae quia inventore eos quas illo facilis iste beatae ipsum cumque. Iste unde odio dicta provident eveniet voluptatibus optio, ipsa sapiente molestias repellat deleniti suscipit aliquam dolores.
m corrupti? Reiciendis ut fuga esse temporibus, officia doloremque cumque eum unde, amet maiores harum, omnis voluptas error vel nam inventore.`

const descriprions = {
    planets: `<h3>Welcome to the page of jerky planets of this stupied movies🤢.I hate it!</h3> <p>${descriprion}</p> <br> <img class='desc_img' src='./img/tatooine.jpg'>`,
    people: `<h3>Welcome to the page of jerky characters of this stupied movies🤢.I hate it!</h3> <p>${descriprion}</p> <br> <img class='desc_img' src='./img/luck.jpg'>`,
    starships: `<h3>Welcome to the page of jerky starships if this stupied movies🤢.I hate it!</h3> <p>${descriprion}</p> <br> <img class='desc_img' src='./img/deathstar.png'>`,
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
