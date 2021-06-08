//récupération de l'ID dans l'url (avec window.location)

const url_id = window.location.search

//Nécessite la supression du "?" récupéré afin d'avoir l'ID (grace à "slice")

const id = url_id.slice(1);

main();

async function main()
{
    const articles = await getData();
    displayData (articles);
};

function getData ()
{
    return fetch(`https://orinocofelixbarriere.herokuapp.com/api/cameras/${id}`)
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
//Afficher le produit selectionné   

    structureProduit = `<div id="card_product_bloc">

    <div id="card_product_bloc_photo_container"><img id="card_product_bloc_photo" src="${articles.imageUrl}"></div>
    <div id="card_product_bloc_text">
        <h2 id="card_product_bloc_text_name">${articles.name}</h2>
        <p id="card_product_bloc_text_description">${articles.description}</p>
        <div id="card_product_bloc_text_lenses_container">
            <p>Objectif:</p>
            <div id="card_product_bloc_text_lenses"></div>
        </div>
        <div id="card_product_bloc_text_quantity">
            <p>Quantité:</p>
            <input type="number" value="1" id="card_quantity_input" min="1" max="10">
        </div>
        <div id="card_product_bloc_text_price_container">
            <p>Prix unitaire:</p>
            <div id="card_product_bloc_text_price">${articles.price} euros</div>
        </div>
        <div id="container_product_bloc_text_button">
            <a id="product_bloc_text_button" type="button" href="panier.html">Ajouter au panier</a>
        </div>
    </div>`

    document.getElementById("product_section").innerHTML = structureProduit;
    
    for(let i=0; i < articles.lenses.length; i++ )
    {
     document.getElementById("card_product_bloc_text_lenses").innerHTML +=
     
     `<input type="radio" id="checkbox" name="lens">
     <label id="checkbox_label">${articles.lenses[i]}</label>`
     console.log( articles.lenses[i])
    }

//Ajouter les éléments au LocalStorage

    let buttonElt = document.getElementById("container_product_bloc_text_button")
    

    function cart()
    {  
        let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
        
        let quantity = document.getElementById("card_quantity_input").value
        productArray = [articles.imageUrl,articles.name, articles.description, articles.price, articles.lenses, articles._id , quantity];

                
            if(produitLocalStorage && quantity !== 0)
                {
                    //Si un produit existe déjà dans le panier, on ajoute un nouveau produit au tableau
                    //Si ce produit existe déjà dans le Local Storage, on additionne les quantités

                    function canAddItem(items, id)
                    {
                    for (item in items)
                        {
                            if (articles._id == produitLocalStorage[item][5])
                                {
                                    return false;
                                }
                        }  
                    return true;
                    }

                    if (canAddItem(produitLocalStorage, articles.id))
                        {
                            produitLocalStorage.push(productArray);
                        }
                        else
                            {
                                for (item in produitLocalStorage)
                                    {
                                        if (articles._id == produitLocalStorage[item][5])
                                        {
                                            console.log("existe deja");
                                            produitLocalStorage[item][6] = parseInt(produitLocalStorage[item][6]) + parseInt(quantity);
                                        }
                                    }
                            }
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    alert("Votre produit a bien été ajouté au panier"); 
                }
            
        //s'il n'y a pas de produit dans localStorage
            else
                {
                    produitLocalStorage = [];
                    produitLocalStorage.push(productArray);
                    localStorage.setItem("produit", window.JSON.stringify(produitLocalStorage));

                    alert("Votre produit a bien été ajouté au panier");       
                }
            
    }
buttonElt.addEventListener("click", cart);
};









