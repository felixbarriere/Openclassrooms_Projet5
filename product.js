//récupération de l'ID dans l'url (avec window.location)

const url_id = window.location.search

//Nécessite la supression du "?" récupéré afin d'avoir l'ID sel (grace à "slice")

const id = url_id.slice(1);

//affichage des données relatives à l'ID récupéré (fetch + valeur de l'ID à la fin de l'url)

main();

async function main()
{
    const articles = await getData();
    displayData (articles);
    
};

function getData ()
{
    return fetch(`http://localhost:3000/api/cameras/${id}`)
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

    const templateProduct = document.getElementById("template_product");
    const clone = document.importNode(templateProduct.content, true);

    clone.getElementById("card_product_bloc_photo_container").innerHTML += `<img id="card_product_bloc_photo" src="${articles.imageUrl}">`;
    clone.getElementById("card_product_bloc_text_name").textContent = articles.name;
    clone.getElementById("card_product_bloc_text_description").textContent = articles.description;
    clone.getElementById("card_product_bloc_text_price").textContent = articles.price + " euros";

    for(let i=0; i < articles.lenses.length; i++ )
        {
            clone.getElementById("card_product_bloc_text_lenses").innerHTML += 
            `<input type="radio" id="checkbox" name="lens">
            <label id="checkbox_label">${articles.lenses[i]}</label>`;
        }

    clone.getElementById("container_product_bloc_text_button").innerHTML = `
    <a id="product_bloc_text_button" type="button" >Ajouter au panier</a>`

    document.getElementById("product_section").appendChild(clone);   

//Ajouter les éléments au panier

    let buttonElt = document.getElementById("container_product_bloc_text_button")
   
    function cart()
    {  
        let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
        //let quantitéLocalStorage = JSON.parse(localStorage.getItem('quantité'));
        //JSON.parse convertit les données JSON du localStorage en objet JS (!=JSON.stringify)
        
        let quantity = document.getElementById("card_quantity_input").value

        productArray = [articles, quantity];
        //quantityArray = [quantity];

    //si produit présents dans localStorage:
    if (quantity == 0)
        {
            alert("Merci de renseigner une quantité")
        }
        else
            {     
            if(produitLocalStorage && quantity !== 0)
                {

                    produitLocalStorage.push(productArray);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    //quantitéLocalStorage.push(quantityArray);
                    //localStorage.setItem("quantité", JSON.stringify(quantitéLocalStorage));

                    alert("Votre produit a bien été ajouté au panier"); 
                    //possibilité d'empecher l'utilisateur d'ajouter le meme produit; dans ce cas, ajouter une alerte.      
                }
            
        //s'il n'y a pas de produit dans localStorage
            else
                {
                    console.log("hola");

                    produitLocalStorage = [];
                    produitLocalStorage.push(productArray);
                    localStorage.setItem("produit", window.JSON.stringify(produitLocalStorage));

                    //quantitéLocalStorage = [];
                    //quantitéLocalStorage.push(quantityArray);
                    //localStorage.setItem("quantité", window.JSON.stringify(quantitéLocalStorage));

                    alert("Votre produit a bien été ajouté au panier");       

                }
            }
        }
            

buttonElt.addEventListener("click", cart);
};
    
/*Récupération et stockage des valeurs quantité et prix envoyées par l'utilisateur sur la page Produit*/










