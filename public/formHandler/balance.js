
var balanceForm = document.getElementById('balanceForm');

balanceForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const amount = balanceForm.amount.value;

    const amountErr = document.querySelector('.amountErr');

    amountErr.innerHTML = "";

    amountReg = /^\d+(\.\d{1,2})?$/;

    if (!amountReg.test(amount)) {
        amountErr.innerHTML = 'Enter a valid amount';
        throw Error('Terminating');
    }

    const data = { amount };
    console.log(data);

    fetch('/admin/update-balance', {
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