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


/****MODO CLARO/OSCURO****/
/****MODO CLARO / OSCURO CON IDIOMA DETECTADO AUTOMÁTICAMENTE****/
//Selecciona el botón con id 'toggle-tema', que se encarga de cambiar entre modo claro y oscuro
const btnTema = document.getElementById('toggle-tema');
//Hace referencia al elemento <body>, donde se aplica la clase "tema-oscuro"
const cuerpo = document.body;
//Detecta el idioma de la página leyendo el nombre del archivo actual en la URL
//Si el archivo es indexingles.html, se asume que el idioma es inglés ("en"), si no, español ("es")
const idiomaActual = location.pathname.includes("indexingles.html") ? "en" : "es";
//Función que actualiza el texto del botón de tema, usando el idioma actual y si el modo es oscuro
function actualizarTextoModo(esOscuro) {
  if (!btnTema) return; //Seguridad: no hacer nada si el botón no existe
  //En inglés
  if (idiomaActual === "en") {
    btnTema.textContent = esOscuro ? "☀️ Light mode" : "🌙 Dark mode";
  } else { //En español
    btnTema.textContent = esOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
  }
}
//Recupera del almacenamiento local (localStorage) el tema guardado anteriormente ("claro" o "oscuro")
const temaGuardado = localStorage.getItem('tema');
const estaEnModoOscuro = temaGuardado === 'oscuro';
//Si el tema guardado es "oscuro", se activa la clase correspondiente en el body al cargar la página
if (estaEnModoOscuro) {
  cuerpo.classList.add('tema-oscuro');
}
//Si el botón existe:
if (btnTema) {
  //Se actualiza el texto del botón según el tema inicial
  actualizarTextoModo(estaEnModoOscuro);
  //Se agrega un evento al hacer clic en el botón
  btnTema.addEventListener('click', () => {
    //Alterna la clase "tema-oscuro" en el <body> (activa o desactiva el modo oscuro)
    cuerpo.classList.toggle('tema-oscuro');
    //Detecta el nuevo estado (si el modo oscuro está activo)
    const esOscuro = cuerpo.classList.contains('tema-oscuro');
    //Actualiza el texto del botón con el nuevo estado
    actualizarTextoModo(esOscuro);
    //Guarda la elección del usuario en localStorage para mantenerla en futuras visitas
    localStorage.setItem('tema', esOscuro ? "oscuro" : "claro");
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
        tarjeta.classList.remove('oculto'); //por si quiero volver a mostrarla más tarde
    }, 500); //debe coincidir con el tiempo de la transición en CSS
}
//Esperamos que el DOM esté cargado antes de conectar el botón de cierre
setTimeout(() => {
    const btnCerrar = document.querySelector(".cerrar-tarjeta");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", function (event) {
            event.stopPropagation(); //Evita que el click se propague al fondo
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
//Seleccionamos los elementos del DOM donde se mostrará el texto y la firma
const textoElemento = document.getElementById("texto-maquina");
const firmaElemento = document.getElementById("firma-escrita");
//Variable de control para evitar que la animación se ejecute múltiples veces
let animacionActiva = false;

function iniciarAnimacionClinica() {
  //Salimos de la función si ya se está animando o los elementos no existen
  if (!textoElemento || !firmaElemento || animacionActiva) return;
  animacionActiva = true; //Bloqueamos la animación
  //Detectamos el idioma actual en función del nombre del archivo HTML
  let idiomaActual = location.pathname.includes("indexingles.html") ? "en" : "es";
  //Textos por idioma
  const textosClinica = {
    es: {
      texto: "En Beauty Girl creemos que la belleza comienza desde dentro. Cada espacio ha sido diseñado para inspirar calma y confianza. Nuestro equipo trabaja con dedicación para resaltar lo mejor de ti.",
      firma: "— Natalia de León"
    },
    en: {
      texto: "At Beauty Girl we believe beauty starts from within. Every space is designed to inspire calm and confidence. Our team works with dedication to bring out the best in you.",
      firma: "— Natalia de León"
    }
  };
  //Asignamos el texto y firma según idioma
  const texto = textosClinica[idiomaActual].texto;
  const firma = textosClinica[idiomaActual].firma;
  //Contadores para animar letra a letra
  let i = 0;
  let j = 0;
  //Limpiamos el contenido antes de animar
  textoElemento.textContent = "";
  firmaElemento.textContent = "";
  //Función recursiva para escribir el texto con efecto máquina de escribir
  function escribirTexto() {
    if (i < texto.length) {
      textoElemento.textContent += texto.charAt(i);
      i++;
      setTimeout(escribirTexto, 30); //velocidad de escritura
    } else {
      setTimeout(escribirFirma, 500); //pausa antes de la firma
    }
  }
  //Función para animar la firma una vez que el texto ha terminado
  function escribirFirma() {
    if (j < firma.length) {
      firmaElemento.textContent += firma.charAt(j);
      j++;
      setTimeout(escribirFirma, 60); //velocidad de escritura de la firma
    } else {
      animacionActiva = false; //desbloqueamos la animación una vez completada
    }
  }
  //Iniciamos el proceso
  escribirTexto();
}
//Activamos la animación cuando la sección Clínica entra en pantalla (scroll)
const seccionClinica = document.getElementById("clinica");
if (seccionClinica) {
  const observerClinica = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        iniciarAnimacionClinica(); //solo se ejecuta si es visible
      }
    });
  }, {
    threshold: 0.5 //activa cuando el 50% de la sección es visible
  });
  observerClinica.observe(seccionClinica); //activamos el observador
}
/*ROTACIÓN DE IMÁGENES (directora / fachada)*/
//Array que contiene las rutas de las imágenes a rotar
const imagenes = [
  "IMAGENES/directora.png",
  "IMAGENES/fachadaClinica.png"
];
//Variable que lleva el control del índice actual de imagen mostrada
let indice = 0;
//se selecciona el elemento de imagen donde se mostrará la rotación
const imagenRotativa = document.getElementById("imagen-rotativa");
//Si el elemento existe en el DOM (por seguridad):
if (imagenRotativa) {
  //Se establece una función que se ejecuta cada 5 segundos
  setInterval(() => {
    //Aplica transición de opacidad para un efecto fade out
    imagenRotativa.style.transition = "opacity 1s ease";
    imagenRotativa.style.opacity = 0;
    //Después de 2 segundos (cuando está completamente opaca), cambia la imagen
    setTimeout(() => {
      //Avanza al siguiente índice de imagen (cíclico)
      indice = (indice + 1) % imagenes.length;
      //Cambia el atributo src de la imagen para mostrar la siguiente
      imagenRotativa.src = imagenes[indice];
      //Restaura la opacidad para hacer un efecto de fade in
      imagenRotativa.style.opacity = 1;
    }, 2000); //Tiempo de espera para el cambio de imagen (cuando ya está opaca)
  }, 5000); //Intervalo total de rotación (cada 5 segundos)
}



/****CANVAS ANIMADO EN SECCIÓN CLÍNICA****/
//Selecciona el canvas con id 'canvas-clinica'
const canvas = document.getElementById('canvas-clinica');
//Comprueba que el canvas existe antes de ejecutar el código
if (canvas) {
  //Obtiene el contexto de dibujo en 2D del canvas
  const ctx = canvas.getContext('2d');
  //Variables que almacenarán el tamaño del canvas
  let width, height;
  //Genera un array de 30 burbujas con propiedades aleatorias
  const bubbles = Array.from({ length: 30 }, () => ({
    x: Math.random() * canvas.offsetWidth,     //Posición horizontal aleatoria
    y: Math.random() * canvas.offsetHeight,    //Posición vertical aleatoria
    radius: Math.random() * 8 + 2,             //Radio entre 2 y 10 píxeles
    speed: Math.random() * 0.5 + 0.2,          //Velocidad de subida entre 0.2 y 0.7
    alpha: Math.random() * 0.5 + 0.3           //Opacidad entre 0.3 y 0.8
  }));
  //Ajusta el tamaño del canvas según su contenedor
  function resizeCanvas() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  //Función que dibuja las burbujas y anima su movimiento
  function animateBubbles() {
    //Limpia el canvas en cada fotograma
    ctx.clearRect(0, 0, width, height);
    //Dibuja cada burbuja y actualiza su posición
    bubbles.forEach(b => {
      ctx.beginPath(); // Inicia un nuevo trazo
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2); // Dibuja un círculo
      ctx.fillStyle = `rgba(139, 26, 165, ${b.alpha})`; // Color violeta con opacidad
      ctx.fill(); // Rellena la burbuja
      //Mueve la burbuja hacia arriba
      b.y -= b.speed;
      //Si la burbuja sale por la parte superior, se reinicia desde abajo
      if (b.y < -b.radius) {
        b.y = height + b.radius;
        b.x = Math.random() * width; //Nueva posición horizontal aleatoria
      }
    });
    //Llama de nuevo a la función en el próximo frame (bucle de animación)
    requestAnimationFrame(animateBubbles);
  }
  //Vuelve a ajustar el tamaño del canvas si se cambia el tamaño de la ventana
  window.addEventListener('resize', resizeCanvas);
  //Ajusta el tamaño inicial del canvas
  resizeCanvas();
  //Inicia la animación de burbujas
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




