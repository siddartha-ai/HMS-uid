let userList = [];
document.querySelector('.div-form-general')
.classList.add('form-blue');
document.querySelector('.div-form-address')
.classList.add('form-white');

document.querySelector('.div-form-general')
.addEventListener('click' , () => {
    document.querySelector('.div-form-general')
    .classList.add('form-blue');
    document.querySelector('.div-form-general')
    .classList.remove('form-white');

    document.querySelector('.div-form-address')
    .classList.add('form-white');
    document.querySelector('.div-form-address')
    .classList.remove('form-blue');
});

document.querySelector('.div-form-address')
.addEventListener('click' , () => {
    document.querySelector('.div-form-address')
    .classList.add('form-blue');
    document.querySelector('.div-form-address')
    .classList.remove('form-white');

    document.querySelector('.div-form-general')
    .classList.add('form-white');
    document.querySelector('.div-form-general')
    .classList.remove('form-blue');
});

let userName;
let pass;
document.querySelector('.js-resister-but')
.addEventListener('click' , (event) => {

    userName = document.querySelector('.user-name').value;
    let email = document.querySelector('.email').value;
    let phNo = document.querySelector('.ph-no').value;
    pass = document.querySelector('.password').value;
    let conPass = document.querySelector('.password2').value;
    let address1 = document.querySelector('.address1').value;
    let address2 = document.querySelector('.address2').value;
    let pincode = document.querySelector('.pin-code').value;

    let userData = {
        userName ,
        email ,
        phNo ,
        pass ,
        conPass ,
        address1 ,
        address2 ,
        pincode
    }



    if (userList.length > 0) {
        userList.forEach((user) => {
            if (user.phNo === userData.phNo) {
                alert('This Number is already registerd');
            } else {
                userList.push(user);
                windowsChange (event);
            }
        });
    } else {
        userList.push(user);
        windowsChange (event);
    }
    
});

document.querySelector('.js-resister-but')
.addEventListener('click' , (event) => {
    event.preventDefault();
    window.location.href = `../signin/signin.html?details=${userName},${pass}`;
});