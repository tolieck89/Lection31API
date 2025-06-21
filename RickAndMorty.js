let peopleUrl = '';
let  parentclass = '';
let pagescount = 0;


document.querySelector('nav').addEventListener('click', event => {
    parentclass = event.target.className;
    peopleUrl = `https://rickandmortyapi.com//api/${parentclass}`;
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

async function loadPeople(page = null) {
  try {
    let url = `https://rickandmortyapi.com/api/${parentclass}`;
    if (page) {
      url += `/?page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    peopleUrl = data.info.next;

    const loadMoreBtn = document.querySelector('.load-more');
    if (data.info.next) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }

    await showPeople(data.results);

    pagescount = data.info.pages;

    loadPagination(pagescount);

    console.log('Наступна сторінка:', peopleUrl);

  } catch (error) {
    console.error('Помилка при завантаженні:', error);
  }
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

function loadPagination(pages) {
  const parent = document.querySelector('.pagination_pages');

  if (parent.innerHTML !== '') return;

  for (let i = 1; i <= pages; i++) {
    const page = document.createElement('div');
    page.classList.add('pagination_page');
    page.setAttribute('data-id', i);
    page.textContent = `${i}`;
    parent.appendChild(page);
  }
}


const descriprion = `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti dolorem, dicta temporibus incidunt rem excepturi enim, blanditiis non, sed nihil debitis iste tenetur voluptates et minus quas! Sapiente, esse officia.
    Id accusantium ratione dolores, nihil iste omnis vitae sequi vel tempora obcaecati iure aliquam non error nulla odit iusto neque in similique quos atque. Odio tempore cum dolor iure nulla.
    Inventore, unde neque? Dolore et omnis dolorem vel natus illo voluptate. Cumque soluta amet numquam asperiores eaque rem dolorum, iure suscipit ducimus quos nihil fugiat pariatur iste provident perspiciatis vero.
    Porro est, explicabo laboriosam adipisci illum cupiditate nobis, placeat, alias maxime accusantium nihil vel magnam perspiciatis atque quaerat? Optio repellat consectetur ipsa minima blanditiis debitis ad quisquam tempora amet velit.
    Earum maxime odio odit recusandae nobis aperiam quod reiciendis veniam illum iusto voluptatem, nam, officia amet nemo id delectus harum quibusdam animi nesciunt vero placeat deleniti praesentium. Nesciunt, vero a.
    Temporibus omnis molestias aut laboriosam corporis, nam quos amet eos possimus in quidem iste voluptate officia id hic eligendi ipsam, tempora tenetur. Laudantium facere sed libero fugiat ducimus aspernatur eligendi.
   stinctio ut cupiditate incidunt suscipit reprehenderit, ipsam, consequuntur eos eligendi iure laboriosam. Nostrum natus veniam error fuga doloremque odio, unde cum dolores aut explicabo, a at exercitationem?
  `

const descriprions = {
    location: `<h3>Welcome to the page of locations of this fabulous tv show.  I love them!</h3> <p>${descriprion}</p> <br> <img class='desc_img' src='./img/tatooine.jpg'>`,
    character: `<h3>Welcome to the page of  characters of this fabulous tv show😍 I love them!</h3> <p>${descriprion}</p> <br> <img class='desc_img' src='./img/luck.jpg'>`,
    episode: `<h3>Welcome to the page of episodes of this fabulous tv show😍 I love them!</h3> <p>${descriprion}</p> <br> <img class='desc_img' src='./img/deathstar.png'>`,
}

const database = 
    {character: 
        [ {name: "Name: "}, {status: "Status: "}, {species: "Species: "}, {gender: "Gender: "}, {url: "URL: "},
        ], 
    location: 
        [ {name: "Name:"}, {type: "Type:"}, {dimension: "Dimension:"}, {created: "Created at:"},
        ], 
    episode: 
        [ {name: "Name:"}, {air_date: "Episode air date:"}, {episode: "Episode"}, {created: "Created at:"}, 
        ]
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
            category == 'character:' ? name = "name" : name = "name";
            const response = await fetch(link);
            const data = await response.json();
            return data[name]; 
        }
