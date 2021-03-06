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
    this.street_address = street;
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
    let homeObj = new homeData()

    for (let prop in obj) {

        if (typeof obj[prop] !== "object") {
            if (prop.includes("name") && !prop.includes("street")) {
                homeObj.mls_name = obj[prop]
            }
    
            if (prop.includes("id")) {
                homeObj.mls_id = obj[prop]
            }
            
            if (prop.includes("address")) {
                let cleaned = cleanAddress(obj[prop]);
                homeObj.street_address = cleaned
            }

            if (prop.includes("city")) {
                homeObj.city = obj[prop]

            }

            if (prop.includes("state")) {
                homeObj.state = obj[prop]
            }

            if (prop.includes("zip")) {
                homeObj.zip_code = parseInt(obj[prop])
            }

            if (prop.includes("price") || prop.includes("list")) {
                let price = fixPrice(obj[prop])
                homeObj.list_price = price
            }

            if (prop.includes("date") || prop.includes("created")) {
                let date = normalizeDate(obj[prop])
                homeObj.list_date = date
            }

            if (prop.includes("bed")) {
                homeObj.bedrooms = parseInt(obj[prop])

            }
    
            if (prop.includes("bath") && !prop.includes("half")) {
                homeObj.full_baths = parseInt(obj[prop])
            }
    
            if (prop.includes("half")) {
                homeObj.half_baths = parseInt(obj[prop])
            }

            if (prop.includes("square_feet")) {
                homeObj.size = parseInt(obj[prop])
            }
        
        }            
    }
    
    return homeObj;
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
    let ans = flattenHomeObject(input);
    let renamed = mapValueToObjKey(ans);

    let jsObj = new homeData(renamed.mls_name, renamed.mls_id, renamed.street_address, renamed.city, renamed.state, renamed.zip_code, renamed.list_price, renamed.date, renamed.bedrooms, renamed.full_baths, renamed.half_baths, renamed.size)

    console.log(JSON.stringify(renamed))
}

buildJSON(input2)
