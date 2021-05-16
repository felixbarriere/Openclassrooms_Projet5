//solution possible: essayer de n'envoyer que l'ID et la quantité dans le LS, puis utiliser l'ID pour faire un fetch.
//un tableau par valeur (1 tableau _id, 1 tableau quantité)

let produitLocalStorage = JSON.parse(window.localStorage.getItem('produit'));
//let quantitéLocalStorage = JSON.parse(window.localStorage.getItem('quantité'));

if (!produitLocalStorage)
    {
        document.getElementById("empty_card").textContent = `Votre panier est vide`;
        console.log("vide");
    }
    else
        {          
            console.log("pas vide")

            let structureProduitPanier = [];   
            let structureSommeTotale = [];

            //V1:
            let prix= 0;
            let prixArray = [];

            function displayData()
                {
                    for(i = 0; i<produitLocalStorage.length; i++)
                        {         
                            let tableauLS = produitLocalStorage[i];

                            let infosDuTableau = tableauLS[0]
                            let quantitéDuTableau = tableauLS[1]           
                            
                            prix = infosDuTableau.price*quantitéDuTableau;
                                              
                            structureProduitPanier = structureProduitPanier 
                            + 
                            `<div id="card_bloc_photo_container"><img id="card_bloc_photo" src="${infosDuTableau.imageUrl}"></div> 
                            <div id="card_bloc_text">
                                <h2 id="card_bloc_text_name">${infosDuTableau.name}</h2>                                                                                                                
                                <div id="card_bloc_text_quantity">
                                    <p>Quantité: </p>
                                    <div> ${quantitéDuTableau}</div>
                                </div>                             
                                <div id="card_bloc_text_price_container">
                                    <p>Prix:</p>
                                    <div id="card_bloc_bottom">
                                        <div id="card_bloc_text_price">${prix} euros</div>
                                        <button id="card_delete_item" delete_id="${infosDuTableau._id}">supprimer</div>
                                   </div>     
                                </div>
                            </div>`

                            document.getElementById("card_bloc").innerHTML = structureProduitPanier;

                            prixArray.push(prix);

                            //supprimer un produit  / modifier le bouton                        

                            let deleteItemButton = document.getElementById("card_delete_item");  
                            
                            console.log(deleteItemButton)

                            console.log(infosDuTableau._id)
 
                            function deleteItem()
                                {                  
                                    let productToDelete = deleteItemButton.getAttribute("delete_id");    
                                    console.log(productToDelete)         
                                    //localStorage.removeItem("produit", infosDuTableau);
                                }

                            deleteItemButton.addEventListener("click", deleteItem);   
                        }  

                    console.log(prixArray)                                    
                    let prixTotal = 0;
                        
                        for(i=0; i<prixArray.length; i++)
                            {
                                prixTotal += prixArray[i];
                            }

                    structureSommeTotale = ` 
                    <div id="card_product_bloc_text">
                        <h2 id="card_bloc_text_name">Prix total</h2>
                        <p id="card_bloc_text_description">${prixTotal} euros</p>
                        
                        <button id="card_delete" >Vider le panier</div>
                    </div>`

                    document.getElementById("card_bloc2").innerHTML = structureSommeTotale;     
                    
                    // Vider le panier

                    let deleteCardButton = document.getElementById("card_delete");           

                    function deleteCard()
                        {                                                   
                            localStorage.removeItem("produit");
                            window.location.reload();
                        }

                    deleteCardButton.addEventListener("click", deleteCard);   
               }               
            displayData()         
        }


        
  /*let prixTotalLocalStorage = JSON.parse(localStorage.getItem('prixTotal'));
                            
                            if(prixTotalLocalStorage)
                                {
                                    prix.push(prixTotal);
                                    localStorage.setItem("prixTotal", JSON.stringify(prixTotalLocalStorage));
                                }
                                else
                                    {
                                        prix = [];
                                        prix.push(prixTotal);
                                        localStorage.setItem("prixTotal", JSON.stringify(prixTotalLocalStorage));
                                    }*/


//probleme de sécurité: innerHTML sur la quantité.
 /*const templateProduct = document.getElementById("template_product");
                        const clone = document.importNode(templateProduct.content, true);

                        clone.getElementById("card_quantity_input").value = quantitéDuTableau;

                        document.getElementById("card_product_bloc").appendChild(clone);*/


        /*//V2
        for(i = 0; i<produitLocalStorage.length; i++)
        {
            let quantity = quantitéLocalStorage[i];
       
            main();
            
            async function main()
            {
                const articles = await getData();    
                displayData (articles);  
            };
                 
            //puis faire un fetch sur l'url en lui rajoutant l'id afin d'afficher les éléments du produit selectionné.
            function getData ()
                {
                    let id = produitLocalStorage[i];
                    
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

                function displayData(article)
                    {                            
        
                        let prixTotalProduit = article.price*quantity;
                        
                        console.log(prixTotalProduit);

                        //prix total du panier:
                        let prixTotalPanierArray = [];

                        prixTotalPanierArray.push(prixTotalProduit);                      
                        console.log(prixTotalPanierArray)
                        
                        let prixTotalPanier;
                        prixTotalPanier += prixTotalPanierArray[i];
                        console.log(prixTotalPanierArray[i])
                        console.log(prixTotalPanier)
                                    
                        for(i = 0; i<produitLocalStorage.length; i++)
                            {                                  
                                
                            }
                        
                        
                        structureProduitPanier = structureProduitPanier + 
                        `<img id="card_product_bloc_photo" src="${article.imageUrl}">`+`<br><br>`+ 
                        `nom: `+`${article.name}`+`<br><br>` + 
                        `quantité: `+`${quantity}`+`<br><br>` +
                        `${article.description}`+`<br><br>`+
                        `prix unitaire: `+`${article.price}`+`<br><br>`
                        +
                        `prix total: `+`${prixTotalProduit}`+`<br><br>`;

                        document.getElementById("card_section").innerHTML = structureProduitPanier ; 
                    }*/



                        
