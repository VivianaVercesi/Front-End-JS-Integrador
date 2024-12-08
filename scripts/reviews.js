document.addEventListener("DOMContentLoaded", () => {
    const reviewContainer = document.getElementById('review-container');
    if (!reviewContainer) {
        console.error("No se encontró el contenedor de reseñas");
        return;
    }
    listReviews(reviewContainer);
})

function listReviews(reviewContainer) {
    const jsonURL = './data/products.json';

    fetch(jsonURL)
        .then((response) => {
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error('Error al cargar el archivo json');
            }
            return response.json();
        })
        .then((products) => {
            console.log(products);
            products.forEach((product) => {
                const reviewCard = `
                <div class="grid-item">
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img src="./assets/images/${product.image}" alt="foto del vestido ${product.name}" class="image">
                            </div>
                            <div class="flip-card-back">
                                <h1>${product.reviewAuthor}</h1>
                                <p>${product.review}</p>
                            </div>
                         </div>
                    </div>  
                </div>
                `;
                reviewContainer.innerHTML += reviewCard;
            });
        })
        .catch((error) => {
            console.error('Hubo un error:', error);
            reviewContainer.innerHTML = '<p>No se pudo cargar la lista de reseñas</p>';
        });
}