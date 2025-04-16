document.addEventListener('DOMContentLoaded', function() {
    // BGM 제어
    const bgmButton = document.getElementById('bgm-toggle');
    const bgmText = bgmButton.querySelector('.bgm-text');
    const bgm = document.getElementById('background-music');
    let isPlaying = false;

    bgmButton.addEventListener('click', function() {
        if (isPlaying) {
            bgm.pause();
            bgmButton.classList.remove('playing');
            bgmText.textContent = '음악 켜기';
            isPlaying = false;
        } else {
            bgm.play().catch(e => {
                console.log('BGM 재생에 실패했습니다:', e);
                alert('음악을 재생하기 위해 페이지와 상호작용이 필요합니다.');
            });
            bgmButton.classList.add('playing');
            bgmText.textContent = '음악 끄기';
            isPlaying = true;
        }
    });

    // 물 효과 애니메이션 개선
    const waterEffect = document.querySelector('.water-effect');
    if (waterEffect) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            waterEffect.style.transform = `translateX(${(x - 0.5) * 10}px) translateY(${(y - 0.5) * 5}px)`;
        });
    }
    
    // 배경 시차 효과
    const body = document.querySelector('body');
    if (body) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            body.style.backgroundPosition = `${50 + (x - 0.5) * 10}% ${50 + (y - 0.5) * 10}%`;
        });
    }
    
    // 달 효과 애니메이션
    const moon = document.querySelector('.moon');
    if (moon) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            moon.style.transform = `translate(${(x - 0.5) * -30}px, ${(y - 0.5) * -30}px)`;
        });
    }
    
    // 프로필 모달 제어
    const profileButtons = document.querySelectorAll('.profile-button');
    const closeButtons = document.querySelectorAll('.close-button');
    const modals = document.querySelectorAll('.profile-modal');
    
    // 프로필 버튼 클릭 시 모달 열기
    profileButtons.forEach(button => {
        button.addEventListener('click', function() {
            const character = this.getAttribute('data-character');
            const modal = document.getElementById(`${character}-profile`);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 스크롤 방지
                
                // 모달 등장 애니메이션
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        });
    });
    
    // 닫기 버튼 클릭 시 모달 닫기
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.profile-modal');
            closeModal(modal);
        });
    });
    
    // 모달 영역 외 클릭 시 닫기
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // ESC 키 누르면 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });
    
    // 모달 닫기 함수
    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // 스크롤 복원
        }, 300);
    }
    
    // 텍스트 타이핑 효과 (인트로 섹션)
    const greetingParagraphs = document.querySelectorAll('.greeting-message p');
    
    // 각 문단의 표시 딜레이
    greetingParagraphs.forEach((paragraph, index) => {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(20px)';
        paragraph.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            paragraph.style.opacity = '1';
            paragraph.style.transform = 'translateY(0)';
        }, 500 + (index * 300)); // 각 문단마다 시간차
    });
    
    // 이현과 이도의 인물 카드에 시차 효과 적용
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const x = (e.clientX - cardRect.left) / cardRect.width - 0.5;
            const y = (e.clientY - cardRect.top) / cardRect.height - 0.5;
            
            // 카드 자체의 3D 효과
            this.style.transform = `
                perspective(1000px)
                rotateY(${x * 5}deg)
                rotateX(${y * -5}deg)
                translateZ(10px)
            `;
            
            // 카드 내부 이미지의 움직임 (패럴랙스 효과)
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = `
                    translateX(${x * -15}px)
                    translateY(${y * -15}px)
                    scale(1.05)
                `;
            }
            
            // 아우라 효과 강화
            const aura = this.querySelector('.character-aura');
            if (aura) {
                aura.style.opacity = '0.6';
                aura.style.transform = `
                    translateX(${x * -10}px)
                    translateY(${y * -10}px)
                `;
            }
        });
        
        // 마우스가 카드를 벗어날 때 원래 상태로 돌아가기
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = '';
            }
            const aura = this.querySelector('.character-aura');
            if (aura) {
                aura.style.opacity = '';
                aura.style.transform = '';
            }
        });
    });
    
    // 스크롤 효과: 페이지가 스크롤될 때 요소들이 자연스럽게 등장
    const fadeElements = document.querySelectorAll('.character-card, .greeting-message');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // 초기 스크롤 위치 확인
    checkScroll();
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', checkScroll);
}); 