// Product filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterDog = document.getElementById('filter-dog');
    const filterCat = document.getElementById('filter-cat');
    const filterBird = document.getElementById('filter-bird');
    
    function applyFilters() {
        const showDog = filterDog.checked;
        const showCat = filterCat.checked;
        const showBird = filterBird.checked;
        
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const category = product.dataset.category;
            const show = (category === 'dog' && showDog) ||
                        (category === 'cat' && showCat) ||
                        (category === 'bird' && showBird);
            product.style.display = show ? 'block' : 'none';
        });
    }
    
    filterDog.addEventListener('change', applyFilters);
    filterCat.addEventListener('change', applyFilters);
    filterBird.addEventListener('change', applyFilters);
});

