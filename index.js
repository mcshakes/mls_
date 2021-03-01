const input1 = {
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

const input2 = {
    "name": "ncsc_cmls",
    "id": "53728",
    "geo": {
      "address": "256 Old Mill",
      "city": "Charlotte",
      "state": "NC",
      "zip": "28269"
    },
    "listing": {
      "price": "299,999.00",
      "bedrooms": "4",
      "bathrooms": "3",
      "square_feet": "1975"
    },
    "created": "2018-05-14 03:00:00 EST"
  }

  
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
  

function flattenHomeObject(obj) {
    const flattened = {}

    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {

            Object.assign(flattened, flattenHomeObject(obj[key]))

        } else {
            flattened[key] = obj[key]
        }
    })

    return flattened
}

function mapValueToObjKey(obj) {
    let mapObj = new Map()

    for (let prop in obj) {

        if (typeof obj[prop] !== "object") {
            if (prop.includes("name") && !prop.includes("street")) {
                mapObj.set("mls_name", obj[prop])
            }
    
            if (prop.includes("id")) {
                mapObj.set("mls_id", obj[prop])
            }
            
            if (prop.includes("address")) {
                let cleaned = cleanAddress(obj[prop]);
                mapObj.set("street_address", cleaned)
            }

            if (prop.includes("city")) {
                mapObj.set("city", obj[prop])
            }

            if (prop.includes("state")) {
                mapObj.set("state", obj[prop])
            }

            if (prop.includes("zip")) {
                mapObj.set("zip_code", parseInt(obj[prop]))
            }

            if (prop.includes("price") || prop.includes("list")) {
                let price = fixPrice(obj[prop])
                mapObj.set("list_price", price)
            }

            if (prop.includes("date") || prop.includes("created")) {
                let date = normalizeDate(obj[prop])
                mapObj.set("list_date", date)
            }

            if (prop.includes("bed")) {
                mapObj.set("bedrooms", parseInt(obj[prop]))
            }
    
            if (prop.includes("bath") && !prop.includes("half")) {
                mapObj.set("full_baths", parseInt(obj[prop]))
            }
    
            if (prop.includes("half")) {
                mapObj.set("half_baths", parseInt(obj[prop]))
            }

            if (prop.includes("square_feet")) {
                mapObj.set("size", parseInt(obj[prop]))
            }
        
        }            
    }
    
    return mapObj;
}

function cleanAddress(addr) {
    return addr.split(",")[0]
}

function normalizeDate(date) {
    return Date.parse(date)
}

function fixPrice(price) {
    return parseFloat(price.replace(/[^\d.]/g, ''))
}

function buildJSON(input) {
    let ans = flattenHomeObject(input)
    let renamed = mapValueToObjKey(ans)
    console.log(renamed)
}

buildJSON(input2)
