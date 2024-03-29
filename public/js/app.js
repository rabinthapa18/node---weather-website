const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#message-1')
const messageTwo =document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
                messageTwo.textContent='  '
            } 
            else{
                messageOne.textContent='Location is '+data.location
                messageTwo.textContent=data.weatherForecast
            }            
        })
    })

})
