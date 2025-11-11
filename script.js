// script.js - Đã hợp nhất và làm sạch
document.addEventListener('DOMContentLoaded', () => {

    // 1. Hiệu ứng xuất hiện dần khi cuộn (Reveal on Scroll)
    const sections = document.querySelectorAll('.section');
    
    // Sử dụng Intersection Observer (từ index3/index4) vì nó hiệu quả hơn window.scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ngừng quan sát sau khi đã hiển thị để tiết kiệm tài nguyên
                observer.unobserve(entry.target); 
            } 
        });
    }, { threshold: 0.2 }); // Kích hoạt khi 20% section hiển thị

    sections.forEach(sec => observer.observe(sec));


    // 2. Hiệu ứng phóng to ảnh (Lightbox)
    const images = document.querySelectorAll('.content-img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.classList.add('img-overlay');
            const altText = img.alt ? `<p style="color:white; margin-top: 15px;">${img.alt}</p>` : ''; 
            overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}"> ${altText}`;
            document.body.appendChild(overlay);

            // Đóng khi click vào overlay
            overlay.addEventListener('click', (e) => {
                if(e.target === overlay) {
                    overlay.remove();
                }
            });

            // Đóng khi nhấn phím ESC
            const closeOnEsc = (e) => {
                if (e.key === 'Escape') {
                    overlay.remove();
                    document.removeEventListener('keydown', closeOnEsc);
                }
            };
            document.addEventListener('keydown', closeOnEsc);
        });
    });

    // 3. Hiển thị nút "Tìm hiểu tiếp" (Chỉ chạy trên index2.html)
    const nextSection = document.querySelector(".next-section");
    if (nextSection) {
        nextSection.style.display = "none"; // Đảm bảo ẩn ban đầu
        
        window.addEventListener("scroll", () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            
            // Hiện nút khi cuộn đến 80% trang
            if (window.scrollY > scrollable * 0.8) {
                nextSection.style.display = "block";
                nextSection.classList.add("visible");
            } else {
                nextSection.style.display = "none";
                nextSection.classList.remove("visible");
            }
        });
    }
});