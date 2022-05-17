// eslint-disable-next-line
function getMoreInfoVendeglo(VendegloID) {
  try {
    fetch(`/getMoreInfoVendeglo/${VendegloID}`)
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        document.getElementById(`getMoreInfoVendeglo/${VendegloID}`).innerText = JSON.parse(message);
      });
  } catch (err) {
    console.log(err);
  }
}

// eslint-disable-next-line
async function deleteFoglalas(FoglalasID) {
  // eslint-disable-next-line no-restricted-globals
  if (confirm('Are you sure?')) {
    try {
      document.getElementById(`tr/${FoglalasID}`).remove();
      await fetch(`/deleteFoglalas/${FoglalasID}`);
    } catch (err) {
      console.log(err);
    }
  }
}
