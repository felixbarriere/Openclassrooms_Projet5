let produitLocalStorage = JSON.parse(window.localStorage.getItem('produit'));
console.log("hello")

if (!produitLocalStorage || produitLocalStorage == "")
    {
        document.getElementById("empty_card").textContent = `Panier vide`;
    }
    else
        {          
            let structureProduitPanier = [];   
            let prixArray = [];
            const products = [];

            console.log("hello")

//Affichage des produits selectionnés (via le Local Storage)                      
// si un objet est déjà dans la liste, il doit s'y ajouter et ne pas créer un objet supplémentaire
            for(i = 0; i<produitLocalStorage.length; i++)
                {         
                    let tableauLS = produitLocalStorage[i];
                    
                    let image = tableauLS[0]
                    let name = tableauLS[1]
                    let description = tableauLS[2]
                    let prix = tableauLS[3]
                    let lenses = tableauLS[4]
                    let id = tableauLS[5]
                    let quantity = tableauLS[6]

                    let prixProduit = prix*quantity;
                                                                    
                    structureProduitPanier = structureProduitPanier 
                    + 
                    `<div id="card_bloc_container">
                        <div id="card_bloc_photo_container">
                            <img id="card_bloc_photo" src="${image}"></img>
                        </div> 
                        <div id="card_bloc_text">
                            <h2 id="card_bloc_text_name">${name}</h2>                                                                                                                
                            <div id="card_bloc_text_quantity">
                                <p>Quantité: </p>
                                <div> ${quantity}</div>
                            </div>                             
                            <div id="card_bloc_text_price_container">
                                <p>Prix:</p>
                                <div id="card_bloc_bottom">
                                    <div id="card_bloc_text_price">${prixProduit} euros</div>
                                    <button class="card_delete_item" id="${id}">supprimer</button>
                                </div>     
                            </div>
                        </div>
                    </div>`

                    document.getElementById("card_bloc").innerHTML = structureProduitPanier;

                    prixArray.push(prixProduit); 
                    products.push(id);
                }
         
//suppression d'un produit                       

            document.addEventListener("click", event =>
            {
                if(!event.target.classList.contains("card_delete_item"))
                    {
                        return;
                    }
            //Compare l'id du bouton à celui du tableau de produits et supprime l'élément correspondant
                for(element in produitLocalStorage)
                    {
                        if(produitLocalStorage[element][5] == event.target.id)
                            {
                                produitLocalStorage.splice(element, 1)
                                localStorage.setItem("produit", window.JSON.stringify(produitLocalStorage));
                                window.location.reload();
                            }
                    }
            });
            let deleteButton = document.querySelectorAll(".card_delete_item");

// Affichage du prix total et envoi dans le LS

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
            localStorage.setItem("prix total", window.JSON.stringify(prixTotal));

// Vider le panier

            let deleteCardButton = document.getElementById("card_delete");           

            function deleteCard()
                {                                                   
                    localStorage.removeItem("produit");
                    window.location.reload();
                }
            deleteCardButton.addEventListener("click", deleteCard);     
            
//Affichage du formulaire de commande

            let structureForm = 
            `<h2 id="form_title">Informations de contact</h2>
            <div id="form_input">
                <div>
                    <label>Prénom</label>
                    <input type="text" id="firstName"  name="Votre prénom" required>
                </div>
                <div>
                    <label>Nom</label>
                    <input type="text" id="lastName" name="Votre nom" required>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" id="email" name="Votre email" required>
                </div>
                <div>
                    <label>Téléphone</label>
                    <input type="text" id="telephone" name="Votre numéro de téléphone" required>
                </div>
                <div>
                    <label>Ville</label>
                    <input type="text" id="city" name="Votre ville" required>
                </div>
                <div>
                    <label>Adresse</label>
                    <input type="text" id="adress" name="Votre adresse" required>
                </div>
                <div>
                    <label>Code Postal</label>
                    <input type="text" id="CodePostal" name="Votre code postal" required>
                </div>
                <div id="container_product_bloc_text_button"> 
                    <a  id="product_bloc_text_button" type="button" href="confirmation.html">Commander</a>
                </div>
            </div>`
            document.getElementById("card_form").innerHTML = structureForm;

//Envoi des données du formulaire de commande

            let buttonForm = document.getElementById("product_bloc_text_button");

            function sendForm (event)
                {
                    event.preventDefault();

                    class formulaireData{
                        constructor(input){
                            this.firstName = document.getElementById("firstName").value;
                            this.lastName = document.getElementById("lastName").value;
                            this.email = document.getElementById("email").value;
                            this.telephone = document.getElementById("telephone").value;
                            this.city = document.getElementById("city").value;
                            this.adress = document.getElementById("adress").value;
                            this.CodePostal = document.getElementById("CodePostal").value;
                        }
                    }
                    const formulaireDataToSend = new formulaireData();
                    
//REGEX
                    const firstName = formulaireDataToSend.firstName;
                    const lastName = formulaireDataToSend.lastName;
                    const email = formulaireDataToSend.email;
                    const telephone = formulaireDataToSend.telephone;
                    const city = formulaireDataToSend.city;
                    const adress = formulaireDataToSend.adress;
                    const CodePostal = formulaireDataToSend.CodePostal;

                    //Prenom, Nom, ville
                    function regexPrenomNomVille (value)
                    {
                        return /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]{3,20}$/.test(value);
                    }
                        function envoiPrenomNom ()
                        {   
                            if(regexPrenomNomVille(firstName) && regexPrenomNomVille(lastName) && regexPrenomNomVille(city))
                                return true;
                            else
                                {
                                    alert("Prénom, Nom, Ville: Chiffres en symboles non autorisés, maximum 20 caractères");
                                    return false;
                                }
                        }
                    //Mail
                    function regexMail (value)
                    {
                        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    }
                        function envoiMail ()
                        {   
                            if(regexMail(email))
                            {
                                return true;
                            }
                            else
                                {
                                    alert("Votre email est invalide");
                                    return false;
                                }
                        }  

                    //Téléphone
                    function regexPhone (value)
                    {
                        return /^0[1-9]([-. ]?[0-9]{2}){4}$/.test(value);
                    }
                        function envoiPhone ()
                        {   
                            if(regexPhone(telephone))
                            {
                                return true;
                            }
                            else
                                {
                                    alert("Votre telephone est invalide");
                                    return false;
                                }
                        }  

                    //Adresse
                    function regexAdresse (value)
                    {
                        return /^[^@&"()!_$*€£`+=\/;?#]+$/.test(value);
                    }
                        function envoiAdresse ()
                        {                            
                            if(regexAdresse(adress))
                            {
                                return true;
                            }
                            else
                                {
                                    alert("Votre adresse est invalide");
                                    return false;
                                }
                        }

                    //Code Postal
                    function regexCodePostal (value)
                    {
                        return /^[0-9]{5}$/.test(value);
                    }
                        function envoiCodePostal ()
                        {   
                            if(regexCodePostal(CodePostal))
                            {
                                return true;
                            }
                            else
                                {
                                    alert("Votre Code Postal est invalide");
                                    return false;
                                }
                        }  

                        if(envoiPrenomNom() && envoiMail() && envoiPhone() && envoiCodePostal() && envoiAdresse())
                            {
                                localStorage.setItem("formulaire", window.JSON.stringify(formulaireDataToSend)); 
      
// Envoi du formulaire

                        const contact = {
                                firstName : firstName, 
                                lastName : lastName,
                                address : adress, 
                                city : city, 
                                email : email,
                            };                
                        const aEnvoyer = {contact, products};
                        const options =
                            {
                                method:'POST',
                                body: JSON.stringify(aEnvoyer),
                                headers: {
                                    "Content-Type" : "application/json"
                                }
                            }
                        
                        fetch("https://orinocofelixbarriere.herokuapp.com/api/cameras/order", options)
                        .then(function(response) 
                        {   
                            console.log(response);
                            return response.json(); 
                        })
                        .then(function(response) 
                        {
                            return response.orderId;
                        })  
                        .then(function(response)
                        {
                            localStorage.setItem("confirmation", response);
                        })
                        .then(function(response)
                        {
                            window.location.assign('confirmation.html');
                        });

                            }     
                            else
                            {
                                console.log("envoi LS ko" ) 
                            }   
                        }
            buttonForm.addEventListener("click", sendForm);
                
//Affichage des données dans les input (Si LS existe)
            const dataLocalStorage = JSON.parse(window.localStorage.getItem("formulaire"));
            function displayDataLS(input)
                {
                    document.getElementById(`${input}`).value = dataLocalStorage[input];
                }
            displayDataLS("firstName");
            displayDataLS("lastName");
            displayDataLS("email");
            displayDataLS("telephone");
            displayDataLS("city");
            displayDataLS("adress"); 
            displayDataLS("CodePostal");          
        }


  