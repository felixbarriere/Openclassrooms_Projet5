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
    return fetch(`http://orinocofelixbarriere.herokuapp.com/api/cameras`)
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



