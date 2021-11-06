let app = document.querySelector("#app")

async function getWeather (city) {
    let response = await fetch(`
    https://developers.parsijoo.ir/web-service/v1/weather/?type=search&city=${city}`,
    {
        headers: {
            "api-key" : "6b3f88d030e2475094d9d53331c45cf4"
        }
    })
    let data = await response.json()
    let today = data.result.hava.dayList[0]
    let nowTemp = data.result.hava.summary.temp
    let state = data.result.hava.state
    switch (nowTemp) {
        case (nowTemp <= 5):
            today.color = "t1"
            break;
        case (nowTemp <= 15):
            today.color = "t2"
            break;
        case (nowTemp <= 25):
            today.color = "t3"
            break;
        case (nowTemp <= 35):
            today.color = "t4"
            break;
        case (nowTemp > 35):
            today.color = "t5"
            break;
        default:
            today.color = "t2"
            break;
    }
    app.innerHTML = `
    <div class="card">
    <div class="weather-wrapper ${today.color}">
        <i style="font-size: 5rem;" class="wi ${today.symbol}"></i>
    </div>
    <div class="card-body text-center">
        <h2>شهر : ${city}</h2>
        <h4>استان : ${state}</h4>
        <small class="my-3 d-block">${today.condition}</small>
        <div>
            <button class="btn btn-danger">${today.max}</button>
            <button class="btn btn-secondary">${nowTemp}</button>
            <button class="btn btn-primary">${today.min}</button>
        </div>
    </div>
    </div>`
}
let defaultCity = "تهران"
let city = document.querySelector("#city")
city.addEventListener("submit", e => {
    e.preventDefault()
    getWeather (e.target.city.value)
})
getWeather (defaultCity)