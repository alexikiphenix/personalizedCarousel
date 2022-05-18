/******************************************************************************/
/************************** DEBUT CARROUSEL ***********************************/
let counter = 0;
let header = document.getElementById('mainHeader');
let slideDuration = 2000; // Durée du slide en millisecondes.
let listBackgrounds = []; // Tableau pour stocker les id des images dans le localStorage

const getLocalStorage = () =>// Récupère l'ensemble et enregistre les images choisies pour le header
{   
    for(let i = 0; i < localStorage.length; i++)
    {
        let key = localStorage.key(i);
        if(key.includes('myWebsiteBackgrounds-'))
        {            
            idBg = localStorage.getItem(key);            
            listBackgrounds.push(idBg);            
        }
    }    
}

const setBackgroundImg = (idImage) =>{   
    mainHeader.style.backgroundImage = `url('assets/img/img-${idImage}.jpg')`;         
}

// Permet de réaliser le slide à partir d'un tableau d'images donné en paramètres
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

getLocalStorage();
setInterval(slideImages, slideDuration, listBackgrounds); 



/************************** FIN CARROUSEL ***********************************/
/******************************************************************************/