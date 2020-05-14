let body = document.querySelector("body");
const btn = document.querySelectorAll(".btn-call");
const btnClose = document.querySelector(".btn-close");
let popup = document.querySelector(".modal");
let call_me = popup.querySelector(".call-me");
const overlay = document.querySelector(".overlay");
const userName = popup.querySelector("[name=name]");
const userPhone = popup.querySelector("[name=phone]");
const form = popup.querySelector("form");
const callback = body.querySelectorAll('.callback')


function modalShow(evt) {
	evt.preventDefault()
	popup.classList.add("animation")
	userName.focus()
}

function modalClose(evt) {
	evt.preventDefault()
	popup.classList.remove("animation")
}

window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault()
		if (popup.classList.contains("animation")) {
		    popup.classList.remove("animation")
		}
	}
})

callback.forEach(e => {
  e.addEventListener('submit', async (evt) => {
  evt.preventDefault()
	let formData = new FormData(e)
	let Params = {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData.get('name'),
				phone: formData.get('phone'),
				problem: formData.get('problem') 
			}),
			method: "POST"
	}

  fetch('/', Params)
	 .then(response => response.json())
		.then(data => {
			let errorPhone = document.querySelector('.phone')
			let errorName = document.querySelector('.name')
			let errorProblem = document.querySelector('.problem')
			errorPhone.textContent = ""
			errorName.textContent = ""
			errorProblem.textContent = ""
			if (data.errors) {
				data.errors.forEach(function(err) {
					if (err.param === "name") {
							errorName.textContent += `${err.msg}`
							errorName.classList.add('valid')
					}
					if (err.param === "phone") {
						errorPhone.textContent += `${err.msg}`
						errorPhone.classList.add('valid')
					}
					if (err.param === "problem") {
						errorProblem.textContent += `${err.msg}`
						errorProblem.classList.add('valid')
					}
			})
			} else {
				errorPhone.remove()
				errorName.remove()
				errorProblem.remove()
				popup.classList.add('animation')
				popup.style.top = "20%"
				popup.style.height = "60px"
				popup.style.textAlign = "center"
				popup.innerHTML = '<h1>Ваша заявка принята</h1>'
				setTimeout(() => {
					popup.classList.remove('animation')
				}, 2000)
}})})})

body.addEventListener('click', (evt) => {
  if (evt.target.classList.contains("btn-call") || evt.target.classList.contains("submit-last")) {
  modalShow(evt)
  }
})

btnClose.addEventListener("click", modalClose)

function sendData(e) {
	e.preventDefault()
  let formData = new FormData(form)
	let Params = {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData.get('name'),
				phone: formData.get('phone')
			}),
			method: "POST"
	}

	fetch('/', Params)
	.then(response => response.json())
		.then(data => {
			let errorPhone = document.querySelector('.modal-phone')
			let errorName = document.querySelector('.modal-name')
			errorPhone.textContent = ""
			errorName.textContent = ""
			if (data.errors) {
				data.errors.forEach(function(err) {
					if (err.param === "name") {
						errorName.textContent += `${err.msg}`
						errorName.classList.add('valid-modal')
					}
					if (err.param === "phone") {
						errorPhone.textContent += `${err.msg}`
						errorPhone.classList.add('valid-modal')
					}
			  })
		  } else {
					popup.style.top = "20%"
					popup.style.height = "60px"
					popup.style.textAlign = "center"
					popup.innerHTML = '<h1>Ваша заявка принята</h1>'
					setTimeout(modalClose, 2000)	
		  }
    })	
}

form.onsubmit = sendData

document.getElementById('phone').addEventListener('input', function (e) {
	let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
	e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
})

document.getElementById('phone-modal').addEventListener('input', function (e) {
  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
	e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')	
})