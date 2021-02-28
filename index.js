const input1 = [
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
  
function mapEachHome(inputArr) {
    inputArr.map(homeObj => {
        searchItemProp(homeObj)        
    })
}
  
function searchItemProp(data) {
    Object.keys(data).forEach(key => {
        if (typeof data[key] === "object") {
            searchItemProp(data[key])
        } else {            
            getValueByObjKey(data)
        }
    })
}


function getValueByObjKey(obj) {

    homeDetails = new Map()

    for (let prop in obj) {

        if (typeof obj[prop] !== "object") {
            if (prop.includes("name") && !prop.includes("street")) {
                homeDetails.set("mls_name", obj[prop])
            }
    
            if (prop.includes("id")) {
                homeDetails.set("mls_id", obj[prop])
            }
            
            if (prop.includes("address")) {  
                homeDetails.set("street_address", obj[prop])   //
            }

            if (prop.includes("city")) {
                homeDetails.set("city", obj[prop])
            }

            if (prop.includes("state")) {
                homeDetails.set("state", obj[prop])
            }

            if (prop.includes("zip")) {
                homeDetails.set("zip_code", obj[prop])
            }

            if (prop.includes("price") || prop.includes("list")) {
                homeDetails.set("list_price", obj[prop])
            }

            if (prop.includes("date")) {
                homeDetails.set("list_date", obj[prop])
            }

            if (prop.includes("bed")) {
                homeDetails.set("bedrooms", obj[prop])
            }
    
            if (prop.includes("bath") && !prop.includes("half")) {
                homeDetails.set("full_baths", obj[prop])
            }
    
            if (prop.includes("half")) {
                homeDetails.set("half_baths", obj[prop])
            }

            if (prop.includes("square_feet")) {
                homeDetails.set("size", obj[prop])
            }
        
        }
            
    }
    
    return homeDetails
}

function buildJSON() {

}

mapEachHome(input1)