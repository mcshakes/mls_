const input = [
    {
      "data_name": "ga_fmls",
      "vendor_id": "76257",
      "address_components": {
        "address": "176 Milton Ave, Atlanta, GA 30317",
        "street_name": "Milton",
        "street_number": "176",
        "street_suffix": "Ave",
        "city": "Atlanta",
        "state": "GA",
        "zipcode": "30317"
      },
      "list": "$275,000",
      "date": "2018-05-02T04:19:27-04:00",
      "property": {
        "bed_count": "3",
        "bath_count": "2",
        "half_bath_count": "1",
        "square_feet": "2300"
      }
    }
  ]
  
  function homeData(name, id, street, city, state, zip, price, date, rooms, fullBaths, halfBaths, size) {
    this.mls_name = name;
    this.mls_id = id;
    this.street_address = address;
    this.city = city;
    this.state = state;
    this.zip_code = zip;
    this.list_price = price;
    this.list_date = date;
    this.bedrooms = rooms;
    this.full_baths = fullBaths;
    this.half_baths = halfBaths;
    this.size = size;
  
  }
  
  // Goes through array and separates each home object out
function mapEachHome(inputArr) {
    inputArr.map(homeObj => {
        searchItemProp(homeObj)        
    })
}
  
function searchItemProp(data) {

    Object.keys(data).forEach(key => {
        if (typeof data[key] === "object") {
            console.log(" ")
            // console.log("A nested object so we go again: ", data[key])
            searchItemProp(data[key])
            console.log(" ")
        } else {            
            x = getValueByObjKey(data)
            console.log(x)
        }
    })

}

details = []

function getValueByObjKey(obj) {

    let fullBath = "bath"
    let half =  "half"

    let fullBathRegex = new RegExp(fullBath, "i")
    let halfBathRegex = new RegExp(half, "i")

    for (let prop in obj) {
        if (prop.match(halfBathRegex)) {
            return prop
        }

        // if (prop.match(fullBathRegex)) {
        //     details.push(prop)
        //     break
        // }
    }
    
    // console.log(details)
}

mapEachHome(input)