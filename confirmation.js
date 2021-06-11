// Page confirmation de commande

const prixLS = localStorage.getItem("prix total");
const idLS = localStorage.getItem("confirmation");
console.log(prixLS);
console.log(idLS);

let récapitulatif = ` 
                <div id="product_bloc">
                    <div id="card_product_bloc_text">    
                Récapitulatif de commande: ${prixLS} euros. <br><br>
                Si vous désirez suivre l'avancée de votre livraison, veuillez utiliser le numéro de commande: <br><br>${idLS}
                    </div>
                </div>
            `

            document.getElementById("confirmation_section").innerHTML = récapitulatif; 

// en quittant la page confirmation: supprimer toutes les données du LS

            const mainLogo = document.getElementById("main_logo");
            console.log(mainLogo)

            function deleteItemsLS()
                {
                    window.localStorage.clear();
                }
            
            deleteItemsLS();
            localStorage.setItem("confirmation", idLS);