'use strict';
let maxAttempts = 25;
let chart = null;

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
function imgGenerator(){
    const calls = []
    let leftImg=state.totalProducts[Math.floor(Math.random()*img.length)];
    let midImg=state.totalProducts[Math.floor(Math.random()*img.length)];
    let rightImg=state.totalProducts[Math.floor(Math.random()*img.length)];
    if(leftImg != midImg && midImg != rightImg && leftImg != rightImg){
        calls.push(leftImg);
        calls.push(midImg);
        calls.push(rightImg);
    }else{
        return imgGenerator();
    }
    return calls;
}
function objRender() {
    let call = imgGenerator();
    for (let i = 0; i < 3; i++) {
        // if(call[i].views=2){
        //     let call = imgGenerator();
        //     const id = document.getElementById(`opcion${i + 1}`);
        //     const images = call[i].route;
        //     const name = call[i].name;
        //     if (id) {
        //       id.src = images;
        //       id.alt = name;
        //     }
        //     call[i].views++;
        // }
      const id = document.getElementById(`opcion${i + 1}`);
      const images = call[i].route;
      const name = call[i].name;
      if (id) {
        id.src = images;
        id.alt = name;
      }
      call[i].views++;
    }
}
function clean(){
    chart.destroy();
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
        clean();
        renderChart();
        }
      });
    } 
}

function renderChart(){
    const ctx = document.getElementById('canvas').getContext('2d');
    const selectedProducts = [];
    const productNames = [];
    const productViews = [];
    for(let i =0;i<state.totalProducts.length;i++){
        const product = state.totalProducts[i];
        selectedProducts.push(product.vote);
        productNames.push(product.name);
        productViews.push(product.views);
    }
    chart = new Chart(ctx,{
        type:'bar',
        data:{
            labels:productNames,
            datasets:[
                {
                    label: '# de votos',
                    data:selectedProducts,
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor:['rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                    borderWidth:1
                },
                {
                    label:'# de visualizaciones',
                    data:productViews,
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',],
                    borderColor:['rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',],
                    borderWidth:1
                },
            ],
        },
        options: {
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                ticks: {
                  stepSize: 1,
                },
                gridLines: {
                  display: false,
                },
              }]
            }
        }
    });
}
objMaker();
objRender();
renderChart();
handleClick();

// const ctx = document.getElementById('myChart').getContext('2d');
// new Chart(ctx, {
//   type: 'horizontalBar', // Tipo de gráfico: horizontalBar
//   data: {
//     labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
//     datasets: [{
//       label: 'Mi conjunto de datos',
//       data: [10, 20, 30, 40, 50],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       x: {
//         beginAtZero: true
//       }
//     }
//   }
// });