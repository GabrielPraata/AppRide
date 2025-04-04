const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides()

allRides.forEach(async ([id, value])=>{
    const ride = JSON.parse(value)
    ride.id = id
    

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 aling-items-center justify-content-between shadow-sm gap-3"
    rideListElement.appendChild(itemElement)
    
    itemElement.addEventListener("click",()=>{
        window.location.href = `detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0]
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude)
   
    const mapID = `map${ride.id}`
    const mapElement = document.createElement("div")
    mapElement.id = mapID
    mapElement.style = "width:100px;height:100px"
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

    const dataElemente = document.createElement("div")
    dataElemente.className = "flex-fill d-flex flex-column"
    
    const cityDiv = document.createElement("div")
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
    cityDiv.className = "text-primary mb-2"


    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getSartDate(ride)
    dateDiv.className = "text-secondary mt-2"


    dataElemente.appendChild(cityDiv)
    dataElemente.appendChild(maxSpeedDiv)
    dataElemente.appendChild(distanceDiv)
    dataElemente.appendChild(durationDiv)
    dataElemente.appendChild(dateDiv)

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElemente)

    const map = L.map(mapID,{
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false
    })
    map.setView([firstPosition.latitude, firstPosition.longitude],10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
})

