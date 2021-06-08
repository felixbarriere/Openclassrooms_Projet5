main ();

/*on créée un fonction "main" qui se lancera au chargement de la page. 
"main" contient les fonctions: 
    - "getData" (qui va récupérer les données à l'adresse de l'API)
    - "displayData" qui affichera les données de l'API sur notre page html*/

async function main()
{
    const articles = await getData()

    for (article of articles)
    {
        displayData (article);
    }
}

function getData ()
{
    return fetch(`https://orinocofelixbarriere.herokuapp.com/api/cameras`)
        .then(function(response) 
        {   
            return response.json();  
        })
        .then(function(responseArticles) 
        {
            return responseArticles;
        })
        .catch(function(error) 
        {
            alert(error);
        });
};

function displayData (articles)
{
    document.getElementById("section").innerHTML += `
    <div id="product_bloc">                     
        <div id="product_bloc_photo_container"><img id="product_bloc_photo" src="${articles.imageUrl}"></div>
        <div id="product_bloc_text">
                <h2 id="product_bloc_text_name">${articles.name}</h2>
                <div id="product_bloc_text_description">${articles.description}</div>
                <div id="product_bloc_text_price">${articles.price} euros</div>
                <div id="container_product_bloc_text_button"><a id="product_bloc_text_button" type="button" href="produit.html?${articles._id}">Plus d'informations</a></div>         
        </div>
    </div>`
}



 