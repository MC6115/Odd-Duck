'use strict';
let maxAttempts;

if (localStorage.getItem('maxAttempts')) {
    maxAttempts = parseInt(localStorage.getItem('maxAttempts'));
} else {
    maxAttempts = 25
}

let chart = null;

const img = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

const state = {
    totalProducts: JSON.parse(localStorage.getItem('totalProducts')) || [],
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
        const liItem = document.getElementById(this.name);
        if (liItem) {
            liItem.textContent = `${this.name} votes: ${this.vote}`;
        }
    }
}
function objectExistenceChecker(){
    if (JSON.parse(localStorage.getItem('totalProducts'))) {
        getLocalStorage();
    }
    // Only works when cicle is finished (needs more work)
    if(maxAttempts===0){
        for(let i=0;i<state.totalProducts.length;i++){
            state.totalProducts[i].renderVotes();
        }
    }
    if(JSON.parse(localStorage.getItem('totalProducts'))&&maxAttempts===0){
        return true
    }else{
        return false
    }
    
}
function objMaker() {
    if (state.totalProducts.length === 0) {
        for (let i = 0; i < img.length; i++) {
            let product = new Products(img[i], `./img/${img[i]}.jpg`);
            if (img[i] === 'sweep') {
                let product2 = new Products(img[i], `./img/${img[i]}.png`);
                state.totalProducts.push(product2);
            } else {
                state.totalProducts.push(product);
            }
        }
    }
}

function imgGenerator() {
    const calls = [];
    let leftImg = state.totalProducts[Math.floor(Math.random() * state.totalProducts.length)];
    let midImg = state.totalProducts[Math.floor(Math.random() * state.totalProducts.length)];
    let rightImg = state.totalProducts[Math.floor(Math.random() * state.totalProducts.length)];
    if (leftImg !== midImg && midImg !== rightImg && leftImg !== rightImg) {
        calls.push(leftImg);
        calls.push(midImg);
        calls.push(rightImg);
    } else {
        return imgGenerator();
    }
    return calls;
}

function objRender() {
    let call = imgGenerator();
    for (let i = 0; i < 3; i++) {
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
function clean() {
    if (chart) {
        chart.destroy();
    }
}
function handleClick() {
    for (let i = 0; i < 3; i++) {
        const imgElement = document.getElementById(`opcion${i + 1}`);
        imgElement.addEventListener('click', function () {
            if (maxAttempts !== 0) {
                maxAttempts--;
                localStorage.setItem('maxAttempts', maxAttempts);
                const imgName = imgElement.alt;
                const product = state.totalProducts.find(product => product.name === imgName);
                if (product) {
                    product.vote++;
                    product.renderVotes();
                    objRender();
                    clean();
                    renderChart();
                }
                localStorage.setItem('totalProducts', JSON.stringify(state.totalProducts));
            }
        });
    }

}
function getLocalStorage() {
    state.totalProducts = []
    const jsonProductsRecuperados = localStorage.getItem('totalProducts');
    const productsRecuperados = JSON.parse(jsonProductsRecuperados);
    for (let i = 0; i < productsRecuperados.length; i++) {
        let constructorProducts = new Products(productsRecuperados[i].name, productsRecuperados[i].route)

        constructorProducts.vote = productsRecuperados[i].vote;
        constructorProducts.views = productsRecuperados[i].views;
        state.totalProducts.push(constructorProducts);
    }

}
function renderChart() {
    const ctx = document.getElementById('canvas').getContext('2d');
    const selectedProducts = [];
    const productNames = [];
    const productViews = [];

    for (let i = 0; i < state.totalProducts.length; i++) {
        const product = state.totalProducts[i];
        selectedProducts.push(product.vote);
        productNames.push(product.name);
        productViews.push(product.views);
    }

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [
                {
                    label: '# de votos',
                    data: selectedProducts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: '# de visualizaciones',
                    data: productViews,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        },
        // options: {
        //     legend: {
        //         display: false,
        //     },
        //     scales: {
        //         xAxes: [{
        //             ticks: {
        //                 stepSize: 1
        //             },
        //             gridLines: {
        //                 display: false,
        //             },
        //         }]
        //     }
        // }
    });
}
objectExistenceChecker();
if(objectExistenceChecker()===true){
    renderChart();
}else{
    objMaker();
    objRender();
    handleClick();
    renderChart();
}
