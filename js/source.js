document.getElementById('to-top').addEventListener('click', () => {
    let y = window.scrollY;
    setInterval(() => {
        if(y > 0) {
            scroll(0,y-=20)
        } else {
            clearInterval();
        }
    }, 1);
});

function scrollToElement(element) {
    let top = document.getElementById(element).getBoundingClientRect().top;
    let position = 0;
    setInterval(() => {
        if(position < top) {
            if(top - position >= 20) {
                scroll(0,position+=20);
            } else {
                scroll(0, top);
                position+=20;
            }
        } else {
            clearInterval();
        }
    }, 1);
}

document.getElementById('nav_doctor').addEventListener('click', () => {
    scrollToElement('services');
});

document.getElementById('nav_apps').addEventListener('click', () => {
    scrollToElement('download_apps');
});

document.getElementById('nav_testimonials').addEventListener('click', () => {
    scrollToElement('testimonials');
});

document.getElementById('nav_about').addEventListener('click', () => {
    scrollToElement('contact_us');
});




// carousel
localStorage.setItem('carousel_number', '1');

const carousel_dummy = [
    ['Edward Newgate', 'Founder Circle', 'Our dedicated patient engagement app and web portal allow you to access information instantaneously (no tedeous form, long calls, or administrative hassle) and securely'],
    ['Tracy Smith', 'Designer', 'Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone'],
    ['Jane Doe', 'Market Analyst', 'Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone. To us, it’s not just work. We take pride in the solutions we deliver'],
    ['William Hill', 'Founder Circle', 'We provide to you the best choiches for you. Adjust it to your health needs and make sure your undergo treatment with our highly qualified doctors you can consult with us which type of service is suitable for your health'],
    // ['Jack Reach', 'Developer', 'Trafalgar provides progressive, and affordable healthcare, accessible on mobile and online for everyone']
]

const people = carousel_dummy.length;

for (let i = 0; i < people; i++) {
    let div = document.createElement('span');
    div.className = "dot";
    div.id = `dot_${i + 1}`;
    document.getElementById('dots').appendChild(div);
}

for (let i = 1; i <= people; i++) {
    document.getElementById(`dot_${i}`).addEventListener('click', () => {
        changeActive(i - 1, 'x');
    });
}
document.getElementById('dots').children[0].classList.add('dot-active');

function changeActive(carousel_number, origin) {
    document.getElementById('photo').style.backgroundImage = `url("assets/images/testimonial/${carousel_number + 1}.png")`;
    document.getElementById('name').innerText = carousel_dummy[carousel_number][0];
    document.getElementById('post').innerText = carousel_dummy[carousel_number][1];
    document.getElementById('details').innerText = '"' + carousel_dummy[carousel_number][2] + '"'   ;
    carousel_number = (carousel_number === -1)?people - 1:carousel_number;
    document.getElementById('dots').children[carousel_number].classList.add('dot-active');
    if (origin === 'n') {
        carousel_number--;
        carousel_number = (carousel_number === -1)?people - 1:carousel_number;
        document.getElementById('dots').children[carousel_number].classList.remove('dot-active');
    } else if (origin === 'p'){
        carousel_number++;
        carousel_number = (carousel_number === people)?0:carousel_number;
        document.getElementById('dots').children[carousel_number].classList.remove('dot-active');
    } else if (origin === 'x') {
        for (let i = 0; i < people; i++) {
            if(document.getElementById('dots').children[i].classList.contains('dot-active')) {
                document.getElementById('dots').children[i].classList.remove('dot-active');
            }
        }
        document.getElementById('dots').children[carousel_number].classList.add('dot-active');
        localStorage.setItem('carousel_number', (carousel_number + 1).toString());
    }
}

changeActive(0, 'x');

document.getElementById('next').addEventListener('click', () => {
    let carousel_number = parseInt(localStorage.getItem('carousel_number'));

    carousel_number++;
    carousel_number = (carousel_number === people + 1)?1:carousel_number;
    localStorage.setItem('carousel_number', carousel_number.toString());

    changeActive(carousel_number - 1, 'n');
});

document.getElementById('previous').addEventListener('click', () => {
    let carousel_number = parseInt(localStorage.getItem('carousel_number'));

    carousel_number--;
    carousel_number = (carousel_number === 0) ? people : carousel_number;
    localStorage.setItem('carousel_number', carousel_number.toString());

    changeActive(carousel_number - 1, 'p');
});
