/****************************************************************************************
****************** POUR REDIMENSIONNER IMAGES EN LIGNE : ********************************
https://www.iloveimg.com/fr/redimensionner-image#resize-options,pixels
https://www.img2go.com/fr/redimensionner-image

*****************************************************************************************/

let container = document.getElementById('backgroundsList'); // "récupération" du container au sein de la variable js 
let btnValidateListImg = document.getElementById('btnValidateListImg'); // pour pouvoir appliquer les méthodes et fonctions JS.
let counter = 0;
let header = document.getElementById('mainHeader'); // "récupération" du mainHeader au sein de la variable js 
let numberOfBackgrounds = 25;
let listBackgrounds = [];
let slideDuration = 2000; // Durée du slide en millisecondes.
let selectionSound = new Audio("assets/audio/clic8.mp3");


// Cette fonction permet d'insérer les images dans la page HTML
const insertImgInHTML = () => {   
    for(let i = 0; i < numberOfBackgrounds; i++)
    {       
        //Méthode 1 pour ajouter les images :    
        let cell = document.createElement("div");        
        cell.classList.add("cell");   
        cell.innerHTML = `<img src="assets/img/img-${i}-small.jpg" data-id=${i} alt="image ${i}" />`;        
        container.appendChild(cell);
        let img = document.querySelector(`[data-id="${i}"]`);  
        
        // Méthode 2 :
        // let cell = document.createElement("div");        
        // cell.classList.add("cell"); 
        // let img = document.createElement('img');
        // img.setAttribute('src', `assets/img/img-${i}-small.jpg`);
        // img.setAttribute('alt', `image ${i}`);
        // img.setAttribute('data-id', i)
        // cell.appendChild(img);  

        img.addEventListener('click', (e) => {
            e.target.classList.toggle("selected"); // ajout d'un toggler permettant d'ajouter        
            selectionSound.play(); // pour jouer le son
        })         
    }
}// insertImgInHTML

insertImgInHTML();

// fonction permettant de supprimer les backgrounds dans le localStorage
const deleteBgList = () => {                   
    console.log(`Affichage liste suppression`); 
    let i = 0;
    while(i < localStorage.length) // parcours du localStorage
    {        
        let key = localStorage.key(i);  
        if(key.includes('myWebsiteBackgrounds-'))
        {      
            localStorage.removeItem(key);  
            i = 0;                      
        }
        else    
            i++; 
    }
}
  
// cette fonction permet d'insérer dans le localstorage les images sélectionnées
const putSelectedImg = () =>{    
    deleteBgList();     // suprression des images précédemment mises en localStorage  
    let listImg = []; 
    listImg = document.querySelectorAll("img.selected");  // Récupération sous forme de tableau liste images sélectionnées
     
    for(let i = 0; i < listImg.length; i++)
    {         
        let idImg = listImg[i].getAttribute('data-id');
        localStorage.setItem(`myWebsiteBackgrounds-${idImg}`, idImg);
    } 
    window.location.reload(); // pour recharger la page
}
 
const setBackgroundImg = (idImage) =>{   
    mainHeader.style.backgroundImage = `url('assets/img/img-${idImage}.jpg')`;         
}

// Permet de réaliser le slide à partir d'un tableau d'images
const slideImages = (imagesArray) =>
{  
     if(imagesArray.length != 0)
    {
        idImage = imagesArray[counter]; 
        setBackgroundImg(idImage);
        counter++;                 
        if(counter >= imagesArray.length)
            counter = 0; // retour au début du tableau                          
    }
    else if(mainHeader.style.backgroundImage != `url("assets/img/img-0.jpg")`)
    {        
        mainHeader.style.backgroundImage = `url('assets/img/img-0.jpg')`; // en cas d'absence d'images, un background par défaut
    }
}

// Récupère l'ensemble du LocalStorage et on enregistre les images choisies pour le header
const getImgFromStorage = () =>{    
    let listImg = [];
    for(let i = 0; i < localStorage.length; i++)
    {
        let key = localStorage.key(i);
        if(key.includes('myWebsiteBackgrounds-'))  // Nous choisissons uniquement les images que nous avions choisi
        {            
            idBg = localStorage.getItem(key);            
            listImg.push(idBg);            
        }
    }   
    return listImg; 
}

btnValidateListImg.addEventListener('click', (e) =>{
    e.target.classList.add('activated');          
    putSelectedImg();           
})  

listBackgrounds = getImgFromStorage();
setInterval(slideImages, slideDuration, listBackgrounds); 


/* CODE A METTRE UNIQUEMENT DANS TOUTES LES PAGES AVEC UN HEADER : 
    <script src="assets/js/app.js"></script>
*/

/* CODE A METTRE UNIQUEMENT DANS LA PAGE personnalisation.html :
    <script src="assets/js/carouselSettings.js"> </script>
*/


    