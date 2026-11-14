import { catalog, productTop } from './state.js';
const container = document.getElementsByClassName('catalog')[0];
catalog.map(items => {
    container.insertAdjacentHTML('beforeend', `
    <div>
    <div class="img"><img src="${items.img}" alt=""></div>
    <h4>${items.title}</h4>
        <section>
            <p>Ціна:${items.price} </p>
            <button class="bth">Купити</button>
        </section>
    </div>
    `)
 
})
const bth = Array.from(document.getElementsByClassName('bth'));
const basket = []
bth.forEach((item, i) => {
    item.addEventListener('click', () => objModal.render(i))
})
const objModal = {
    modal:document.getElementsByClassName('modal')[0],
    title_modal:document.getElementsByClassName('title_modal')[0],
    close:document.getElementsByClassName('close')[0],
    price_model:document.getElementsByClassName('price_modal')[0],
    img_modal:document.getElementsByClassName('img_modal')[0],
    yes:document.getElementsByClassName('yes')[0],
    no:document.getElementsByClassName('no')[0],
    closeModal:function() {
            this.modal.style.display = 'none';
    },
    openModal: function() {
        this.modal.style.display = 'flex';
    },
    render: function (index) {
        let data = catalog[index];
        this.title_modal.textContent = data.title;
        this.price_model.textContent = data.price;
        this.img_modal.src = data.img;
        this.openModal();
        this.no.addEventListener('click', () => this.closeModal())
        this.close.addEventListener('click', () => this.closeModal())
        this.yes.addEventListener('click', () => {
            let chek = false;
            basket.map((item,i)=>{
                if (item == index){
                    chek = true;
                }
            })
            if(!chek){
                basket.push(index);
                console.log(basket);
                asideRender();
            }
            this.closeModal()
        })
    }
}
const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest(".blok_aside").remove();
    });
});
const products_aside = document.getElementsByClassName('products_aside')[0]
const asideRender = ()=>{
    products_aside.innerHTML=''
    basket.forEach(i=>{
        products_aside.insertAdjacentHTML('beforeend',`
        <div class="blok_aside" nomer = ${i}>
        <div class="img"><img src="${catalog[i].img}" alt=""></div>
        <div>
            <button class="delete">Delete</button>
            <p class="price_aside">${catalog[i].price}</p>
        </div>
    </div>
        `)
    })
}
const aside = document.getElementsByTagName('aside')[0];
const close_aside = document.getElementsByClassName('close_aside')[0];
const open_aside = document.getElementsByClassName('open_aside')[0];
close_aside.addEventListener('click', () => aside.style.display = 'none')
open_aside.addEventListener('click', () => aside.style.display = 'flex')

const left = document.getElementsByClassName('left')[0],
    right = document.getElementsByClassName('right')[0],
    sliderContainer = document.getElementsByClassName('container')[0],
    scroll = document.getElementsByClassName('scroll')[0];
const funkSlider = (position, state) => {
    sliderContainer.innerHTML='';
    sliderContainer.insertAdjacentHTML('beforeend', `
        <div class="img"><img src="${state[position].img}" alt=""></div>
        <div class="blok">
            <h4>${state[position].title}</h4>
            <p>${state[position].text}</p>
        </div>
    `)
    scroll.innerHTML='';
    state.map((item,i)=>{
        scroll.insertAdjacentHTML('beforeend', `
        <input type="radio" name = '1' class='radioButton'>
    `)
    })
    const radioButton = Array.from(document.getElementsByClassName('radioButton'));
    console.log(radioButton);
    for(let i = 0; i<radioButton.length;i++){
        radioButton[i].addEventListener('click',()=>{
            pos = i;
            funkSlider(pos,productTop);
        })
    }
}
let pos = 0;
funkSlider(pos,productTop);

left.addEventListener('click',()=>{
    if(pos==0){
        pos = 2
    }else{
      pos-=1  
    }
    funkSlider(pos,productTop);
})
right.addEventListener('click',()=>{
    if(pos==2){
        pos = 0
    }else{
        pos+=1  
      }
    funkSlider(pos,productTop);
})