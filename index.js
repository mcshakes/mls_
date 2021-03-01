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

    console.log(flattened)
}

function mapValueToObjKey(obj) {
    console.log(obj)
    // mapObj = new Map()

    // for (let prop in obj) {

    //     if (typeof obj[prop] !== "object") {
    //         if (prop.includes("name") && !prop.includes("street")) {
    //             mapObj.set("mls_name", obj[prop])
    //         }
    
    //         if (prop.includes("id")) {
    //             mapObj.set("mls_id", obj[prop])
    //         }
            
    //         if (prop.includes("address")) {  
    //             mapObj.set("street_address", obj[prop])
    //         }

    //         if (prop.includes("city")) {
    //             mapObj.set("city", obj[prop])
    //         }

    //         if (prop.includes("state")) {
    //             mapObj.set("state", obj[prop])
    //         }

    //         if (prop.includes("zip")) {
    //             mapObj.set("zip_code", obj[prop])
    //         }

    //         if (prop.includes("price") || prop.includes("list")) {
    //             mapObj.set("list_price", obj[prop])
    //         }

    //         if (prop.includes("date")) {
    //             mapObj.set("list_date", obj[prop])
    //         }

    //         if (prop.includes("bed")) {
    //             mapObj.set("bedrooms", obj[prop])
    //         }
    
    //         if (prop.includes("bath") && !prop.includes("half")) {
    //             mapObj.set("full_baths", obj[prop])
    //         }
    
    //         if (prop.includes("half")) {
    //             mapObj.set("half_baths", obj[prop])
    //         }

    //         if (prop.includes("square_feet")) {
    //             mapObj.set("size", obj[prop])
    //         }
        
    //     }
            
    // }        
}

function buildJSON(input) {
    let ans = flattenHomeObject(input)
    console.log(ans)
}

buildJSON(input1)
