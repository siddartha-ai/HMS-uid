let urlParams = new URLSearchParams(window.location.search);
let webName = urlParams.get('details');
webName = webName.split(',');

document.querySelector('button') 
.addEventListener('click' , () => {
    let userName = document.querySelector('.js-user-name').value;
    let password = document.querySelector('.js-password').value;


    if (userName === webName[0]) {
        if (password === webName[1]) {
            console.log('u r loged in');
        } else {
            alert('incorrect password');
        }
    } else {
        alert('Kindely register as user not found');
    }
});