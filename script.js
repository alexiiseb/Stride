const buscador =
document.getElementById("buscador");

const filtroMarca =
document.getElementById("filtroMarca");

const ordenPrecio =
document.getElementById("ordenPrecio");

const carritoHTML =
document.getElementById("carrito");

const abrirCarrito =
document.getElementById("abrirCarrito");

const cerrarCarrito =
document.getElementById("cerrarCarrito");

const overlay =
document.getElementById("overlay");

const listaCarrito =
document.getElementById("listaCarrito");

const contador =
document.getElementById("contador");

const total =
document.getElementById("total");

const contenedorProductos =
document.querySelector(".estanteria");

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];

abrirCarrito.addEventListener("click", () => {
    carritoHTML.classList.add("activo");
    overlay.classList.add("activo");
});
cerrarCarrito.addEventListener("click", () => {
    carritoHTML.classList.remove("activo");
    overlay.classList.remove("activo");

});
overlay.addEventListener("click", () => {
    carritoHTML.classList.remove("activo");
    overlay.classList.remove("activo");
});

document
.querySelectorAll(".agregar")
.forEach(boton => {
    boton.addEventListener("click", () => {

        const producto =
        boton.parentElement;

        const nombre =
        producto.querySelector("h3")
        .textContent;

        const precio =
        Number(
            producto.querySelector(".precio")
            .textContent
        );

        const existe =
        carrito.find(item =>
            item.nombre === nombre
        );

        if(existe){

            existe.cantidad++;
        }else{

            carrito.push({
                nombre,
                precio,
                cantidad:1
            });
        }
        actualizarCarrito();
    });
});

function actualizarCarrito(){

    listaCarrito.innerHTML = "";

    let suma = 0;

    carrito.forEach((item, indice) => {
        suma +=
        item.precio * item.cantidad;

        listaCarrito.innerHTML += `
            <li>
                ${item.nombre}
                x${item.cantidad}

                <button
                onclick="eliminarProducto(${indice})">
                ❌
                </button>
            </li>
        `;
    });

    contador.textContent =
    carrito.reduce(
        (acc,item)=>
        acc + item.cantidad,
        0
    );
    total.textContent =
    suma.toFixed(2);
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}

function eliminarProducto(indice){
    carrito.splice(indice,1);
    actualizarCarrito();
}

buscador.addEventListener("keyup", () => {

    const texto =
    buscador.value.toLowerCase();

    document
    .querySelectorAll(".producto")
    .forEach(producto => {

        const nombre =
        producto
        .querySelector("h3")
        .textContent
        .toLowerCase();

        producto.style.display =
        nombre.includes(texto)
        ? "block"
        : "none";
    });
});

filtroMarca.addEventListener("change", () => {

    const marca =
    filtroMarca.value;

    document
    .querySelectorAll(".producto")
    .forEach(producto => {

        const nombre =
        producto
        .querySelector("h3")
        .textContent
        .toLowerCase();

        if(
            marca === "todos" ||
            nombre.includes(marca)
        ){
            producto.style.display =
            "block";
        }else{
            producto.style.display =
            "none";
        }
    });
});

ordenPrecio.addEventListener("change", () => {

    const productos = [
        ...document.querySelectorAll(".producto")
    ];

    productos.sort((a,b)=>{
        const precioA =
        Number(
            a.querySelector(".precio")
            .textContent
        );
        const precioB =
        Number(
            b.querySelector(".precio")
            .textContent
        );
        return ordenPrecio.value === "menor"
            ? precioA - precioB
            : precioB - precioA;
    });

    productos.forEach(producto => {
        contenedorProductos
        .appendChild(producto);
    });
});

actualizarCarrito();