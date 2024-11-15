{
let score = (document.cookie.match(new RegExp("RECIPROCO", "g")) || []).length;
let ctm = (document.cookie.match(new RegExp("CTM", "g")) || []).length;

// Go to main page if not all questions are answered
if (score + ctm != 32) {
    window.location = "/";
}

// Set page content
let l_name = document.getElementById("nombre-laureado");
let l_text = document.getElementById("texto-laureado");
let l_image = document.getElementById("imagen-laureado");

if (score < 10) {
    l_name.innerHTML = "Baja reciprocidad";
    l_text.innerHTML = "Las relaciones pueden tender a ser desequilibradas, y podrías recibir más de lo que das o, en algunos casos, esperar mucho sin ofrecer lo mismo. Este nivel de reciprocidad puede llevar a tensiones o insatisfacción. Trabajar en equilibrar el dar y recibir te ayudará a construir relaciones más saludables y satisfactorias.";
    l_image.src = "/assets/img/resultado/baja.webp";
}
else if (score < 18) {
    l_name.innerHTML = "Reciprocidad media";
    l_text.innerHTML = "Tus relaciones pueden mostrar desequilibrios en algunos aspectos. Puede que en ciertas situaciones des más de lo que recibes o viceversa. Reflexionar sobre estas áreas puede ayudarte a fortalecer tus relaciones y hacerlas más satisfactorias para ambas partes.";
    l_image.src = "/assets/img/resultado/media.webp";
}
else if (score < 25) {
    l_name.innerHTML = "Buena reciprocidad";
    l_text.innerHTML = "Tienes una buena reciprocidad en la mayoría de tus relaciones. Aunque das y recibes de manera equilibrada, podría haber áreas donde puedes mejorar. Es probable que algunas relaciones se beneficien si prestas un poco más de atención a los detalles de reciprocidad.";
    l_image.src = "/assets/img/resultado/buena.webp";
}
else {
    l_name.innerHTML = "Alta reciprocidad";
    l_text.innerHTML = "Tus relaciones suelen estar bien equilibradas. Te esfuerzas en dar tanto como recibes y demuestras empatía, compromiso y consideración hacia los demás. Este enfoque permite relaciones armoniosas y satisfactorias, donde el respeto y el apoyo son mutuos.";
    l_image.src = "/assets/img/resultado/alta.webp";
}

// Delete all cookies to reset
document.cookie.split(';').forEach(cookie_untrimmed => {
    let cookie = cookie_untrimmed.trim();
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`;
});
}
