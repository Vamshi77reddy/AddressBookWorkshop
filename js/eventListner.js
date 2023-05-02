let isUpdate = false;
let addressBookObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const output = document.querySelector('.address-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            output.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;
            output.textContent = "";
        } catch (e) {
            output.textContent = e;
        }
    });
    const phoneNumber = document.querySelector('#phone');
    const phone_error = document.querySelector('.number-error');
    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            phone_error.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).phone = phone.value;
            phone_error.textContent = "";
        } catch (e) {
            phone_error.textContent = e;
        }
    });
    checkForUpdate();
});
const save = (event) => {
    try {
      setAddressBookObj();
      createAndUpdateStorage();
      resetForm();
      window.location.replace(site_properties.home_page);
    } catch (e) {
      return;
    }
  };
  
  const setAddressBookObj = () => {
      addressBookObj.id = createNewContactId();
    
    addressBookObj._name = document.querySelector("#name").value;
    addressBookObj._address = document.querySelector("#address").value;
    addressBookObj._city = document.querySelector("#city").value;
    addressBookObj._state = document.querySelector("#state").value;
    addressBookObj._zipcode = document.querySelector("#zipcode").value;
    addressBookObj._phoneNumber = document.querySelector("#phone").value;
  };
  
  const createAndUpdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList) {
      let addressBookData = addressBookList.find(
        (contactData) => contactData.id == addressBookObj.id
      );
      if (!addressBookData) {
        addressBookList.push(addressBookObj);
      } else {
        const index = addressBookList
          .map((contactData) => contactData.id)
          .indexOf(addressBookData.id);
        addressBookList.splice(index, 1, addressBookObj);
      }
    } else {
      addressBookList = [addressBookObj];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
  };
  
  const createNewContactId = () => {
    let contactId = localStorage.getItem("ContactID");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactID", contactId);
    return contactId;
  };
  
  const resetForm = () => {
    setValue("#name", "");
    setTextValue(".text-error", "");
    setValue("#address", "");
    setTextValue(".address-output", "");
    setValue("#city", "");
    setValue("#state", "");
    setValue("#zipcode", "");
    setTextValue(".zip-error", "");
    setValue("#phone", "");
    setTextValue(".number-error", "");
  };
  
  const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
  };
  
  const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
  };
  

  const setForm = () => {
    setValue("#name", addressBookObj._name);
    setValue("#address", addressBookObj._address);
  const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem("editContact");
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
  };
       setValue("#city", addressBookObj._city);
    setValue("#state", addressBookObj._state);
    setValue("#zipcode", addressBookObj._zipcode);
    setValue("#phone", addressBookObj._phoneNumber);
  };
  const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem("editContact");
    isUpdate = addressBookJson ? true : false;
    if(!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}