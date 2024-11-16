let test = localStorage.getItem("cart");
//deux lignes a supprimer

let leArray = JSON.parse(test);
console.log(leArray, "hhh");

let laCarte = document.querySelector(".cartProducts");

leArray.forEach(el => {
  let newElemCart = document.createElement("div");
  newElemCart.className = "flex gap-4 p-4 border rounded-xl mt-5 mr-2 items-center relative";
  newElemCart.innerHTML = `
    <i class="leButtFermerArray ri-close-line absolute right-3 text-red-600 top-2" onclick="deleteCartProduct(${el.id})"></i>
    <div class="hidden id">${el.id}</div>

         <img src="${el.img1}" height="60px" width="60px">
            <div>
              <h2 class="font-semibold">${el.title}</h2>
              <p>${el.prix} X ${el.quantity}</p>
            </div>
  `;
  laCarte.appendChild(newElemCart);



  
  const leCheckout = document.getElementById("checkoutProduct");
  let newElemCheckout = document.createElement("div");
  newElemCheckout.className = "productsAndPrices flex justify-between items-center p-2.5 border-t-[black] border-t border-solid";
  newElemCheckout.innerHTML = `
                        <div class="productAddMinusDel">
                            <p class="delProductCheckout inline-block mr-2.5" style="cursor: pointer" onclick="deleteCartProduct(${el.id})">X</p>
                            <p class="hidden">${el.id}</p>
                            <p class="hidden pricE">${el.prix}</p>
                            <img class="imageOfCheckout w-10 inline-block mr-2.5" src="${el.img1}" alt="">
                            <div class="ajouterDeminuerProduct inline-block mr-2.5 inline-flex w-[70px] justify-between px-2.5 rounded-[30px] border-[solid] border-[1px]">
                                <div class="moin" style="cursor: pointer">-</div>
                                <div class="w-5 numPiece text-center border-x-[black] border-l border-solid border-r">${el.quantity}</div>
                                <div class="plus" style="cursor: pointer">+</div>
                            </div>
                        </div>
                        <div class="lePrixProduct"><span class="spanProductPrix">${el.prix * el.quantity}</span> $</div>
  `;
  leCheckout.appendChild(newElemCheckout)
  
  
    
});

//creation du button remove element
let fermerButts = document.querySelectorAll(".leButtFermerArray");
fermerButts.forEach( el => {
  el.addEventListener("click", () => {
    //supprimer le produit de l array 
    let leId = el.parentNode.querySelector(".hidden.id").textContent;
    console.log(leId, "dffd");
    el.parentNode.remove();
    for(let i = 0; i < leArray.length; i++){
      if(leArray[i].id == leId){
        leArray.splice(i, 1);
      }
    }
    let checkoutBasId = document.querySelectorAll(".productAddMinusDel .hidden");
    for(let i = 0; i < checkoutBasId.length; i++){
      if(checkoutBasId[i].innerHTML == leId){
        checkoutBasId[i].parentNode.parentNode.remove();
      }
    }
    
    

    
    
  })
});


//creation du bouton supprimer pour la liste du checkouT
let fermerButtCheckout = document.querySelectorAll(".delProductCheckout");
fermerButtCheckout.forEach(el => {
  el.addEventListener("click", () =>{
    leIdCheckout = el.parentNode.querySelector(".hidden").textContent;
    el.parentNode.parentElement.remove();
    for(let i = 0; i < leArray.length; i++){
      if(leArray[i].id == leIdCheckout){
        leArray.splice(i, 1);
        calculeTotalEtAffichage();
      }
    }
  })
})

//creation du boutton Moin dans le checkout
const minusButton = document.querySelectorAll(".moin");
minusButton.forEach(el => {
  el.addEventListener("click", () => {
    let laValeur = el.nextElementSibling;
    let lePrixUnite = el.parentNode.parentNode;
    let lePrixTotalUnite = el.parentNode.parentNode.parentNode;
    lePrixTotalUnite = lePrixTotalUnite.querySelector(".spanProductPrix")
    lePrixUnite = lePrixUnite.querySelector(".hidden.pricE");
    
    if(parseInt(laValeur.textContent) > 0){
      laValeur.textContent = parseInt(laValeur.textContent) - 1; 
      lePrixTotalUnite.textContent =  parseFloat(lePrixUnite.textContent) * parseFloat(laValeur.textContent);
      calculeTotalEtAffichage()
    }
  })
})

//creation du boutton Plus dans le checkout
const plusButton = document.querySelectorAll(".plus");
plusButton.forEach(el =>{
  el.addEventListener("click", () =>{
    let laValeur = el.previousElementSibling;
    let lePrixUnite = el.parentNode.parentNode;
    let lePrixTotalUnite = el.parentNode.parentNode.parentNode;
    lePrixTotalUnite = lePrixTotalUnite.querySelector(".spanProductPrix")
    lePrixUnite = lePrixUnite.querySelector(".hidden.pricE");

    if(parseInt(laValeur.textContent) > 0){
      laValeur.textContent = parseInt(laValeur.textContent) + 1; 
      lePrixTotalUnite.textContent =  parseFloat(lePrixUnite.textContent) * parseFloat(laValeur.textContent);
      calculeTotalEtAffichage()
    }
  })
})

//pour calculer le total de checkout
const calculeTotalEtAffichage = () =>{
  const lesProduits = document.querySelectorAll(".productsAndPrices");
  let leTotal = 0;
  lesProduits.forEach(el => {
  console.log(el.querySelector(".spanProductPrix").innerHTML)
  leTotal += parseFloat(el.querySelector(".spanProductPrix").innerHTML);
  })
document.querySelector(".leTotal").textContent = leTotal;
console.log(leTotal)
}
calculeTotalEtAffichage();

//delete button carte checkout

