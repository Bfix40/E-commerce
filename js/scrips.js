//Initialization of library//

AOS.init();

let menu = document.getElementById('menu')

let menu_bar = document.getElementById('menu-bar')

menu_bar.addEventListener('click', function(){
    menu.classList.toggle('menu-toggle')
})

const products = [
    {
        id: 1,
        name: 'AQMH2',
        img: "/img/190198828613-1-sx-removebg-preview 1.png",
        price: 10.99
    },

    {
        id: 2,
        name: 'BSHP2',
        img: "/img/bluetooth.png",
        price: 20.99
    },

    {
        id: 3,
        name: 'PRPHP2',
        img: "/img/71tuneVA4hL 1.png",
        price: 30.99
    }
]

const dB = {
    items: products,
    methods: {
        find (id){
           return dB.items.find(function(items){return items.id === id})
        },
        render (){
            let html = ''
                html = '<ul>'
                html += dB.items.map(function (items){return `<li><img src="${ items.img}" alt="${items.name}">${items.name} - ${items.price}$<button class="btn-add" data-id="${items.id}">add to cart</button></li>`}).join('')
                html += '</ul>'
                return html
        }
    }    
}

const cart = {
    items: [],
    methods: {
        add (id) {
            if (cart.methods.isAlreadyInCart(id)) {
              alert('el producto ya se encuentra en el carrito')
            } else {
              const item = dB.methods.find(id)
              cart.items.push(item)
            }
        },  
        remove (id){
            cart.items = cart.items.filter(function (item) {return item.id !== id})
        },
        isAlreadyInCart (id) {
            return cart.items.find(function (item) {return item.id === id})
        },
        count () {
            return cart.items.length
        },
        totalPrice (){
            let total = 0;
            cart.items.map((item)=> {return total += item.price  } ).join('');
            return total
        },
       render (){
        document.getElementById('count').innerHTML = cart.methods.count();
        document.getElementById('total').innerHTML = cart.methods.totalPrice()
        let html = ''
            html = '<ul>'
            html += cart.items.map(function (items){return `<li><img src="${ items.img}" alt="${items.name}"> ${items.name} - ${items.price}$<button class="btn-remove" data-id="${items.id}">delete</button></li>`}).join('')
            html += '</ul>'
            return html
        },
        confirm (){
            // document.getElementById('confirm').innerHTML = cart.methods.remove
            while(cartContainer.firstChild) {
                cartContainer.removeChild(cartContainer.firstChild);
            } 
            buy.innerHTML = '0'
            buy2.innerHTML = '0'
            cart.items = []
        }
        
    }
    
}




const productsConteiner = document.getElementById('productsContainer')
const cartContainer = document.getElementById('cart')
const wrapper = document.getElementById('wrapper')
const confirmBuy = document.getElementById('confirm')

productsConteiner.innerHTML = dB.methods.render()
cartContainer.innerHTML = cart.methods.render()


wrapper.addEventListener('click', function (e) {
    
     if (e.target.matches('.btn-add')) {
        const id = e.target.dataset.id
        cart.methods.add(+id)
        cartContainer.innerHTML = cart.methods.render()
     }

     if (e.target.matches('.btn-remove')) {
        const id = e.target.dataset.id
        cart.methods.remove(+id)
        cartContainer.innerHTML = cart.methods.render()
     }
  
  })

confirmBuy.addEventListener('click', ()=> cart.methods.confirm ())

const buy = document.getElementById('total') 
const buy2 = document.getElementById('count')
