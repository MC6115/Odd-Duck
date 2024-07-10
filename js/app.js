'use strict';

const img = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];

const state={
    totalProducts:[],
};
function Products(name,route){
    this.name=name;
    this.route=route;
    this.vote=0;
    this.views=0;
    this.repeats=25
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
    handleClick()
}
function handleClick() {
    for(let i = 0; i < 3; i++){
    const imgElement = document.getElementById(`opcion${i + 1}`);
    const imgName = imgElement.alt;
    imgElement.addEventListener('click', function() {
        // if(state.totalProducts.name===imgName){
        //     state.totalProducts.vote++
        // }
        objRender();
      });
    }
    
    
}

objMaker();
objRender();    
console.log(state.totalProducts)