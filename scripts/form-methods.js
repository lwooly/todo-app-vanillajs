export function serialize(form) {
    // get most things
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
  
    // If you have checkboxes or selects in multiple mode
    const multis = Array.from(
      form.querySelectorAll(`select[multiple], [type="checkbox"]`)
    );
    const multiNames = Array.from(new Set(multis.map((input) => input.name)));
    console.log("multis", multis);
  
    if (multis.length) {
      // Get full values for checkboxes & multi-selects
      for (const key in data) {
        if (data.hasOwnProperty(key) && multiNames.includes(key)) {
          const fullData = formData.getAll(key);
          if (fullData.length > 1) {
            data[key] = fullData;
          }
        }
      }
    }
  
    return data;
  }

  export function populate(form, data) {
    // { name: 'james' }
    // walk the object
    for (let [inputName, value] of Object.entries(data)) {
      // Make any bad values an empty string
      value ??= "";
  
      // try to find element in the form
      const element = form[inputName];
  
      // If we can't then bail
      if (!element || !element instanceof Element) {
        console.warn(`Could not find element ${inputName}: bailing...`);
        continue;
      }
  
      // see what type an element is to handle the process differently
      const type = element.type || element[0].type;
  
      switch (type) {
        case "checkbox": {
          // Here, value is an array of values to be spread across the checkboxes that make up this input. It's the value of the input as a whole, NOT the value of one checkbox.
          const values = Array.isArray(value) ? value : [value];
  
          for (const checkbox of element) {
            if (values.includes(checkbox.value)) {
              checkbox.checked = true;
            }
          }
          break;
        }
        case "select-multiple": {
          const values = Array.isArray(value) ? value : [value];
  
          for (const option of element) {
            if (values.includes(option.value)) {
              option.selected = true;
            }
          }
          break;
        }
  
        case "select":
        case "select-one":
          element.value = value.toString() || value;
          break;
  
        // case "time":
        // case "week":
        // case "datetime-local":
        case "date":
          element.value = new Date(value).toISOString().split("T")[0];
          break;
  
        default:
          element.value = value;
          break;
      }
    }
  }
  