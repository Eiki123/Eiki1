# Nhận xét bài làm

## Tổng quan
### Tổ chức folder
Cách tổ chức folder của em chưa được gọn gàng, khó quản lý và deploy. Có nhiều cách tổ chức folder. And gợi ý 1 cách tổ chức folder gọn hơn, phù hợp với bài này:
```css
.
└── btck/
    ├── home.html
    ├── shop.html
    ├── contact.html
    ├── cart.html
    ├── blog.html
    ├── css/
    │   ├── style.css /*CSS dùng chung giữa các trang*/
    │   ├── home.css
    │   ├── shop.css
    │   ├── contact.css
    │   ├── cart.css
    │   └── blog.css
    ├── js/
    │   ├── index.js /*JS dùng chung */
    │   ├── home.js
    │   ├── shop.js
    │   ├── contact.js
    │   ├── cart.js
    │   └── blog.js
    ├── asset/
    │   ├── universal/ /*các file (hình ảnh, logo,...) dùng chung */
    │   ├── home/
    │   │   └── image1.png /*file ví dụ*/
    │   ├── shop/
    │   ├── contact/
    │   ├── cart/
    │   └── blog/
    └── component/ /*những thành phần dùng chung*/
        ├── header.html /*header đầu trang*/
        ├── footer.html
        └── nav.html
```
### Đường dẫn hình ảnh
Em đang dùng đường dẫn trực tiếp, ví dụ như:
```
file:///C:/Users/Windows%2011/Downloads/Frame%2016843.png
file:///C:/Users/Windows%2011/OneDrive/Documents/web.html
...
```
Đây là những đường dẫn trực tiếp, khi chuyển dự án sang 1 môi trường khác (ví dụ như máy anh), đường dẫn này sẽ sai. Thay vào đó, em hãy sử dụng đường dẫn gián tiếp. Ví dụ, đặt những hình ảnh em cần dùng vào folder `asset` như trên:
```css
...
└── asset/
    ├── universal/ /*các file (hình ảnh, logo,...) dùng chung giữa các trang*/
    ├── home/
    │   └── image1.png /*file ví dụ*/
    ├── shop/
    ├── contact/
    ├── cart/
    └── blog/
```
Sau đó, em viết đường dẫn dựa trên cấu trúc folder ở trên. Ví dụ như chèn hình ảnh vào file `home.html`:
```html
<img src="./asset/home/image1.png" alt="description"/>
```
### Host repo trên github
Khi host 1 trang web trên github, nó yêu cầu 1 directory có cấu trúc như sau:
```css
.
└── tên website/
    ├── index.html
    └── ... /*các file khác*/
```
Github sẽ mặc định file `index.html` là home page. Do repo của em không đúng cấu trúc nên không host trên github được
## HTML
Nội dung trong HTML không cần thay đổi nhiều. Chỉ cần thay đổi sau:
- Header, footer nên tách ra 1 file riêng và gộp vào vì header và footer dùng chung giữa các trang, không nên copy paste.
- `<header>` và `<nav>` nên tách ra, không nên để `<nav>` nằm trong `<header>`. `<header>` chứa logo và những thông tin liên quan. `<nav>` chứa cái navbar
- Đường dẫn với link css và js lại theo cách tổ chức file như trên.
- Các nút like, share, heart thì dùng [Google Material icon](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:search:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%23e8eaed) hay những font icon tương tự để load nhanh hơn.  Ví dụ:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

<span class="material-symbols-outlined">
search
</span>
```

## CSS
Các đoạn CSS giống nhau và dùng chung, em có thể tách ra làm 1 file thay vì copy paste vào từng file

## JS
Nên để đoạn code JS trong một file riêng. Các đoạn code em dùng đều giống nhau nên thay vì copy thì để trong 1 file riêng, dễ debug và mở rộng hơn.

Ví dụ: 
Trong các file HTML đều có đoạn code sau:
```js
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
```
Thay vào đó em có thể để trong 1 file tên là `product.js` (tên khác cũng được) và dùng file này trong html bằng tag `<script>`