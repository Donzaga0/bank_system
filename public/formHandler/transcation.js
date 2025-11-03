
var transactionForm = document.getElementById('transactionForm');

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = transactionForm.description.value;
    const amount = parseFloat(transactionForm.amount.value);
    const date = transactionForm.date.value;
    const type = transactionForm.type.value;
    const status = transactionForm.status.value;
    const balance = parseFloat(transactionForm.balance.value);

    const descriptionErr = document.querySelector('.descriptionErr');
    const amountErr = document.querySelector('.amountErr');
    const dateErr = document.querySelector('.dateErr');
    const typeErr = document.querySelector('.typeErr');
    const statusErr = document.querySelector('.statusErr');
    const balanceErr = document.querySelector('.balanceErr');

    descriptionErr.innerHTML = "";
    amountErr.innerHTML = "";
    dateErr.innerHTML = "";
    typeErr.innerHTML = "";
    statusErr.innerHTML = "";
    balanceErr.innerHTML = "";

    descriptionReg = /^[a-zA-Z0-9\s\-',.&@#()!]+$/;
    amountReg =  /^\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/;
    dateReg = /^\d{4}-\d{2}-\d{2}$/;
    typeReg = /^(debit|credit|check|transfer|deposit|withdrawal)$/i;
    statusReg = /^(pending|completed|failed|cancelled|processing|refunded)$/i;
    balanceeg = /^-?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/;

    if (!descriptionReg.test(description)) {
        descriptionErr.innerHTML = "Please enter a valid description.";
        throw Error('Terminatng')
    }

    if (!amountReg.test(amount)) {
        amountErr.innerHTML = "Please Input a  valid amount";
        throw  Error('Terminating')
    }

    if (!dateReg.test(date)) {
        dateErr.innerHTML = "Enter a valid Date";
        throw Error('Terminating')
    }

    if (!typeReg.test(type)) {
        typeErr.innerHTML = "Enter a specific type";
        throw Error('Terminating')
    }

    if (!statusReg.test(status)) {
        statusErr.innerHTML = "Enter a Status";
        throw Error('Terminating')
    }

    if (!balanceeg.test(balance)) {
        balanceErr.innerHTML = "Enter a balance Correctly";
        throw Error('Terminating')
    }

    const data = { description, amount, date, type, status, balance}
    console.log(data);

     fetch('/admin/add-transcation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    .then(res => res.json())
    .then(data => {
        const modalMessage = document.getElementById('modalMessage');
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
        if (data.success) {
            modalMessage.innerHTML = data.msg;
            modalMessage.style.color = "green";
            successModal.show();
    
            setTimeout(() => {
                window.location.href = data.redirectURL;
            }, 2000);
        }
    
        if (data.error) {
            modalMessage.innerHTML = data.error;
            modalMessage.style.color = "red";
            successModal.show(); 
        }
        
    })
    
    .catch(error => console.log(error))

})