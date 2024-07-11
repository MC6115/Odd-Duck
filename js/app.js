'use strict';
let maxAttempts = 25;

const img = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];

const state={
    totalProducts:[],
};
class Products {
    constructor(name, route) {
        this.name = name;
        this.route = route;
        this.vote = 0;
        this.views = 0;
        this.renderVotes();
    }
    renderVotes() {
        if (this.vote != 0) {
            const liItem = document.getElementById(this.name);
            if (liItem) {
                liItem.textContent = `${this.name} votes: ${this.vote}`;
            }
        } else {
            const liItem = document.getElementById(this.name);
            if (liItem) {
                liItem.textContent = `${this.name} votes: 0`;
            }
        }
    }
};
function objMaker(){
    for( let i=0;i<img.length;i++){
        let product= new Products(img[i],`./img/${img[i]}.jpg`);
        if(img[i]===`sweep`){
            let product2= new Products(img[i],`./img/${img[i]}.png`);
            state.totalProducts.push(product2)
        }else{
            state.totalProducts.push(product);
        }
    }
};
function numbGenerator(){
    const calls = []
    while (calls.length < 3) {
        const generator = Math.floor(Math.random() * img.length);
        if (!calls.includes(generator)) {
          calls.push(generator);
        }
      }
      return calls;
}

function objRender() {
    const call = numbGenerator();
    for (let i = 0; i < 3; i++) {
      const id = document.getElementById(`opcion${i + 1}`);
      const images = state.totalProducts[call[i]].route;
      const name = state.totalProducts[call[i]].name;
      if (id) {
        id.src = images;
        id.alt = name;
      }
      state.totalProducts[call[i]].views++;
    }
}
function handleClick() {
    for(let i = 0; i < 3; i++){
    const imgElement = document.getElementById(`opcion${i + 1}`);
    imgElement.addEventListener('click', function() {
        if(maxAttempts!=0){
        maxAttempts--;
        const imgName = imgElement.alt;
        const index = img.indexOf(imgName)
        state.totalProducts[index].vote++
        state.totalProducts[index].renderVotes();
        objRender();
        }
      });
    } 
}
objMaker();
objRender();
handleClick();