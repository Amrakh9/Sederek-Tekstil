const uri = 'http://cw85019.tmweb.ru/api';

let category_html = '<ul class="nav nav-tabs aa-products-tab">';

let html = '<ul class = "aa-product-catg" >';

let active = 'active in';

async function getCategories() { 
    let url = uri + '/categories';

    let result = [];

    console.log(url);

    await fetch(url).then(res => {
      return res.json();
    }).then(data => { 
      result = data;
    });

    return result;
}

getCategories().then(async data => {
  let categories = data.data;

  let key = 0;

  await categories.forEach(category => {
    if(key == 0){
      category_html += `<li class="active"><a href="#category${category.id}"  data-toggle="tab">${category.title}</a></li>`;
    }else{
      category_html += `<li><a href="#category${category.id}" data-toggle="tab">${category.title}</a></li>`;
    }

    key++;

    getProducts(category.id).then(async data => {
      let products = data.data;
  
      await products.forEach(product => {
          let p_html = `<li data-id="${product.id}">
          <figure>
            <a class="aa-product-img" href="#"><img src="img/women/girl-1.png" alt="polo shirt img"></a>
            <a class="aa-add-card-btn"href="#"><span class="fa fa-shopping-cart"></span>Add To Cart</a>
            <figcaption>
              <h4 class="aa-product-title"><a href="#">${product.title}</a></h4>
              <span class="aa-product-price">${product.price}</span>
            </figcaption>
          </figure>                         
          <div class="aa-product-hvr-content">
            <a href="#" data-toggle="tooltip" data-placement="top" title="Add to Wishlist"><span class="fa fa-heart-o"></span></a>
            <a href="#" data-toggle="tooltip" data-placement="top" title="Compare"><span class="fa fa-exchange"></span></a>
            <a href="#" data-toggle2="tooltip" data-placement="top" title="Quick View" data-toggle="modal" data-target="#quick-view-modal"><span class="fa fa-search"></span></a>                            
          </div>
        </li>`;
  
        html = html + p_html;
      });
  
      return new Promise((resolve)=>{
        resolve(html);
      });
  }).then( (res_html) => {

 
    res_html += '</ul>';
      document.querySelector('.tab-content').insertAdjacentHTML('afterbegin',`<div class="tab-pane fade ${active}" id="category${category.id}"></div>`) ;
      document.querySelector('#category' + category.id).innerHTML = html;
      active = '';
      console.log(res_html);
      html = '<ul class = "aa-product-catg" >';
    });
  });

  return new Promise((resolve)=>{
    resolve(category_html);
  })
}).then(html => {
  let end_html = html += '</ul>';
  
  document.querySelector('.aa-products-tab').innerHTML = end_html;
  // category_html  = '<ul class="nav nav-tabs aa-products-tab">'
});

// let product_htm
async function getProducts(category = false) {

    let url = new URL(uri + '/products');

    if (category) {
        url.searchParams.set('category_id', category);
    }

    let result = [];

    await fetch(url.toString()).then(res => {
        return res.json();
    }).then(data => {
        result = data;
    });

    return result;

}



