let addressBookList;
window.addEventListener("DOMContentLoaded", (event) => {
  addressBookList = getAddressBookData();
  document.querySelector(".person-count").textContent = addressBookList.length;
  createInnerHtml();
  localStorage.removeItem("editContact");
});
const getAddressBookData = () => {
  if (localStorage.getItem("AddressBookList") != undefined) {
    return JSON.parse(localStorage.getItem("AddressBookList"));
  } else {
    return [];
  }
}
const createInnerHtml = () => {
  const headerHtml =
    "<th>Fullname</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Action</th>";
  let innerHtml = `${headerHtml}`;
  if (addressBookList.length == 0) {
    document.querySelector("#display").innerHTML = innerHtml;
    return;
  }
  for (const addressBook of addressBookList) {
    innerHtml = `${innerHtml}
    <tr>
        <td>${addressBook._name}</td>
        <td class="address-block">${addressBook._address}</td>
        <td>${addressBook._city}</td>
        <td>${addressBook._state}</td>
        <td>${addressBook._zipcode}</td>
        <td>${addressBook._phoneNumber}</td>
        <td>
            <img id="${addressBook.id}" onclick="remove(this)" alt="delete" src="../assets/delete.svg">
            <img id="${addressBook.id}" onclick="update(this)" alt="edit" onclick="update(this)" src="../assets/edit.svg">
        </td>
    </tr>
    `;
    document.querySelector("#display").innerHTML = innerHtml;
  }
};

const remove = (node) => {
  let addressBookData = addressBookList.find(
    (contact) => contact.id == node.id
  );
  if (!addressBookData) return;
  const contactIndex = addressBookList
    .map((contactName) => contactName.id)
    .indexOf(addressBookData.id);
  addressBookList.splice(contactIndex, 1);
  localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
  document.querySelector(".person-count").textContent = addressBookList.length;
  createInnerHtml();
};
const update = (node) => {
  let addressBookData = addressBookList.find(
    (contact) => contact.id == node.id
  );
  if (!addressBookData) return;
  localStorage.setItem("editContact", JSON.stringify(addressBookData));
  window.location.replace(site_properties.add_person_page);
};