//solution possible: essayer de n'envoyer que l'ID et la quantité dans le LS, puis utiliser l'ID pour faire un fetch.
 


let produitLocalStorage = JSON.parse(window.localStorage.getItem('produit'));
console.log(produitLocalStorage)

for (var i = 0; i < localStorage.length; i++) {
   console.log(localStorage.getItem(localStorage.key(i)));
}

/*async function main()
{
    let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
    console.log(produitLocalStorage);
    
    for (article of produitLocalStorage)
    {
        displayData (article);
    }
}*/

/*class Cart {
    //Constructor de la class qui nous permet de récupérer les produits dans le panier (localStorage)
    constructor() {
        this.productsInCart = produitLocalStorage;
        this.name;
        this.totalPrice = 0;
        this.initialize();
    };
}*/

if (!produitLocalStorage)
    {
        document.getElementById("empty_card").textContent = `Votre panier est vide`;
        console.log("vide");
    }
    else
        {
            //document.getElementById("display_quantity").textContent = produitLocalStorage;
            console.log("pas vide")

            //let structureProduitPanier = document.getElementById("bloc_card_product");
            console.log(produitLocalStorage.length);
            let structureProduitPanier = [];

            for(i = 0; i<produitLocalStorage.length; i++)
            {
                structureProduitPanier = structureProduitPanier + `${produitLocalStorage[i]}`+`<br> ` ;
                
                document.getElementById("card_section").innerHTML = structureProduitPanier;

                //console.log(localStorage.getItem(localStorage.key(i)));
            }
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

//displayData();


                        
/*function displayData ()
{
    const templateProduct = document.getElementById("template_card")
    const clone = document.importNode(templateProduct.content, true)

    //<h2 id="empty_card">Votre panier est vide</h2> 
    clone.getElementById("empty_card").textContent = "Votre panier est vide";

    clone.getElementById("display_quantity").innerHTML = produitLocalStorage;

    //clone.getElementById("product_bloc_photo_container").innerHTML = `<img id="product_bloc_photo" src="${articles.imageUrl}">`    

    /*clone.getElementById("product_bloc_text_description").textContent = articles.description
    clone.getElementById("product_bloc_text_price").textContent = articles.price + " euros"

    clone.getElementById("container_product_bloc_text_button").innerHTML = `
    <a id="product_bloc_text_button" type="button" href="produit.html?${articles._id}">Plus d'informations</a>`

    document.getElementById("card_section").appendChild(clone) ;   
}*/