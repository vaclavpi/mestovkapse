document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.features-wrapper');
    const indicators = document.querySelectorAll('.indicator');
    
    let isDragging = false;
    let startX;
    let scrollLeft;
  
    function updateIndicators() {
      const wrapperWidth = wrapper.clientWidth;
      const scrollLeft = wrapper.scrollLeft;
      const index = Math.round(scrollLeft / wrapperWidth);
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    }
  
    wrapper.addEventListener('scroll', updateIndicators);
    updateIndicators(); // Initialize indicators on page load
  
    // Optional: Add click event to indicators for smooth scrolling
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        wrapper.scrollTo({
          left: wrapper.clientWidth * index,
          behavior: 'smooth'
        });
      });
    });
  
    // Implement horizontal scrolling via mouse drag
    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });
  
    wrapper.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  
    wrapper.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 2; // Scroll rychlost (změňte, pokud je potřeba)
      wrapper.scrollLeft = scrollLeft - walk;
    });
  });
  