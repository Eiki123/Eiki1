async function fetchProducts() {
    try {
        const response = await fetch('https://dummyapi-0uzr.onrender.com/products');
        const data = await response.json();
        return data.product_list;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

function createProductHtml(id, name, short_desc, price, unitprice, tag, discount, image) {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `

<p class="display"><strong>name:</strong> ${name}</p>
<p class="display"><strong>short_desc:</strong> ${short_desc}</p>
<p class="display"><strong>price:</strong> ${price}</p>
<p class="display"><strong>unit Price:</strong> ${unitprice}</p>
<p class="display"><strong>tag:</strong> ${tag}</p>
<p class="display"><strong>discount:</strong> ${discount}</p>
<div id="heartbutton"></div>
<img src="file:///C:/Users/Windows%2011/Downloads/share_20dp_FILL0_wght400_GRAD0_opsz20.png" alt="share" style="width:10%" class="display">
<img src="data:image/jpeg;base64,${image}" alt="product image" class="display">

`;
    const container = document.getElementById('produc');
    if (container) {
        container.appendChild(productDiv);
    } else {
        console.error("Error: Container not found");
    }
    return productDiv;

}
let time = 0;
const max = 4;
async function displayProducts() {
    const prodlist = await fetchProducts();
    const list = document.getElementById('produc');
    prodlist.forEach(prodlist => {
        const prodHtml = createProductHtml(

            prodlist.name,
            prodlist.short_desc,
            prodlist.price,
            prodlist.unit_price,
            prodlist.tag,
            prodlist.discount,
            prodlist.image
        );
        list.appendChild(prodHtml);
    });
    localStorage.setItem('prodlist', JSON.stringify(prodlist));
    console.log(prodlist);
    const element = document.getElementById('moreproduct');
    element.addEventListener("click", function () {
        prodlist.forEach(prodlist => {
            const prod = prodlist[time];
            const prodHtml = createProductHtml(

                prodlist.name,
                prodlist.short_desc,
                prodlist.price,
                prodlist.unit_price,
                prodlist.tag,
                prodlist.discount,
                prodlist.image
            );
            list.appendChild(prodHtml);
        });
        time++;
        console.log(time);
        if (time >= max) {
            document.getElementById("moreproduct").remove();
        }
    });

}

window.onload = displayProducts;