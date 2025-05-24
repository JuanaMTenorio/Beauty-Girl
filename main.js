/****EJECUTO TODO CUANDO EL DOM ESTÉ COMPLETAMENTE CARGADO****/
document.addEventListener("DOMContentLoaded", function () {


/****CERRAR EL MENÚ HAMBURGUESA AL HACER CLICK EN UN ENLACE****/
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(function(link) {
  link.addEventListener('click', function () {
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});


/****EFECTO DE TITULO "Bienvenidos a Beauty Girl" CON SCROLL PARA MOVIL/TABLET****/
if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 1024) {
  const $titulo = $('h1');
  const colorOriginal = '#ff88f9';
  const colorScroll = '#8b1aa5';

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $titulo.css('color', colorScroll);
    } else {
      $titulo.css('color', colorOriginal);
    }
  });
}


/****ANIMACIÓN TARJETA REGALO****/
const tarjeta = document.getElementById("tarjeta-regalo");
const contenido = document.querySelector(".contenido-tarjeta");
//Mostrar una vez por sesión
if (!sessionStorage.getItem("tarjetaMostrada")) {
    tarjeta.style.display = "flex";
    sessionStorage.setItem("tarjetaMostrada", "true");
} else {
    tarjeta.style.display = "none";
}
//Función para cerrar
function cerrarTarjeta() {
    tarjeta.classList.add('oculto');
    //Esperar a que termine la transición antes de ocultarla completamente
    setTimeout(() => {
        tarjeta.style.display = 'none';
        tarjeta.classList.remove('oculto'); // por si quieres volver a mostrarla más tarde
    }, 500); //debe coincidir con el tiempo de la transición en CSS
}
//Esperamos que el DOM esté cargado antes de conectar el botón de cierre
setTimeout(() => {
    const btnCerrar = document.querySelector(".cerrar-tarjeta");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que el click se propague al fondo
            cerrarTarjeta();
        });
    } else {
        console.warn("Botón '.cerrar-tarjeta' no encontrado en el DOM.");
    }
}, 100);
//Cierro con tecla Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") cerrarTarjeta();
});
//Cierro al hacer clic fuera del contenido
document.addEventListener("click", function (event) {
    if (!contenido.contains(event.target) && tarjeta.style.display !== "none") {
        cerrarTarjeta();
    }
});


/****JAVASCRIPT PARA EL ICONO FLOTANTE****/
const backToTopButton = document.querySelector('.back-to-top');
//Mostrar el botón cuando se haya desplazado más de 200px hacia abajo
window.addEventListener('scroll', function () {
    backToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
});
//Volver arriba al hacer clic en el icono
backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


/****SECCION CLINICA + ROTACIÓN DE IMG DIRECTORA/FACHADA****/
//EFECTO MÁQUINA DE ESCRIBIR + FIRMA ANIMADA LETRA A LETRA
const textoElemento = document.getElementById("texto-maquina");
const firmaElemento = document.getElementById("firma-escrita");

let animacionActiva = false; //Nueva variable de control

function iniciarAnimacionClinica() {
  if (!textoElemento || !firmaElemento || animacionActiva) return;

  animacionActiva = true;

  const texto = "En Beauty Girl creemos que la belleza comienza desde dentro. Cada espacio ha sido diseñado para inspirar calma y confianza. Nuestro equipo trabaja con dedicación para resaltar lo mejor de ti.";
  const firma = "— Natalia de León";
  let i = 0;
  let j = 0;

  textoElemento.textContent = "";
  firmaElemento.textContent = "";

  function escribirTexto() {
    if (i < texto.length) {
      textoElemento.textContent += texto.charAt(i);
      i++;
      setTimeout(escribirTexto, 30);
    } else {
      setTimeout(escribirFirma, 500);
    }
  }

  function escribirFirma() {
    if (j < firma.length) {
      firmaElemento.textContent += firma.charAt(j);
      j++;
      setTimeout(escribirFirma, 60);
    } else {
      animacionActiva = false; // Solo se libera al terminar la firma
    }
  }

  escribirTexto();
}

const seccionClinica = document.getElementById("clinica");

if (seccionClinica) {
  const observerClinica = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        iniciarAnimacionClinica(); // Evita que se solape la animación
      }
    });
  }, {
    threshold: 0.5
  });

  observerClinica.observe(seccionClinica);
}


/*ROTACIÓN DE IMÁGENES (directora / fachada)*/
const imagenes = [
  "IMAGENES/directora.png",
  "IMAGENES/fachadaClinica.png"
];
let indice = 0;
const imagenRotativa = document.getElementById("imagen-rotativa");
if (imagenRotativa) {
  setInterval(() => {
    //Inicia fade out
    imagenRotativa.style.transition = "opacity 1s ease";
    imagenRotativa.style.opacity = 0;
    setTimeout(() => {
      //Cambia imagen cuando está opaca
      indice = (indice + 1) % imagenes.length;
      imagenRotativa.src = imagenes[indice];
      //Inicia fade in
      imagenRotativa.style.opacity = 1;
    }, 2000); // Espera a que se desvanezca antes de cambiar
  }, 5000); // Espera 7 segundos entre cada cambio
}

/****CANVAS ANIMADO EN SECCIÓN CLÍNICA****/
const canvas = document.getElementById('canvas-clinica');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;

    function resizeCanvas() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const bubbles = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 8 + 2,
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.3
    }));

    function animateBubbles() {
        ctx.clearRect(0, 0, width, height);
        bubbles.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 26, 165, ${b.alpha})`;
            ctx.fill();
            b.y -= b.speed;
            if (b.y < -b.radius) {
                b.y = height + b.radius;
                b.x = Math.random() * width;
            }
        });
        requestAnimationFrame(animateBubbles);
    }

    animateBubbles();
}

/****ANIMACIÓN PARA QUE LAS BARRAS ENTREN DESDE FUERA DE LA PANTALLA****/
const $barras = $('.seccion-puzzle .barra');
const observerServicios = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      //Reinicia estilos antes de animar
      $barras.each(function () {
        $(this).css({ width: 0, opacity: 0, transition: 'none' });
      });
      //Animación escalonada
      $barras.each(function (index) {
        const $barra = $(this);
        const anchoFinal = $barra.data('ancho');
        setTimeout(() => {
          $barra.css({
            transition: 'width 0.8s ease, opacity 0.8s ease',
            width: anchoFinal,
            opacity: 1
          });
        }, index * 300);
      });
    } else {
      //Al salir de la sección, reiniciar
      $barras.each(function () {
        $(this).css({ width: 0, opacity: 0 });
      });
    }
  });
}, {
  threshold: 0.4
});

const targetServicios = document.querySelector('.seccion-puzzle');
if (targetServicios) {
  observerServicios.observe(targetServicios);
}
/*SONIDO AL PASAR EL RATON SOBRE LAS BARRAS - SECCION SERVICIOS*/
//Puede que el navegador bloquee el audio, para activarlo debo interactuar con la web (click, scroll)
const sonido = document.getElementById('sonido-hover');
if (sonido) {
  document.querySelectorAll('.barra').forEach(barra => {
    barra.addEventListener('mouseenter', () => {
      try {
        sonido.currentTime = 0; // reinicia el sonido
        sonido.play();
      } catch (e) {
        console.log("⚠️ No se pudo reproducir el sonido:", e);
      }
    });
  });
}


/****SECCIÓN TRABAJOS - GALERIA RODANTE AUTOMÁTICA, ARRASTRAR CON EL RATÓN Y PAUSAR AL INTERACTUAR****/
 const galeria = document.querySelector('.galeria-contenido');
  const items = document.querySelectorAll('.imagen-contenedor');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      galeria.style.animationPlayState = 'paused';
    });
    item.addEventListener('mouseleave', () => {
      galeria.style.animationPlayState = 'running';
    });
    item.addEventListener('touchstart', () => {
      galeria.style.animationPlayState = 'paused';
    });
    item.addEventListener('touchend', () => {
      setTimeout(() => {
        galeria.style.animationPlayState = 'running';
      }, 3000);
    });
  });
/****MUESTRO EL TITULO EN MOVIL/TABLET CUADNO TOCO LA IMG. DESPUES DE 2S DESAPARECE */
$('.imagen-contenedor').on('touchstart', function () {
    const $titulo = $(this).find('.panel-titulo');
    $titulo.css({
      opacity: 1,
      transform: 'translateY(0)'
    });

    setTimeout(() => {
      $titulo.css({
        opacity: 0,
        transform: 'translateY(100%)'
      });
    }, 1000);
  });


/****ANIMACIÓN DE ENTRADA RECURRENTE EN SECCIÓN CONOCENOS****/
const columnas = document.querySelectorAll('.columna-animada');

const observerConocenos = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('columna-visible');
    } else {
      entry.target.classList.remove('columna-visible'); //permite repetir la animación
    }
  });
}, {
  threshold: 0.4 //Ajusta cuánto debe entrar en pantalla para activarse
});

columnas.forEach(col => observerConocenos.observe(col));


/****CANVAS BURBUJAS EN SECCIÓN CONOCENOS****/
const canvasConocenos = document.getElementById('canvas-conocenos');
if (canvasConocenos) {
    const ctx = canvasConocenos.getContext('2d');
    let width, height;

    function resizeCanvas() {
        width = canvasConocenos.width = canvasConocenos.offsetWidth;
        height = canvasConocenos.height = canvasConocenos.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const bubbles = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 8 + 2,
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.3
    }));

    function animateBubbles() {
        ctx.clearRect(0, 0, width, height);
        bubbles.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 26, 165, ${b.alpha})`;
            ctx.fill();
            b.y -= b.speed;
            if (b.y < -b.radius) {
                b.y = height + b.radius;
                b.x = Math.random() * width;
            }
        });
        requestAnimationFrame(animateBubbles);
    }

    animateBubbles();
}


















});/*FIN*/




