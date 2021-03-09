
//Nuestra api de la pagina giphy.Develops
let api_key = "api_key=FlZXiPWXIUF4uUsPsrsm2PE1dSg3Lh41";
//Nodos template para clonar
let container_template = document.getElementById("container_template");
let body = document.getElementsByTagName("body")[0];


//Section Trending
let url_carousel = "https://api.giphy.com/v1/gifs/trending?" + api_key;
let carousel = document.getElementsByClassName("carousel");
let gif_total = 10;
//en este array se almacena lista generada del request, maximo 10, ya que lo definimos en gif_total
let gifs_saved = [];
// traemos los sliders, izquierda y derecha
let left = document.getElementById("left");
let right = document.getElementById("right");
//distancia que recorrera con cada evento de slider  
let route = (357 + 30);//ancho + margin
let route_2 = 0;//guardamos la diferencia para no tener problemas al cambiar de monitor
let positions = [];//posicion determinada por el número de gifos
let image_to_show = gif_total - 3;//se restaran 3 para que se pueda visualizar de a 3 gifos
let container_carousel_maximum = 1161;//se da un ancho maximo al contenedor de los gifos para no tener errores de visualización


//creacion de gifos mediante la clase
class gifos_class {
    constructor(giphy_url, giphy_img, giphy_icon_favorite, giphy_download, giphy_enlarge) {
        this.giphy_url = giphy_url;//url del gifo
        this.giphy_img = giphy_img;//imagen del gifo
        this.giphy_icon_favorite = giphy_icon_favorite;//id de favorito
        this.giphy_download = giphy_download;//id de descargas
        this.giphy_enlarge = giphy_enlarge;//id de la pantalla ampliada(icono de las dos felchas)
    }
}
//request mediante promesa
let fetch_bring_gifo = () => {
    fetch(url_carousel)
        .then(responese => responese.json())
        .then(giphy_response => {
            for (let i = 0; i < gif_total; i++) {
                let giphy = new gifos_class(giphy_response.data[i], "gifos-tren-" + (i + 1), "favicon-gt-" + (i + 1), "download-gt-" + (i + 1), "view-screen-gt-" + (i + 1));
                gifs_saved.push(giphy);
                bring_gifo(i);
            }
        }).catch(message_error => console.log(message_error));
}
//funcion para el NODO con gifo e Id
let bring_gifo = (i) => {
    //se clona el nodo
    let container_template_clone = container_template.cloneNode(true);
    container_template_clone.style.display = "inline-block";
    container_template_clone.classList.toggle("class-gifo-list");
    carousel[0].appendChild(container_template_clone);
    //se ponen los datos requeridos para poder visualizar los gifos del array
    let gif_clone = document.getElementsByClassName("gif_clone");
    gif_clone[i].src = gifs_saved[i].giphy_url.images.original.url;
    let titles = document.getElementsByClassName("titles");
    titles[i].innerHTML = gifs_saved[i].giphy_url.title;
    let users = document.getElementsByClassName("users");
    users[i].innerHTML = gifs_saved[i].giphy_url.username == "" ? "Anonimo User" : gifs_saved[i].giphy_url.username;
}
//movimiento del carousel
for (let i = 0; i < gif_total; i++) {
    positions.push(0);
}
let move_function = (route) => {
    let container_template = document.getElementsByClassName("container_template class-gifo-list");
    for (let i = 0; i < container_template.length; i++) {
        positions[i] += route;
        container_template[i].style.transform = "translateX(" + (positions[i]) + "px)";
    }
}
//boton derecho evento
right.addEventListener("click", () => {
    if (Math.abs(positions[0]) < (route * image_to_show)) {//desplazamiento maximo del carousel
        move_function(-route);
        //sino se visualiza los 3 gifos, se hace un desplazamiento extra (ejemplo, el final e inicio del carousel)
    } else if (carousel[0].clientWidth < container_carousel_maximum && route_2 == 0) {
        route_2 = container_carousel_maximum - carousel[0].clientWidth;
        move_function(-(route_2));
    }
});
//boton izquierda evento
left.addEventListener("click", () => {
    // controlar los desplazamientos extras
    if (positions[0] < 0 && positions[0] + route <= 0) {
        move_function(route);
    } else if (route_2 != 0) {
        move_function(route_2);
        route_2 = 0;
    }
});

//inicia cuando se carga la pagina general
window.onload = function () {
    body.removeChild(container_template);//se elimina el template usado para clonar
    fetch_bring_gifo();
}  
