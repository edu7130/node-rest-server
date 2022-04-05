function handleCredentialResponse(response) {

    const body = { id_token: response.credential }
    console.log('BODY: ', body);
    fetch('http://localhost:8080/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        localStorage.setItem('email', resp.user.email)
      })
      .catch(console.warn)
  }

  const btn = document.getElementById("btn-google")

  btn.onclick = async () => {

    console.log('GO', google.accounts.id);

    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
      localStorage.clear()
      location.reload()
    })
  }
