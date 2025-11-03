
var adminlogin_form = document.getElementById('adminlogin_form')

adminlogin_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = adminlogin_form.email.value;
    const password = adminlogin_form.password.value;

    // Error div

    const emailErr = document.querySelector('.emailErr');
    const passwordErr = document.querySelector('.passwordErr');

    emailErr.innerHTML = "";
    passwordErr.innerHTML = "";

    emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!emailReg.test(email)) {
        emailErr.innerHTML = 'Email Does not Exit';
        throw Error('Terminating');
    }

    if (!passwordReg.test(password)) {
        passwordErr.innerHTML = 'Password Does not Exit';
        throw Error('Terminating');
    }

    const data = { email, password }
    console.log(data); 

    fetch('/auth/login-admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })

        .then(res => res.json())
        .then(data => {
            const toaster = document.createElement('div');
            toaster.className = 'toaster';
            document.body.appendChild(toaster);

            // Reset toaster content and classes
            toaster.innerHTML = '';
            toaster.classList.remove('toaster-success', 'toaster-error');

            if (data.success) {
                toaster.innerHTML = data.msg;
                toaster.classList.add('toaster-success');
                setTimeout(() => {
                    toaster.remove();
                    window.location.href = data.redirectURL;
                }, 3000);
            }

            if (data.error) {
                toaster.innerHTML = data.error;
                toaster.classList.add('toaster-error');
                setTimeout(() => {
                    toaster.remove();
                }, 3000);
            }
        })

        .catch(error => console.log(error))
})