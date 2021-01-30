const projects = document.querySelector('.projects');

document.addEventListener('DOMContentLoaded', function(){
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const slider = document.querySelectorAll('.slider');
    M.Slider.init(slider, {
        indicators: false,
        height: 500,
        transition: 600,
        interval: 3000
    });

    const parallax = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax);

    const materialbox = document.querySelectorAll('.materialboxed')
    M.Materialbox.init(materialbox);

    const scroll = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(scroll, {
        scrollOffset: 50
    });

    const dropDown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDown);

    const carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel, {
        shift: 50
    });

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
});

// const renderProject = (data,id) => {
//     const html = `
        // <div class="col m4 s6 project" data-id="${id}">
        //     <div class="card">
        //         <div class="card-image">
        //             <img src="${data.image}">
        //         </div>
        //         <div class="card-content">
        //             <span class="card-title">${data.name}</span>
        //             <p class="flex flex-wrap">${data.description}</p>
        //         </div>
        //         <div class="card-action">
        //             <i class="material-icons" data-id="${id}">delete_outline</i>
        //         </div>
        //     </div>
        // </div>
//     `;
    
//     projects.innerHTML += html;
// };

// //remove project
// const removeProject = (id) => {
//     const project = document.querySelector(`.project[data-id=${id}]`);
//     project.remove();
// };