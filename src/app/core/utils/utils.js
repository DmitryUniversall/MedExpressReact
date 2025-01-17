function uuid4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


function updateObject(oldObject, newObject) {
    for (let [key, newValue] of Object.entries(newObject)) {
        let oldValue = oldObject[key]

        if (oldValue !== undefined && oldValue.constructor === Object) {
            if (newValue === undefined || (newValue.constructor === Object && Object.entries(newValue).length === 0)) {
                oldObject[key] = newValue
            } else {
                updateObject(oldValue, newValue)
            }
        } else {
            if (oldValue !== newValue) {
                oldObject[key] = newValue
            }
        }
    }
}


function findBy(array, attribute, value) {
    let index = array.findIndex(function(obj) {
        return obj[attribute] === value
    });

    return array[index]
}


function findByMany(array, attribute, values) {
    return array.filter((element) => values.includes(element[attribute]))
}


function stringInsert(base_string, index, string) {
    if (index > 0)
    {
        return base_string.substring(0, index) + string + base_string.substring(index, base_string.length);
    }

    return string + base_string;
}

function Round10(val) {
    return Math.round(val / 10) * 10;
}


function groupObjectsByField(objects, fieldName) {
    return objects.reduce((acc, obj) => {
        const fieldValue = obj[fieldName];
        if (!acc[fieldValue]) {
            acc[fieldValue] = [];
        }
        acc[fieldValue].push(obj);
        return acc;
    }, {});
}


export {
    uuid4,
    updateObject,
    findBy,
    findByMany,
    stringInsert,
    Round10,
    groupObjectsByField
}
