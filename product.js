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
    return fetch(`http://orinocofelixbarriere.herokuapp.com/api/cameras/${id}`)
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
    <a id="product_bloc_text_button" type="button" href="panier.html">Ajouter au panier</a>`

    document.getElementById("product_section").appendChild(clone);   

//Ajouter les éléments au LocalStorage

    let buttonElt = document.getElementById("container_product_bloc_text_button")
   
    function cart()
    {  
        let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
        let quantity = document.getElementById("card_quantity_input").value
        productArray = [articles.imageUrl,articles.name, articles.description, articles.price, articles.lenses, articles._id , quantity];

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
    }
buttonElt.addEventListener("click", cart);
};









