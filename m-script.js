document.addEventListener('DOMContentLoaded', () => {
    // Images for the main section carousel
    const images = [
        'images/ama.svg',
        'images/hyderabad.png',
        'images/mumbai.png'
    ];

    let currentIndex = -1;

    // Function to change the background image of the main section
    function changeBackground(index) {
        currentIndex = index !== undefined ? index : (currentIndex + 1) % images.length;
        const SectionOne = document.getElementById('m-SectionOne');
        SectionOne.style.backgroundImage = `url(${images[currentIndex]})`;

        document.querySelectorAll('.m-city-label').forEach((label, index) => {
            if (index === currentIndex) {
                label.classList.add('m-active');
                label.querySelector('.m-progress-bar').style.width = '100%';
            } else {
                label.classList.remove('m-active');
                label.querySelector('.m-progress-bar').style.width = '0';
            }
        });
    }

    // Function to start the progress bar animations
    function startProgressBars() {
        document.querySelectorAll('.m-progress-bar').forEach(bar => {
            bar.style.transition = 'none';
            bar.style.width = '0';
            bar.offsetHeight; // Trigger a reflow to reset the animation
            bar.style.transition = 'width 4s linear';
        });
    }

    // Function to update the carousel
    function updateCarousel() {
        startProgressBars();
        changeBackground();
    }

    // Set interval to update the carousel every 4 seconds
    setInterval(updateCarousel, 4000);
    window.onload = updateCarousel;

    // Function to animate the number count
    function animateValue(id, start, end, duration) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let obj = document.getElementById(id);
        let timer = setInterval(function () {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Animate the stats numbers
    animateValue("m-propertiesCount", 150, 226, 2000);
    animateValue("m-transactionsCount", 2100, 2149, 2000);
    animateValue("m-citiesCount", 0, 27, 2000);

    // Add click event listeners to city labels to change background on click
    document.querySelectorAll('.m-city-label').forEach((label, index) => {
        label.addEventListener('click', () => {
            startProgressBars();
            changeBackground(index);
        });
    });

    // Accordion functionality
    const accordionItems = document.querySelectorAll('.m-accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.m-accordion-header');
        const content = item.querySelector('.m-accordion-content');
        const contentInner = item.querySelector('.m-accordion-content-inner');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('m-active');

            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('m-active');
                otherItem.querySelector('.m-accordion-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('m-active');
                content.style.maxHeight = contentInner.scrollHeight + 'px';
            }
        });
    });

    // Images for the new section carousel
    const imagesNew = [
        'images/estate.png',
        'images/vastu.png',
        'images/ai.png'
    ];

    let currentIndexNew = -1;

    // Function to change the background image of the new section
    function changeBackgroundNew(index) {
        currentIndexNew = index !== undefined ? index : (currentIndexNew + 1) % imagesNew.length;
        const SectionOne = document.getElementById('m-sectionOther');
        SectionOne.style.backgroundImage = `url(${imagesNew[currentIndexNew]})`;

        document.querySelectorAll('.m-city-label-new').forEach((label, idx) => {
            if (idx === currentIndexNew) {
                label.classList.add('m-active');
                label.querySelector('.m-progress-bar-new').style.width = '100%';
            } else {
                label.classList.remove('m-active');
                label.querySelector('.m-progress-bar-new').style.width = '0';
            }
        });
    }

    // Function to start the progress bar animations for the new section
    function startProgressBarsNew() {
        document.querySelectorAll('.m-progress-bar-new').forEach(bar => {
            bar.style.transition = 'none';
            bar.style.width = '0';
            bar.offsetHeight; // Trigger a reflow to reset the animation
            bar.style.transition = 'width 4s linear';
        });
    }

    // Function to update the new section carousel
    function updateCarouselNew() {
        startProgressBarsNew();
        changeBackgroundNew();
    }

    // Set interval to update the new section carousel every 4 seconds
    setInterval(updateCarouselNew, 4000);
    window.onload = updateCarouselNew;

    // Add click event listeners to city labels in the new section to change background on click
    document.querySelectorAll('.m-city-label-new').forEach((label, index) => {
        label.addEventListener('click', () => {
            startProgressBarsNew();
            changeBackgroundNew(index);
        });
    });

    // Tenant section functionality
    const tenantLinks = document.querySelectorAll('.m-tenantOptionLink');
    const sections = document.querySelectorAll('.m-tenantSection');
    const featureImage = document.getElementById('m-featureImageRight');

    const TenantImages = [
        'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1213447/pexels-photo-1213447.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/943907/pexels-photo-943907.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=279.825&fit=crop&h=453.05'
    ];

    let currentIdx = 0;
    let autoSwitchInterval;

    // Function to switch the tenant feature images and content
    const switchFeature = (index) => {
        tenantLinks.forEach(link => link.classList.remove('m-active'));
        sections.forEach(section => section.classList.add('m-hidden'));

        tenantLinks[index].classList.add('m-active');
        sections[index].classList.remove('m-hidden');
        featureImage.src = TenantImages[index];
    };

    // Function to start automatic switching of tenant features
    const startAutoSwitch = () => {
        autoSwitchInterval = setInterval(() => {
            currentIdx = (currentIdx + 1) % sections.length;
            switchFeature(currentIdx);
        }, 5000);
    };

    // Function to reset the automatic switching of tenant features
    const resetAutoSwitch = () => {
        clearInterval(autoSwitchInterval);
        startAutoSwitch();
    };

    // Add click event listeners to tenant links to switch features on click
    tenantLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentIdx = index;
            switchFeature(currentIdx);
            resetAutoSwitch();
        });
    });

    // Initial call to set the first tenant feature active and start automatic switching
    switchFeature(0);
    startAutoSwitch();

    // Property managers section functionality
    const propManLinks = document.querySelectorAll('.m-managerOptionLink');
    const propertySection = document.querySelectorAll('.m-propertySection');
    const featureImageRight = document.getElementById('m-featureImageLeft');

    const propManImages = [
        'images/track.png',
        'images/invoice.png',
        'images/manage.png',
        'images/research.png'
    ];

    let currentIdx1 = 0;
    let autoSwitchInterval1;

    // Function to switch the property manager feature images and content
    const switchFeature1 = (index) => {
        propManLinks.forEach(link => link.classList.remove('m-active'));
        propertySection.forEach(section => section.classList.add('m-hidden'));

        propManLinks[index].classList.add('m-active');
        propertySection[index].classList.remove('m-hidden');
        featureImageRight.src = propManImages[index];
    };

    // Function to start automatic switching of property manager features
    const startAutoSwitch1 = () => {
        autoSwitchInterval1 = setInterval(() => {
            currentIdx1 = (currentIdx1 + 1) % sections.length;
            switchFeature1(currentIdx1);
        }, 5000);
    };

    // Function to reset the automatic switching of property manager features
    const resetAutoSwitch1 = () => {
        clearInterval(autoSwitchInterval1);
        startAutoSwitch1();
    };

    // Add click event listeners to property manager links to switch features on click
    propManLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentIdx1 = index;
            switchFeature1(currentIdx1);
            resetAutoSwitch1();
        });
    });

    // Initial call to set the first property manager feature active and start automatic switching
    switchFeature1(0);
    startAutoSwitch1();

    // Added functionality to prevent form resubmission dialog
    if (sessionStorage.getItem('m-formSubmitted')) {
        sessionStorage.removeItem('m-formSubmitted');
        window.location.replace(window.location.pathname);
    }

    // Add event listener to the form to set the formSubmitted flag
    document.getElementById('m-form1').addEventListener('submit', function () {
        sessionStorage.setItem('m-formSubmitted', 'true');
    });

    // Show modal if there's a success or error message
    if (successMessage) {
        $('#successModal').modal('show');
    } else if (errorMessage) {
        $('#errorModal').modal('show');
    }

    // Remove formSubmitted flag on modal OK button click
    document.getElementById('m-successModalOkButton').addEventListener('click', function () {
        sessionStorage.removeItem('m-formSubmitted');
    });

    document.getElementById('m-errorModalOkButton').addEventListener('click', function () {
        sessionStorage.removeItem('m-formSubmitted');
    });
});
