main ();

/*on créée un fonction "main" qui se lancera au chargement de la page. 
"main" contient les fonctions: 
    - "getData" (qui va récupérer les données à l'adresse de l'API)
    - "displayData" qui affichera les données de l'API sur notre page html*/

async function main()
{
    const articles = await getData()
    console.log(articles);
    
    for (article of articles)
    {
        displayData (article);
    }
}

/*la fonction getData utilise fetch, à qui on donne en paramètre l'url de l'API. 
On lui attache (avec .then) une fonction à executer une fois les données récupérées.
Cette fonction prend en paramètre les données contenues dans l'API, que l'on transforme en JSON. 
On récupère ce JSON dans un .then suivant (et on le renomme "responseArticles"). 
On fait un console.log pour vérifier que le fetch fonctionne.
On fait un catch en cas d'erreur.
*/ 

function getData ()
{
    return fetch("http://localhost:3000/api/cameras")
        .then(function(response) 
        {   
            return response.json();  
        })
        
        .then(function(responseArticles) 
        {
            //console.log(responseArticles);
            return responseArticles;
        })
        .catch(function(error) 
        {
            alert(error);
        });
};

/* on doit retourner la valeur d'arrivée , il faut donc retourner au niveau du fetch;
fetch retournant une promesse, on indique que "main"est une fonction asynchrone (async) 
et que "getData" attend la résolution (await) 
*/

/*La fonction displayData affiche les données récupérées via l'API
On utilise "innerHTML" pour mettre en page les éléments où on le souhaite (V1)
V2: on clone le template html puis on l'ajoute, afin d'éviter les failles XSS (innerHTML)
Nous souhaitons afficher tous les articles, on utilise donc une boucle (for/of) 
sur "displayData" dans la fonction "main"*/ 

function displayData (articles)
{
    const templateProduct = document.getElementById("template")
    const clone = document.importNode(templateProduct.content, true)

    clone.getElementById("product_bloc_photo_container").innerHTML = `<img id="product_bloc_photo" src="${articles.imageUrl}">`
    clone.getElementById("product_bloc_text_name").textContent = articles.name
    clone.getElementById("product_bloc_text_description").textContent = articles.description
    clone.getElementById("product_bloc_text_price").textContent = articles.price + " euros"

    clone.getElementById("container_product_bloc_text_button").innerHTML = `
    <a id="product_bloc_text_button" type="button" href="produit.html?${articles._id}">Plus d'informations</a>`

    document.getElementById("section").appendChild(clone)    
}


/*V1:
function displayData (articles)
{
document.getElementById("section").innerHTML +=`
<div id="product_bloc" >    
    <div id="product_bloc_photo_container">
        <img id="product_bloc_photo" src="${articles.imageUrl}">
    </div>
    <div id="product_bloc_text">
        <div id="product_bloc_text_name">${articles.name}</div>
        <div id="product_bloc_text_description">${articles.description}</div>
        <div id="product_bloc_text_price">${articles.price} euros</div>
        <a id="product_bloc_text_button" type="button" href="produit.html?${articles._id}">Plus d'informations</a>
    </div> 
</div>`  
};*/



